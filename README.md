# note.

A fast, minimal notepad that runs entirely in your browser. Write multiple notes with autosave, a pure-black dark mode, and one-click `.txt` download — no account, no server, no build step.

The app is plain HTML, CSS, and JavaScript with zero dependencies and no build step, plus a small manifest and service worker so it can be installed as an offline app.

## Features

- **Multiple notes** — create, switch between, and delete notes from a sidebar. Deleting a non-empty note asks for confirmation; empty notes are removed silently.
- **Autosave** — every edit is saved to localStorage automatically (debounced, with a flush on tab close), so your notes survive refreshes and restarts.
- **Light & dark themes** — follows your system preference by default, with a manual toggle in Settings. Dark mode is pure black, and the theme is applied before first paint so there's no flash.
- **Adjustable text size** — small, medium, or large editor font.
- **Collapsible sidebar** — toggle it from the header; on small screens it becomes an overlay drawer.
- **Download as `.txt`** — save the current note to a text file with the download button or <kbd>⌘S</kbd> / <kbd>Ctrl+S</kbd>. The filename is derived from the note title.
- **Backup & restore** — export all notes to a single JSON file and import them back from Settings. Importing merges with your existing notes and keeps whichever copy is newer.
- **Installable & offline** — a web app manifest and service worker let you install it from the browser and keep using it with no connection.
- **Responsive & accessible** — keyboard-friendly, with ARIA labels, focus styles, and dialog semantics throughout.

## Getting started

No installation or build step required. Serve the folder with any static file server (the app uses ES modules, which browsers block on `file://` URLs):

```sh
python3 -m http.server
# then visit http://localhost:8000
```

## Usage

| Action | How |
| --- | --- |
| New note | `+` button in the sidebar |
| Switch notes | Click a note in the sidebar |
| Delete a note | `×` next to the note (confirmation for non-empty notes) |
| Download as `.txt` | Download button or <kbd>⌘S</kbd> / <kbd>Ctrl+S</kbd> |
| Toggle sidebar | Panel button in the header |
| Theme / text size | Settings (gear icon) |
| Export / import backup | Settings (gear icon) → Backup |
| Jump from title to body | <kbd>Enter</kbd> in the title field |

## How it works

The code is organized into small ES modules:

```
index.html            markup and the before-paint theme snippet
styles.css            all styling
js/app.js             entry point: editor, note list, autosave, wiring
js/storage.js         localStorage persistence and legacy migration
js/notes.js           shared note state and helpers
js/settings.js        settings modal (theme, text size, sidebar)
js/backup.js          JSON export and import
js/toast.js           toast notifications
js/download.js        file download helper
sw.js                 service worker (offline cache)
manifest.webmanifest  install metadata
```

Everything is stored in `localStorage` under the `note.*` keys - nothing ever leaves your machine. Notes from the earlier IndexedDB version are migrated automatically on load.

Backups are plain JSON files you download and re-import yourself; the service worker only caches the app shell so it loads offline.

## Privacy

There is no backend, no analytics, and no data sent over the network. All data stays in your browser's storage.
