const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

// Mengirim jawaban dan mendapatkan hasil
router.post('/:quizId', resultController.submitResult);

// Mendapatkan hasil kuis pengguna
router.get('/user/:userId', resultController.getUserResults);

// Mendapatkan hasil kuis berdasarkan ID
router.get('/:id', resultController.getResultById);

module.exports = router;
