Pusher.logToConsole = true;

var pusher = new Pusher('e44d00fb9c45fb71f1f3', {
    cluster: 'eu',
    forceTLS: true
});

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
    console.log(JSON.stringify(data));
});