const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/favorite', gameController.saveFavorite);
router.get('/favorites', gameController.getFavorites);

module.exports = router;