/* IndexedDB persistence.
   "meta" holds {id, title, updated, pinned} for the sidebar;
   "bodies" holds each note's text, fetched only when opened. */

let db;

export function newId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export async function initStorage() {
    db = await openDatabase();
    await migrateFromLocalStorage();
}

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("notepad", 1);
        request.onupgradeneeded = () => {
            request.result.createObjectStore("meta", { keyPath: "id" });
            request.result.createObjectStore("bodies");
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function asPromise(request) {
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function whenDone(tx) {
    return new Promise((resolve, reject) => {
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
    });
}

export function readAllMeta() {
    return asPromise(db.transaction("meta").objectStore("meta").getAll());
}

export function readBody(id) {
    return asPromise(db.transaction("bodies").objectStore("bodies").get(id));
}

export function writeNote(meta, text) {
    const tx = db.transaction(["meta", "bodies"], "readwrite");
    tx.objectStore("meta").put(meta);
    tx.objectStore("bodies").put(text, meta.id);
    return whenDone(tx);
}

export function writeMeta(meta) {
    const tx = db.transaction("meta", "readwrite");
    tx.objectStore("meta").put(meta);
    return whenDone(tx);
}

export function removeNote(id) {
    const tx = db.transaction(["meta", "bodies"], "readwrite");
    tx.objectStore("meta").delete(id);
    tx.objectStore("bodies").delete(id);
    return whenDone(tx);
}

/* One-time move of notes saved by the old localStorage versions */
async function migrateFromLocalStorage() {
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
        await writeNote(
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
