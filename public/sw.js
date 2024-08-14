import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { Route, registerRoute } from "workbox-routing";
import { NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";
import { Queue } from "workbox-background-sync";

const queue = new Queue("testSyncQueue");

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "POST") return;

  const bgSync = async () => {
    try {
      const response = await fetch(e.request.clone());
      return response;
    } catch (error) {
      await queue.pushRequest({ request: e.request });
      console.error(error);
    }
  };
  
  e.respondWith(bgSync());
});

self.skipWaiting();
clientsClaim();

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

const imageRoute = new Route(
  ({ request }) => {
    return request.destination === "image";
  },
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

const stylesRoute = new Route(
  ({ request }) => {
    return request.destination === "style";
  },
  new NetworkFirst({
    cacheName: "styles",
  })
);

registerRoute(imageRoute);
registerRoute(stylesRoute);
