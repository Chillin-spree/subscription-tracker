const CACHE_NAME = "bills-v1.13.2-static";
const CACHE_PREFIXES = ["bills-", "subscription-tracker-"];
const APP_SHELL_ASSETS = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "app.js?v=1.13.2",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon.svg",
];

const APP_SHELL_URLS = new Set(
  APP_SHELL_ASSETS.map((asset) => new URL(asset, self.registration.scope).href),
);

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL_ASSETS)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => (
            CACHE_PREFIXES.some((prefix) => cacheName.startsWith(prefix)) && cacheName !== CACHE_NAME
          ))
          .map((cacheName) => caches.delete(cacheName)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const requestUrl = new URL(request.url);

  if (request.method !== "GET" || requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("./").then((cachedResponse) => (
        cachedResponse || caches.match("index.html")
      ))),
    );
    return;
  }

  if (!APP_SHELL_URLS.has(requestUrl.href)) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => cachedResponse || fetch(request)),
  );
});
