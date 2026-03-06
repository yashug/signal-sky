// Unregister this service worker and clear all caches
self.addEventListener("install", () => self.skipWaiting())
self.addEventListener("activate", async () => {
  const keys = await caches.keys()
  await Promise.all(keys.map((key) => caches.delete(key)))
  await self.clients.claim()
  const clients = await self.clients.matchAll()
  clients.forEach((client) => client.navigate(client.url))
})
