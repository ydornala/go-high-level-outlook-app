var socket = io.connect('https://go-high-level-app.herokuapp.com');

socket.on('message', (data) => {
    new Noty({
        type: 'success',
        text: 'Hurray! Calendar Notification',
        theme: 'nest',
        timeout: '5000',
        closeWith: ['click'],
        callbacks: {
            onClick: function() {
                window.location.href = '/calendar';
            }
        }
    }).show();
});