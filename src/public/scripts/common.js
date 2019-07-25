var socket = io.connect('http://localhost:3001');

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