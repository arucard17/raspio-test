$(function() {
    var $btn = $('#btnListen'),
        $listen = $('#listen h3'),
        $result = $('#result'),
        status = false,
        socket = io.connect('http://192.168.0.103');

    window.SpeechRecognition = window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        null;
        
    // Validar que el explorador tenga el soporte para el API
    if (window.SpeechRecognition == null) {
        alert('Este explorador no soporta Speech Recognition');
    } else {
        init();
    }

    function init() {
        var recognizer = new window.SpeechRecognition();

        recognizer.continuous = true;
        recognizer.lang = "es-CO";

        // Evento para cambiar el estado entre "Reconociendo Voz" y "Apagado"
        $btn.on('click', function() {
            status = !status;
            changeStatus();
        });


        // Iniciar Reconocimiento
        function start() {
            // Set if we need interim results
            recognizer.interimResults = 'interim';
            try {
                recognizer.start();
            } catch (ex) {
                console.log('Recognition error: ' + ex.message);
            }
        }

        // Para reconocimiento
        function stop() {
            recognizer.stop();
            console.log('Recognition stopped');
        }

        // Método que será ejecutado cuando haya información de lectura de voz
        recognizer.onresult = function(event) {
            for (var i = event.resultIndex; i < event.results.length; i++) {
                // console.log(cleanResult(event.results[i][0].transcript));
                emitServer(clsRs(event.results[i][0].transcript));
            }
        };

        // Mostrar Error
        recognizer.onerror = function(event) {
            console.log('Recognition error: ' + event.message);
        };

        // Función para cambiar el estado
        function changeStatus() {
            if (status) {
                start();

                // Aplicando animación para mostrar que se empezó el proceso de reconocimiento de voz
                $btn
                    .removeClass()
                    .addClass('animated flash active');

                $listen.addClass('active');
            } else {
                stop();

                // Aplicando animación para indicar que se ha parado el proceso
                $btn
                    .removeClass('animated flash')
                    .addClass('animated shake')
                    .removeClass('active');

                $listen.removeClass('active');
            }
        }
    }

    // Función que envía la información obtenida por el reconocimiento de voz al servidor
    function emitServer(str) {
        socket.emit('speechRec', {
            speech: str
        });
    }

    // Función para limpiar el espacio en blanco de los resultados obtenidos por el reconocedor de voz
    function clsRs(str){
        return str.replace(' ', '');
    }

});
