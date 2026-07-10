/* Shared note state and small note helpers */

import { newId } from "./storage.js";

export const state = {
    notes: [],
    activeId: null,
};

export function makeNote() {
    return {
        id: newId(),
        title: "",
        updated: Date.now(),
        pinned: 0,
    };
}

export function activeNote() {
    return state.notes.find((note) => note.id === state.activeId);
}

export function titleOf(note) {
    return note.title.trim().slice(0, 40) || "Untitled";
}

/* Pinned notes first (newest pin on top), then by last edit */
export function sortNotes() {
    state.notes.sort(
        (a, b) =>
            (b.pinned || 0) - (a.pinned || 0) || b.updated - a.updated,
    );
}

export function timeAgo(ts) {
    const mins = Math.floor((Date.now() - ts) / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return mins + "m ago";
    const hours = Math.floor(mins / 60);
    if (hours < 24) return hours + "h ago";
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    if (days < 7) return days + "d ago";
    return new Date(ts).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
    });
}
