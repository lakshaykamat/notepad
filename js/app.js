/* Entry point: the editor, note list, autosave, and app wiring */

import {
    initStorage,
    readAllMeta,
    readBody,
    removeNote,
    writeMeta,
    writeNote,
} from "./storage.js";
import {
    activeNote,
    makeNote,
    sortNotes,
    state,
    timeAgo,
    titleOf,
} from "./notes.js";
import { setSidebar } from "./settings.js";
import { showToast } from "./toast.js";
import { downloadFile } from "./download.js";
import { exportNotes, importNotes } from "./backup.js";

const pad = document.getElementById("pad");
const titleInput = document.getElementById("title");
const list = document.getElementById("note-list");
const docTitle = document.getElementById("doc-title");
const saveState = document.getElementById("save-state");
const countEl = document.getElementById("count");
const mobile = matchMedia("(max-width: 720px)");
const ACTIVE_KEY = "note.active";

/* ---------- Opening notes & the sidebar list ---------- */

async function openNote(id) {
    flushPendingSave();
    state.activeId = id;
    localStorage.setItem(ACTIVE_KEY, id);
    const text = (await readBody(id)) || "";
    if (state.activeId !== id) return;
    const note = activeNote();
    titleInput.value = note.title;
    pad.value = text;
    docTitle.textContent = titleOf(note);
    renderList();
    updateStatus();
    if (mobile.matches) setSidebar("off", true);
    if (titleInput.value) pad.focus();
    else titleInput.focus();
}

const PIN_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>';

function renderList() {
    list.innerHTML = "";
    let prevPinned = false;
    for (const [i, note] of state.notes.entries()) {
        const isPinned = !!note.pinned;
        if (i > 0 && prevPinned && !isPinned) {
            const sep = document.createElement("li");
            sep.className = "list-sep";
            sep.setAttribute("aria-hidden", "true");
            list.append(sep);
        }
        prevPinned = isPinned;

        const li = document.createElement("li");
        li.className =
            "note-item" +
            (note.id === state.activeId ? " active" : "") +
            (isPinned ? " pinned" : "");
        li.dataset.id = note.id;

        const open = document.createElement("button");
        open.className = "note-open";
        const title = document.createElement("span");
        title.className = "note-title";
        title.textContent = titleOf(note);
        const time = document.createElement("span");
        time.className = "note-time";
        time.textContent = timeAgo(note.updated);
        open.append(title, time);
        if (note.id === state.activeId)
            open.setAttribute("aria-current", "true");
        open.addEventListener("click", () => openNote(note.id));

        const pin = document.createElement("button");
        pin.className = "note-pin";
        pin.innerHTML = PIN_SVG;
        pin.title = isPinned ? "Unpin" : "Pin";
        pin.setAttribute(
            "aria-label",
            (isPinned ? 'Unpin note "' : 'Pin note "') + titleOf(note) + '"',
        );
        pin.setAttribute("aria-pressed", isPinned);
        pin.addEventListener("click", () => togglePin(note.id));

        const del = document.createElement("button");
        del.className = "note-del";
        del.textContent = "×";
        del.setAttribute("aria-label", 'Delete note "' + titleOf(note) + '"');
        del.addEventListener("click", () => deleteNote(note.id));

        li.append(open, pin, del);
        list.append(li);
    }
}

/* Keep the sidebar timestamps fresh */
setInterval(() => {
    for (const li of list.children) {
        const note = state.notes.find((n) => n.id === li.dataset.id);
        if (note)
            li.querySelector(".note-time").textContent = timeAgo(note.updated);
    }
}, 60000);

/* ---------- Pinning (3 max) ---------- */

const MAX_PINS = 3;

async function togglePin(id) {
    const note = state.notes.find((n) => n.id === id);
    if (!note) return;
    if (note.pinned) {
        note.pinned = 0;
    } else {
        if (state.notes.filter((n) => n.pinned).length >= MAX_PINS) {
            showToast("You can pin up to 3 notes");
            return;
        }
        note.pinned = Date.now();
    }
    await writeMeta(note);
    sortNotes();
    renderList();
}

/* ---------- Creating & deleting notes ---------- */

document.getElementById("new-note").addEventListener("click", async () => {
    const note = makeNote();
    state.notes.unshift(note);
    sortNotes();
    await writeNote(note, "");
    openNote(note.id);
});

async function deleteNote(id) {
    const note = state.notes.find((n) => n.id === id);
    const doDelete = async () => {
        state.notes = state.notes.filter((n) => n.id !== id);
        await removeNote(id);
        if (state.notes.length === 0) {
            const fresh = makeNote();
            state.notes = [fresh];
            await writeNote(fresh, "");
        }
        if (id === state.activeId) openNote(state.notes[0].id);
        else renderList();
    };
    /* Empty notes are removed without asking */
    const text =
        id === state.activeId ? pad.value : (await readBody(id)) || "";
    if (!note.title.trim() && !text.trim()) doDelete();
    else askDelete(note, doDelete);
}

const confirmOverlay = document.getElementById("confirm-overlay");
const confirmText = document.getElementById("confirm-text");
let confirmAction = null;

