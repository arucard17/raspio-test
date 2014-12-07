$(function() {
    var $btn = $('#btnListen'),
        $listen = $('#listen h3'),
        $result = $('#result'),
        status = false,
        socket = io.connect('http://192.168.0.103');

    window.SpeechRecognition = window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        null;
    if (window.SpeechRecognition == null) {
        alert('Este explorador no soporta Speech Recognition');
    } else {
        init();
    }

    function init() {
        var recognizer = new window.SpeechRecognition();

        recognizer.continuous = true;
        recognizer.lang = "es-CO";

        // Start recognising
        recognizer.onresult = function(event) {
            var str = '';
            for (var i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    str = event.results[i][0].transcript;
                    emitServer(str);
                } else {
                    str += event.results[i][0].transcript;
                }
                console.log(str);
            }
        };

        // Listen for errors
        recognizer.onerror = function(event) {
            console.log('Recognition error: ' + event.message);
        };

        function start() {
            // Set if we need interim results
            recognizer.interimResults = 'interim';
            try {
                recognizer.start();
            } catch (ex) {
                console.log('Recognition error: ' + ex.message);
            }
        }

        function stop() {
            recognizer.stop();
            console.log('Recognition stopped');
        }


        $btn.on('click', function() {
            status = !status;
            changeStatus();
        });

        function changeStatus() {
            if (status) {
                start();

                $btn
                    .removeClass()
                    .addClass('animated flash active');
                    
                $listen.addClass('active');
            } else {
                stop();

                $btn
                    .removeClass('animated flash')
                    .addClass('animated shake')
                    .removeClass('active');

                $listen.removeClass('active');
            }
        }
    }

    function emitServer(str) {
        socket.emit('speechRec', {
            speech: str
        });
    }

});
