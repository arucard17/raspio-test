$(function() {
    var socket = io.connect('http://192.168.0.103'),
        $content = $('#content'),
        $btn = $('#btnLed'),
        status = false;

    $btn.on('click', function() {
        status = !status;
        changeText(status);

        socket.emit('changeStatus', {
            st: status
        });
    });

    function changeText(status) {
        $btn.html(status ? 'Prender' : 'Apagar');
    }
});
