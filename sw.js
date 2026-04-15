/**
 * ================================================================
 * AdVax Planner — Service Worker
 * يتيح للتطبيق العمل بشكل كامل بدون إنترنت بعد أول تحميل
 * ================================================================
 */

const CACHE_NAME = 'advax-planner-v3.0.0';

// الملفات التي سيتم تخزينها مؤقتاً للعمل Offline
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  // Google Fonts - سيتم تحميلها من الكاش بعد أول زيارة
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap',
];

/* ================================================================
   INSTALL — تخزين الملفات عند التثبيت
   ================================================================ */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing AdVax Planner Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching app shell');
      // نخزّن كل ملف على حدة لتجنب الفشل الجماعي
      return Promise.allSettled(
        ASSETS_TO_CACHE.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Failed to cache:', url, err))
        )
      );
    }).then(() => {
      console.log('[SW] Installation complete');
      return self.skipWaiting(); // تفعيل فوري بدون انتظار
    })
  );
});

/* ================================================================
   ACTIVATE — حذف الكاشات القديمة
   ================================================================ */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('[SW] Now controlling all pages');
      return self.clients.claim(); // السيطرة الفورية على جميع الصفحات
    })
  );
});

/* ================================================================
   FETCH — استراتيجية Cache First مع Fallback للشبكة
   ================================================================ */
self.addEventListener('fetch', (event) => {
  // تجاهل طلبات غير GET
  if (event.request.method !== 'GET') return;

  // تجاهل طلبات chrome-extension وما شابه
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // ✅ وُجد في الكاش — يُعاد فوراً
        return cachedResponse;
      }

      // ❌ لم يُوجد في الكاش — نطلب من الشبكة ونخزّنه
      return fetch(event.request)
        .then((networkResponse) => {
          // تخزين استجابات ناجحة فقط
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // الشبكة فاشلة — إرجاع الصفحة الرئيسية من الكاش (للـ SPA)
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
          // إرجاع استجابة فارغة للموارد الأخرى
          return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
        });
    })
  );
});

/* ================================================================
   BACKGROUND SYNC (مستقبلي)
   ================================================================ */
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
});

/* ================================================================
   PUSH NOTIFICATIONS (مستقبلي)
   ================================================================ */
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  self.registration.showNotification(data.title || 'مخطط AdVax', {
    body: data.body || 'لديك تذكير جديد',
    icon: './icon-192.png',
    badge: './icon-192.png',
    dir: 'rtl',
    lang: 'ar',
  });
});