function askDelete(note, action) {
    confirmText.innerHTML = "";
    confirmText.append(
        "Are you sure you want to delete ",
        Object.assign(document.createElement("strong"), {
            textContent: "“" + titleOf(note) + "”",
        }),
        "? This cannot be undone.",
    );
    confirmAction = action;
    confirmOverlay.hidden = false;
    document.getElementById("confirm-cancel").focus();
}

function closeConfirm() {
    confirmOverlay.hidden = true;
    confirmAction = null;
}

document.getElementById("confirm-delete").addEventListener("click", () => {
    if (confirmAction) confirmAction();
    closeConfirm();
});
document
    .getElementById("confirm-cancel")
    .addEventListener("click", closeConfirm);
document.getElementById("confirm-x").addEventListener("click", closeConfirm);
confirmOverlay.addEventListener("click", (e) => {
    if (e.target === confirmOverlay) closeConfirm();
});
addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeConfirm();
});

/* ---------- Editing & autosave ---------- */

function updateStatus() {
    const text = pad.value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    countEl.textContent =
        words +
        (words === 1 ? " word · " : " words · ") +
        text.length +
        (text.length === 1 ? " character" : " characters");
}

let saveTimer = null;

function saveActiveNote() {
    saveTimer = null;
    const note = activeNote();
    if (!note) return;
    try {
        writeNote(note, pad.value);
        saveState.textContent = "Saved";
    } catch (err) {
        console.error("Could not save note:", err);
        saveState.textContent = "Save failed";
    }
}

function flushPendingSave() {
    if (saveTimer === null) return;
    clearTimeout(saveTimer);
    saveActiveNote();
}

function onEdit() {
    const note = activeNote();
    if (!note) return;
    note.title = titleInput.value;
    note.updated = Date.now();
    docTitle.textContent = titleOf(note);
    const title = list.querySelector(".note-item.active .note-title");
    if (title) title.textContent = titleOf(note);
    const time = list.querySelector(".note-item.active .note-time");
    if (time) time.textContent = timeAgo(note.updated);
    updateStatus();
    saveState.textContent = "Saving…";
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveActiveNote, 200);
}
pad.addEventListener("input", onEdit);
titleInput.addEventListener("input", onEdit);

/* Enter in the title moves to the body */
titleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        pad.focus();
    }
});

/* Flush an unsaved edit if the tab closes or goes to background
   within the debounce window */
addEventListener("beforeunload", flushPendingSave);
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushPendingSave();
});

/* ---------- Download as .txt ---------- */

function downloadActiveNote() {
    if (!activeNote()) return;
    const heading = titleInput.value.trim();
    if (!pad.value.trim() && !heading) {
        titleInput.focus();
        return;
    }
    const content = heading ? heading + "\n\n" + pad.value : pad.value;
    const name =
        (titleOf(activeNote()).replace(/[^\w\- ]/g, "").trim() || "note") +
        ".txt";
    downloadFile(name, content, "text/plain");
}

document
    .getElementById("download")
    .addEventListener("click", downloadActiveNote);
addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        downloadActiveNote();
    }
});

/* ---------- Backup buttons ---------- */

const importFile = document.getElementById("import-file");

document.getElementById("export-notes").addEventListener("click", () => {
    flushPendingSave();
    exportNotes().catch((err) => {
        console.error("Export failed:", err);
        showToast("Export failed");
    });
});

document
    .getElementById("import-notes")
    .addEventListener("click", () => importFile.click());

importFile.addEventListener("change", async () => {
    const file = importFile.files[0];
    importFile.value = "";
    if (!file) return;
    flushPendingSave();
    try {
        const count = await importNotes(file);
        if (count > 0) await reloadNotes();
    } catch (err) {
        console.error("Import failed:", err);
        showToast("Import failed");
    }
});

async function reloadNotes() {
    state.notes = await readAllMeta();
    sortNotes();
    if (!state.notes.some((n) => n.id === state.activeId))
        state.activeId = state.notes[0].id;
    const note = activeNote();
    titleInput.value = note.title;
    pad.value = (await readBody(state.activeId)) || "";
    docTitle.textContent = titleOf(note);
    renderList();
    updateStatus();
}

/* ---------- Startup ---------- */

/* Ask the browser to never evict this site's storage. Warn once if it
   refuses (then notes can vanish under disk pressure - export often). */
async function requestPersistence() {
    if (!navigator.storage?.persist) return;
    const granted = await navigator.storage.persist();
    if (!granted && !localStorage.getItem("note.persist-warned")) {
        localStorage.setItem("note.persist-warned", "1");
        showToast("Browser may evict notes — install the app or export backups");
    }
}

async function init() {
    requestPersistence();
    await initStorage();
    state.notes = await readAllMeta();
    if (state.notes.length === 0) {
        const first = makeNote();
        state.notes = [first];
        await writeNote(first, "");
    }
    sortNotes();
    state.activeId = localStorage.getItem(ACTIVE_KEY);
    await reloadNotes();
    saveState.textContent = "Saved";
}

init().catch((err) => {
    console.error("Could not open note storage:", err);
    saveState.textContent = "Storage unavailable";
});

if ("serviceWorker" in navigator && location.protocol !== "file:")
    navigator.serviceWorker
        .register("sw.js")
        .catch((err) => console.error("Service worker failed:", err));
