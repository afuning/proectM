/**
 * Created by huning on 16/3/10.
 */
var io = require('socket.io')();

io.on('connection', function(socket){
    console.log('a user connected');
});

exports.listen = function (_server) {
    return io.listen(_server);
};





