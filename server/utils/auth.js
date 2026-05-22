const jwt = require('jsonwebtoken');

const signToken = (user) =>
  jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

const authResponse = (user) => ({
  token: signToken(user),
  user: { id: user._id, username: user.username, email: user.email },
});

module.exports = { signToken, authResponse };
