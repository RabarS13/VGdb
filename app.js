// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const gameRoutes = require('./routes/gameRoutes');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'front.html'));
});

// API Routes
app.use('/api/games', gameRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
}).catch(err => console.error('❌ MongoDB connection error:', err));
