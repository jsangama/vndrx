const CACHE_NAME = "vndrx-v3";
const APP_SHELL = [
  "./manifest.webmanifest",
  "./icon-192.svg",
  "./icon-512.svg",
];

const isSameOriginRequest = (request) => new URL(request.url).origin === self.location.origin;
const isNavigationRequest = (request) => request.mode === "navigate";

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone()).catch(() => {});
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone()).catch(() => {});
    return response;
  } catch {
    return (await caches.match(request)) || (await caches.match("./index.html"));
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(APP_SHELL);
      self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || !isSameOriginRequest(event.request)) return;

  if (isNavigationRequest(event.request)) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  const url = new URL(event.request.url);
  if (APP_SHELL.some((asset) => url.pathname.endsWith(asset.replace("./", "")))) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  event.respondWith(
    fetch(event.request).catch(async () => caches.match(event.request)),
  );
});
