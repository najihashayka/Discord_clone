const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { authResponse } = require('../utils/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (await User.findOne({ $or: [{ email }, { username }] })) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    res.status(201).json(authResponse(user));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json(authResponse(user));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
