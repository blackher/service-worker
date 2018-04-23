const CACHE_NAME = "fed-cache";
this.addEventListener("install", function(event) {
    this.skipWaiting();
    console.log("install service worker");
    // 创建和打开一个缓存库
    caches.open(CACHE_NAME);
    // 首页
    let cacheResources = ["https:www.baidu.com"];
    console.log(cacheResources);
    event.waitUntil(
        // 请求资源并添加到缓存里面去
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(cacheResources);
        })
    );
});

self.addEventListener('activate', () => {
  self.clients.matchAll({ type: 'window' }).then(windowClients => {
    for (let windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.

      windowClient.navigate(windowClient.url);
    }
  });
});
// this.addEventListener("fetch", function(event) {
//
//     event.respondWith(
//         caches.match(event.request).then(response => {
//             // cache hit
//             if (response) {
//                 //如果取的是html，则看发个请求看html是否更新了
//                 if (response.headers.get("Content-Type").indexOf("text/html") >= 0) {
//                     console.log("update html");
//                     let url = new URL(event.request.url);
//                     util.updateHtmlPage(url, event.request.clone(), event.clientId);
//                 }
//                 return response;
//             }
//
//             return util.fetchPut(event.request.clone());
//         })
//     );
// });
