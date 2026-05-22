const express = require('express');
const Channel = require('../models/Channel');
const Message = require('../models/Message');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    res.json(await Channel.find().sort({ name: 1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id/messages', auth, async (req, res) => {
  try {
    const messages = await Message.find({ channel: req.params.id })
      .sort({ createdAt: 1 })
      .limit(100);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
