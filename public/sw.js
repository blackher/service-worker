// refer   https://googlechrome.github.io/samples/service-worker/basic/index.html

const PRECACHE = 'precache-v1';
const STATIC = 'static';
const API = 'api';

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
self.addEventListener('activate', event => {
  console.log("active");

  //
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
        //if (cachedResponse) {
          //return cachedResponse;
        //}
        //每次重新请求数据都更新 禁止缓存
        return caches.open(STATIC).then(cache => {
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
  //请求api数据  只能cache get请求
  if (event.request.url.startsWith("https://72dbfc87.ngrok.io/")) {

    event.respondWith(
      caches.match(event.request).then(cachedResponse => {

        //if (cachedResponse) {
          //return cachedResponse;
        //}
        return caches.open(API).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            console.log(response);
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }



});
