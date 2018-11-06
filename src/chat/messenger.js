const os = require('os');
const shortid = require('shortid');

module.exports = class Messenger {
  constructor(redisClient, socket, messageLimit = 20) {
    this.messageLimit = messageLimit;
    this.redisClient = redisClient;
    this.socket = socket;
    this.sessionId = null;
    this.username = null;
  }

  makeOnline = () => new Promise((resolve, reject) => {
    if (!this.username || !this.sessionId) {
      return reject();
    }
    return this.redisClient.hexists('users', this.username, (err1, exists) => {
      if (exists) {
        return resolve();
      }
      return this.redisClient.hset('users', this.username, this.sessionId, (err2, saved) => {
        if (!saved) {
          return reject();
        }
        this.socket.broadcast.emit('newUserJoined', [this.sessionId, this.username]);
        return resolve();
      });
    });
  });

  sendOnlineUsers = () => {
    const userList = [];
    this.redisClient.hgetall('users', (err, users) => {
      if (!users) {
        return null;
      }
      Object.keys(users).forEach((username) => {
        if (username !== this.username) {
          const id = users[username]; // eslint-disable-line
          userList.push([id, username]);
        }
      });
      userList.sort();
      return this.socket.emit('getOnlineUsers', userList);
    });
  };

  sendLastMessages = () => {
    this.redisClient.lrange('messages', 0, this.messageLimit, (err, reply) => {
      const messages = reply.map(message => JSON.parse(message));
      if (!err) {
        this.socket.emit('getLastMessages', { messages });
      }
    });
  };

  join = (username, id) => {
    this.username = username;
    this.sessionId = id;
    this.makeOnline().then(() => {
      if (!this.socket.sessionId) {
        this.socket.emit('serverInfo', os.hostname());
        this.sendOnlineUsers();
        this.sendLastMessages();
      }
      this.socket.sessionId = this.sessionId;
    });
  };

  broadcastNewMessage = (msg) => {
    // Re-join for ghost user
    this.makeOnline().then(() => {
      const newMessage = {
        id: shortid.generate(),
        time: this.getTime(),
        username: this.username,
        msg,
      };
      // Broadcast message to other users
      this.socket.broadcast.emit('haveMessage', newMessage);
      // Save message to redis
      this.redisClient.rpush('messages', [JSON.stringify(newMessage)], (err, count) => {
        if (count >= this.messageLimit) {
          this.redisClient.lpop('messages');
        }
      });
    });
  };

  logout = () => {
    if (!this.username || !this.sessionId) {
      return null;
    }
    this.redisClient.hdel('users', this.username);
    this.socket.broadcast.emit('userLeft', this.sessionId);
    return true;
  };

  getTime = () => {
    const now = new Date();
    return `${String(`0${now.getHours()}`).slice(-2)}:${String(`0${now.getMinutes()}`).slice(-2)}`;
  };
};
