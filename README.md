# note.

A fast, minimal notepad that runs entirely in your browser. Write multiple notes with autosave, a pure-black dark mode, and one-click `.txt` download — no account, no server, no build step.

The whole app is a single `index.html` file with zero dependencies.

## Features

- **Multiple notes** — create, switch between, and delete notes from a sidebar. Deleting a non-empty note asks for confirmation; empty notes are removed silently.
- **Autosave** — every edit is saved to `localStorage` automatically (debounced, with a flush on tab close), so your notes survive refreshes and restarts.
- **Light & dark themes** — follows your system preference by default, with a manual toggle in Settings. Dark mode is pure black, and the theme is applied before first paint so there's no flash.
- **Adjustable text size** — small, medium, or large editor font.
- **Collapsible sidebar** — toggle it from the header; on small screens it becomes an overlay drawer.
- **Download as `.txt`** — save the current note to a text file with the download button or <kbd>⌘S</kbd> / <kbd>Ctrl+S</kbd>. The filename is derived from the note title.
- **Responsive & accessible** — keyboard-friendly, with ARIA labels, focus styles, and dialog semantics throughout.

## Getting started

No installation required. Just open the file in a browser:

```sh
open index.html        # macOS
```

Or serve it locally if you prefer:

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
| Jump from title to body | <kbd>Enter</kbd> in the title field |

## How it works

Notes are stored as JSON in `localStorage` under the `note.*` keys — nothing ever leaves your machine. Your theme and text size preferences are persisted the same way. Older single-note data from previous versions is migrated automatically on load.

## Privacy

There is no backend, no analytics, and no network requests. All data stays in your browser's local storage.
