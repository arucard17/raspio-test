$(function() {
    var $btn = $('#btnListen'),
        $listen = $('#listen h3'),
        status = false;

    $btn.on('click', function() {
        status = !status;
        changeStatus();
    });

    function changeStatus() {
        if (status) {
            $btn.removeClass().addClass('animated flash active');
            $listen.addClass('active');
        } else {
            $btn
                .removeClass('animated flash')
                .addClass('animated shake')
                .removeClass('active');

            $listen.removeClass('active');
        }
    }
});
