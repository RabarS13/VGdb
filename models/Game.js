const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameId: String,
  title: String,
  cover: String,
  releaseDate: String,
  genre: [String],
  userId: String
});

module.exports = mongoose.model('Game', gameSchema);