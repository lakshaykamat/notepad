/* localStorage persistence.
   "note.meta" holds the [{id, title, updated, pinned}] sidebar list;
   "note.body.<id>" holds each note's text, read only when opened. */

const META_KEY = "note.meta";

export function newId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export async function initStorage() {
    await migrateFromIndexedDB();
    migrateOldKeys();
}

function readMetaList() {
    try {
        const list = JSON.parse(localStorage.getItem(META_KEY));
        if (Array.isArray(list)) return list;
    } catch (e) {}
    return [];
}

export function readAllMeta() {
    return readMetaList();
}

export function readBody(id) {
    return localStorage.getItem("note.body." + id) || "";
}

export function writeNote(meta, text) {
    localStorage.setItem("note.body." + meta.id, text);
    writeMeta(meta);
}

export function writeMeta(meta) {
    const list = readMetaList();
    const index = list.findIndex((m) => m.id === meta.id);
    if (index === -1) list.push(meta);
    else list[index] = meta;
    localStorage.setItem(META_KEY, JSON.stringify(list));
}

export function removeNote(id) {
    localStorage.removeItem("note.body." + id);
    const list = readMetaList().filter((m) => m.id !== id);
    localStorage.setItem(META_KEY, JSON.stringify(list));
}

function asPromise(request) {
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/* One-time copy of notes out of the IndexedDB version. The database
   is deleted only after every note is safely in localStorage. */
async function migrateFromIndexedDB() {
    if (!indexedDB.databases) return;
    const names = await indexedDB.databases();
    if (!names.some((d) => d.name === "notepad")) return;

    const db = await asPromise(indexedDB.open("notepad", 1));
    if (db.objectStoreNames.contains("meta")) {
        const metas = await asPromise(
            db.transaction("meta").objectStore("meta").getAll(),
        );
        for (const meta of metas) {
            const text = await asPromise(
                db.transaction("bodies").objectStore("bodies").get(meta.id),
            );
            writeNote(meta, text || "");
        }
    }
    db.close();
    indexedDB.deleteDatabase("notepad");
}

/* One-time move of notes saved by the pre-2026 localStorage versions */
function migrateOldKeys() {
    let oldNotes = null;
    try {
        oldNotes = JSON.parse(localStorage.getItem("note.notes"));
    } catch (e) {}
    const oldSingle = localStorage.getItem("note.text");
    if (!Array.isArray(oldNotes) && oldSingle !== null)
        oldNotes = [{ text: oldSingle }];
    if (!Array.isArray(oldNotes)) return;

    for (const old of oldNotes) {
        let title = old.title;
        let text = old.text || "";
        if (title === undefined) {
            const lines = text.split("\n");
            title = (lines.shift() || "").trim();
            text = lines.join("\n").replace(/^\n+/, "");
        }
        writeNote(
            {
                id: old.id || newId(),
                title: title.slice(0, 40),
                updated: old.updated || Date.now(),
            },
            text,
        );
    }
    localStorage.removeItem("note.notes");
    localStorage.removeItem("note.text");
}
