/* Backup: export all notes to a JSON file and import them back */

import { newId, readAllMeta, readBody, writeNote } from "./storage.js";
import { state } from "./notes.js";
import { showToast } from "./toast.js";
import { downloadFile } from "./download.js";

export async function exportNotes() {
    const allMeta = await readAllMeta();
    const notes = [];
    for (const meta of allMeta) {
        notes.push({
            id: meta.id,
            title: meta.title,
            updated: meta.updated,
            pinned: meta.pinned || 0,
            text: (await readBody(meta.id)) || "",
        });
    }
    const payload = {
        app: "note",
        version: 1,
        exported: new Date().toISOString(),
        notes,
    };
    const name =
        "notes-backup-" + new Date().toISOString().slice(0, 10) + ".json";
    downloadFile(name, JSON.stringify(payload, null, 2), "application/json");
    showToast(
        "Exported " + notes.length + (notes.length === 1 ? " note" : " notes"),
    );
}

/* Merges a backup file into storage and returns how many notes changed.
   Notes whose id already exists are only overwritten when the backup
   copy is newer. */
export async function importNotes(file) {
    const entries = await parseBackup(file);
    if (!entries) {
        showToast("Not a valid backup file");
        return 0;
    }
    let count = 0;
    for (const raw of entries) {
        if (typeof raw !== "object" || raw === null) continue;
        const meta = {
            id: typeof raw.id === "string" && raw.id ? raw.id : newId(),
            title: String(raw.title || "").slice(0, 40),
            updated: Number(raw.updated) || Date.now(),
            pinned: Number(raw.pinned) || 0,
        };
        const existing = state.notes.find((note) => note.id === meta.id);
        if (existing && existing.updated >= meta.updated) continue;
        await writeNote(meta, String(raw.text || ""));
        count++;
    }
    if (count === 0) showToast("Nothing new to import");
    else showToast("Imported " + count + (count === 1 ? " note" : " notes"));
    return count;
}

async function parseBackup(file) {
    let data = null;
    try {
        data = JSON.parse(await file.text());
    } catch (e) {
        return null;
    }
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.notes)) return data.notes;
    return null;
}
