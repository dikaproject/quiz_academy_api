require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quizzes');
const questionRoutes = require('./routes/questions');
const resultRoutes = require('./routes/results');
const { authenticateToken } = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/quizzes', authenticateToken, quizRoutes);
app.use('/questions', authenticateToken, questionRoutes);
app.use('/results', authenticateToken, resultRoutes);

// Error Handling
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
