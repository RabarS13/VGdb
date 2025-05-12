const Game = require('../models/Game');

exports.saveFavorite = async (req, res) => {
  try {
    const { gameId, title, cover, releaseDate, genre } = req.body;
    const newGame = new Game({ gameId, title, cover, releaseDate, genre });
    await newGame.save();
    res.status(201).json({ message: 'Game saved to favorites' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save game' });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch games' });
  }
};