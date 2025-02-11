const CACHE_NAME = "congresso-2025-v1";
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/sexta.html",
    "/sabado.html",
    "/domingo.html",
    "/style.css",
    "/index-style.css"
];

// Instala o Service Worker e armazena os arquivos no cache
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Arquivos armazenados no cache");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Ativa o Service Worker e limpa caches antigos
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log("Removendo cache antigo:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Intercepta as requisições e serve os arquivos do cache quando offline
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});