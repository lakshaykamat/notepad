/* Offline cache for note. — network first, cache fallback,
   so updates arrive when online and the app still opens offline. */

const CACHE = "note-v4";
const ASSETS = [
    "./",
    "index.html",
    "styles.css",
    "js/app.js",
    "js/storage.js",
    "js/notes.js",
    "js/toast.js",
    "js/settings.js",
    "js/backup.js",
    "js/download.js",
    "manifest.webmanifest",
    "icon.svg",
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches
            .open(CACHE)
            .then((cache) => cache.addAll(ASSETS))
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((key) => key !== CACHE)
                        .map((key) => caches.delete(key)),
                ),
            )
            .then(() => self.clients.claim()),
    );
});

self.addEventListener("fetch", (e) => {
    if (e.request.method !== "GET") return;
    e.respondWith(
        fetch(e.request)
            .then((res) => {
                const copy = res.clone();
                caches
                    .open(CACHE)
                    .then((cache) => cache.put(e.request, copy));
                return res;
            })
            .catch(() =>
                caches
                    .match(e.request)
                    .then((hit) => hit || caches.match("./")),
            ),
    );
});
