// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
  
  // Request notification permission and send a notification
  function requestNotificationPermission() {
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        
        // Example of sending a notification
        new Notification('Hello!', {
          body: 'This is a test notification.',
          icon: 'path/to/icon.png' // Optional: path to an icon
        });
      } else {
        console.log('Notification permission denied.');
      }
    }).catch(function(error) {
      console.error('Notification permission request failed:', error);
    });
  }
  
  // Call the function to request notification permission
  requestNotificationPermission();
  
  // Your other JavaScript code goes here...
  