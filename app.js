const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');

app.use('/auth', authRoutes);
app.use('/api/games', gameRoutes);

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'front.html'));
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});