const Channel = require('../models/Channel');
const { DEFAULT_CHANNELS } = require('../config');

const seedChannels = async () => {
  if (await Channel.countDocuments()) return;
  await Channel.insertMany(DEFAULT_CHANNELS);
  console.log('Default channels created');
};

module.exports = seedChannels;
