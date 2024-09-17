const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Menambahkan pertanyaan ke kuis tertentu
router.post('/:quizId', questionController.addQuestion);

// Mendapatkan semua pertanyaan dari kuis tertentu
router.get('/:quizId', questionController.getQuestionsByQuiz);

// Memperbarui pertanyaan berdasarkan ID
router.put('/:id', questionController.updateQuestion);

// Menghapus pertanyaan berdasarkan ID
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;
