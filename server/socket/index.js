const jwt = require('jsonwebtoken');
const Message = require('../models/Message');

const socketAuth = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Authentication error'));
  try {
    socket.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    next(new Error('Authentication error'));
  }
};

const registerHandlers = (io) => {
  io.use(socketAuth);

  io.on('connection', (socket) => {
    socket.on('join_channel', (channelId) => socket.join(channelId));

    socket.on('send_message', async ({ channelId, text }) => {
      if (!text?.trim() || !channelId) return;

      const message = await Message.create({
        channel: channelId,
        user: socket.user.id,
        username: socket.user.username,
        text: text.trim(),
      });

      io.to(channelId).emit('receive_message', {
        _id: message._id,
        channel: message.channel,
        user: message.user,
        username: message.username,
        text: message.text,
        createdAt: message.createdAt,
      });
    });
  });
};

module.exports = registerHandlers;
