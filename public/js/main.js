$(function() {
    // var socket = io.connect('http://192.168.0.103'),
    var $content = $('#content'),
        $btn = $('#btnLed'),
        status = false;

    $btn.on('click', function() {
        status = !status;
        changeText(status);

        // socket.emit('changeStatus', {
        //     st: status
        // });
    });

    function changeText(status) {
        $btn.html(
            '<span class="glyphicon glyphicon-certificate"></span> ' +
            (!status ? 'Prender' : 'Apagar'));

        if (status)
            $btn.addClass('active');
        else
            $btn.removeClass('active');

    }
});
