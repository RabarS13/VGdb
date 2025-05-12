const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Add favorite (authenticated)
router.post('/favorite', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.favorites.push(req.body);
    await user.save();
    res.status(201).json({ message: 'Game added to favorites' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save game' });
  }
});

// Get favorites (authenticated)
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

module.exports = router;