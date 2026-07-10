/* Settings modal: theme, text size, and sidebar visibility */

const THEME_KEY = "note.theme";
const SIZE_KEY = "note.size";
localStorage.removeItem("note.sidebar");

const overlay = document.getElementById("overlay");
const pad = document.getElementById("pad");
const mobile = matchMedia("(max-width: 720px)");

document.getElementById("settings-btn").addEventListener("click", () => {
    overlay.hidden = false;
});
document.getElementById("settings-close").addEventListener("click", () => {
    overlay.hidden = true;
});
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.hidden = true;
});
addEventListener("keydown", (e) => {
    if (e.key === "Escape") overlay.hidden = true;
});

/* A segmented control: wires its buttons and returns the setter */
function initSeg(id, saved, apply) {
    const buttons = document.querySelectorAll("#" + id + " button");
    const set = (value, persist) => {
        apply(value, persist);
        buttons.forEach((b) => {
            const on = b.dataset.v === value;
            b.classList.toggle("active", on);
            b.setAttribute("aria-pressed", on);
        });
    };
    buttons.forEach((b) =>
        b.addEventListener("click", () => set(b.dataset.v, true)),
    );
    set(saved, false);
    return set;
}

initSeg(
    "theme-seg",
    document.documentElement.dataset.theme,
    (theme, persist) => {
        document.documentElement.dataset.theme = theme;
        if (persist) localStorage.setItem(THEME_KEY, theme);
    },
);

const SIZES = { small: "0.95rem", medium: "1.05rem", large: "1.2rem" };
const savedSize = localStorage.getItem(SIZE_KEY);

initSeg(
    "size-seg",
    SIZES[savedSize] ? savedSize : "medium",
    (size, persist) => {
        pad.style.fontSize = SIZES[size];
        if (persist) localStorage.setItem(SIZE_KEY, size);
    },
);

/* The sidebar starts visible on desktop, hidden on phones;
   hiding lasts for the session */
const menuBtn = document.getElementById("menu");
let sidebarState;

export const setSidebar = initSeg(
    "sidebar-seg",
    mobile.matches ? "off" : "on",
    (value) => {
        sidebarState = value;
        document.body.classList.toggle("no-sidebar", value === "off");
        menuBtn.setAttribute("aria-expanded", value === "on");
    },
);

menuBtn.addEventListener("click", () =>
    setSidebar(sidebarState === "on" ? "off" : "on", true),
);
document
    .getElementById("scrim")
    .addEventListener("click", () => setSidebar("off", true));
