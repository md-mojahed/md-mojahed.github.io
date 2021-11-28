// install event
self.addEventListener('install', evt => {
  console.log('Service worker installed');
});

// activate event
self.addEventListener('activate', evt => {
  console.log('Service worker activated');
});

// fetch events
self.addEventListener('fetch', evt => {
  console.log('Service worker feching', evt);
});
