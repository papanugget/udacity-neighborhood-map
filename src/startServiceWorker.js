export default function startServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/tweaked.js', {scope: '/'})
      .then(function(reg) {
        console.log('Registration succeeded!', reg);
      })
      .catch(function(error) {
        console.log('Registration failed with ' + error);
      });
    }
  }