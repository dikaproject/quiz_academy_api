const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Membuat kuis baru
router.post('/', quizController.createQuiz);

// Mendapatkan semua kuis
router.get('/', quizController.getAllQuizzes);

// Mendapatkan kuis berdasarkan ID
router.get('/:id', quizController.getQuizById);

// Memperbarui kuis berdasarkan ID
router.put('/:id', quizController.updateQuiz);

// Menghapus kuis berdasarkan ID
router.delete('/:id', quizController.deleteQuiz);

module.exports = router;
