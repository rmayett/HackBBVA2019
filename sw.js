(function () {   
      var CACHE_NAME = 'criptobank-cache-v1';
      var urlsToCache = [
        '/index.html',
        '/usuario.html',
        '/js/log.js',
        '/js/godb.js',        
        '/empleado/index.html',
        '/empleado/empleado.html',
        '/empleado/js/log.js',
        '/empleado/js/godb.js'
      ];
      self.addEventListener('install', function(event) {
        // Perform install steps
        event.waitUntil(
          caches.open(CACHE_NAME)
            .then(function(cache) {
              return cache.addAll(urlsToCache);
            })
        );
      });
      self.addEventListener('fetch', function(event) {
        event.respondWith(caches.match(event.request).then(function(response) {
              if (response) {
                return response;
              }
              var fetchRequest = event.request.clone();     
              return fetch(fetchRequest).then(function(response) {
                  if(!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
		    console.log(response);
                  }
                  var responseToCache = response.clone();      
                  caches.open(CACHE_NAME).then(function(cache) {
                      cache.put(event.request, responseToCache);
                    });
                  return response;
                }
              );
            })
          );
      });
      self.addEventListener('activate', function(event) {
        var cacheWhitelist = ['criptobank-cache-v1'];      
        event.waitUntil(
          caches.keys().then(function(cacheNames) {
            return Promise.all(
              cacheNames.map(function(cacheName) {
                if (cacheWhitelist.indexOf(cacheName) === -1) {
                  return caches.delete(cacheName);
                }
              })
            );
          })
        );
      });
})
