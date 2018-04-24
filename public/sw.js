// refer   https://googlechrome.github.io/samples/service-worker/basic/index.html

const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  'index.html',
  './', // Alias for index.html

];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  console.log('install service worker');
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())//页面刷新 新的sw立即更新
  );
});
//active  clean old cache
self.addEventListener('activate', () => {
  self.clients.matchAll({ type: 'window' }).then(windowClients => {
    for (let windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.

      windowClient.navigate(windowClient.url);
    }
  });
});
//// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
//拦截网路请求
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  //console.log(event);
  //防止chrome 插件的统计数据也被cache

  //缓存本地静态数据

  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
  //存储api数据
  if (event.request.url.startsWith("https://1d0e8e54.ngrok.io/")) {
    console.log("ngrok");
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }



});
