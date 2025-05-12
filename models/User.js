const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{
    gameId: String,
    title: String,
    cover: String,
    releaseDate: String,
    genre: [String]
  }]
});

module.exports = mongoose.model('User', userSchema);