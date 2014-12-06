module.exports = function (server, board){
    var io = require('socket.io')(server);
    board.pinMode(7, board.MODES.OUTPUT);

    io.on('connection', function(socket) {
        socket.on('changeStatus', function(data) {
            // Set pin 7's output to logic high
            board.pins[7].value = data.st ? board.HIGH : board.LOW;
        });

        socket.on('speechRec', function(data) {
            if(data.speech == 'encender')
                board.pins[7].value = board.HIGH;
            else
                board.pins[7].value = board.LOW;
        });

    });

};
