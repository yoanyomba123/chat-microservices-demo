const Socketio = require('socket.io');
const redisAdapter = require('socket.io-redis');
const FloodProtection = require('flood-protection').default;
const Messenger = require('./messenger');

// locals
const chatConfig = require('../config/runtime/chat.config');
const { redisServer, redisPort } = require('../libs/node/redis-client');

const socketHandler = (appServer, redisClient) => {
  const io = new Socketio(appServer);
  const floodProtection = new FloodProtection(chatConfig.floodProps || {});

  io.adapter(redisAdapter({ host: redisServer, port: redisPort }));

  io.on('connection', (socket) => {
    const messenger = new Messenger(redisClient, socket, chatConfig.initialMessagesLimit);

    // *********** JOIN ***********
    socket.on('join', (username, sessionId = null) => {
      messenger.join(username, sessionId);
    });

    // *********** NEW MESSAGE ***********
    socket.on('newMessage', (msg) => {
      if (!floodProtection.check()) {
        return socket.emit('flood', '');
      }
      return messenger.broadcastNewMessage(msg);
    });

    // *********** LOGOUT ***********
    socket.on('logout', () => {
      messenger.logout();
    });

    // *********** USER DISCONNECTED ***********
    socket.on('disconnect', () => {
      messenger.logout();
    });
  });
};

module.exports = socketHandler;
