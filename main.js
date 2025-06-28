// main.js

// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
            
            // Request notification permission
            return Notification.requestPermission();
        })
        .then(function(permission) {
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
        })
        .catch(function(error) {
            console.error('Service Worker registration failed:', error);
        });
}

// Your other JavaScript code goes here...