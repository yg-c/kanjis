/* Active le mode hors ligne : enregistre le service worker (sw.js). */
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
}
