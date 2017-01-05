module.exports = function(app) {

  var io = require('socket.io')(app);
  var CommonHandler = require('./handlers/Common');

io.sockets.on('connection', function (socket) {

    console.log("Player connection", socket.id)

    // // Create event handlers for this socket
    // var eventHandlers = {
    //     // hashtag: new HashtagHandler(io, socket),
    //     common: new CommonHandler(io, socket)
    // };

    // // Bind events to handlers
    // for (var category in eventHandlers) {
    //     var handler = eventHandlers[category].handler;
    //     for (var event in handler) {
    //         socket.on(event, handler[event]);
    //     }
    // }

    socket.send(socket.id);
    // socket.send('message', 'connection made');

  });

  console.log('erica-game: socket.io inititalized');

}