require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const { PORT, CLIENT_ORIGIN } = require('./config');
const authRoutes = require('./routes/auth');
const channelRoutes = require('./routes/channels');
const seedChannels = require('./utils/seed');
const registerSocket = require('./socket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: CLIENT_ORIGIN, methods: ['GET', 'POST'] } });

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  const dbReady = mongoose.connection.readyState === 1;
  res.json({ ok: dbReady, db: dbReady ? 'connected' : 'connecting' });
});

app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState === 1) return next();
  res.status(503).json({ message: 'Server is starting, wait a few seconds and try again' });
});

app.use('/api/auth', authRoutes);
app.use('/api/channels', channelRoutes);

registerSocket(io);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose
  .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 })
  .then(async () => {
    await seedChannels();
    console.log('MongoDB connected');
  })
  .catch((err) => console.error('MongoDB connection error:', err.message));
