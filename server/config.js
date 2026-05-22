module.exports = {
  PORT: process.env.PORT || 5000,
  CLIENT_ORIGIN: 'http://localhost:5173',
  JWT_EXPIRES: '7d',
  DEFAULT_CHANNELS: [
    { name: 'general', description: 'General discussion' },
    { name: 'random', description: 'Random chat' },
    { name: 'help', description: 'Ask for help' },
  ],
};
