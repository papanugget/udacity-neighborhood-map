export default function startServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/static/service-worker.js', {scope: '/static/'})
      .then(function(reg) {
        console.log('Registration succeeded!', reg);
      })
      .catch(function(error) {
        console.log('Registration failed with ' + error);
      });
    }
  }