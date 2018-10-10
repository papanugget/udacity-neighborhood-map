export default function startServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js', {scope: '/'})
      .then(function(reg) {
        console.log('Registration succeeded!', reg);
      })
      .catch(function(error) {
        console.log('Registration failed with ' + error);
      });
    }
  }