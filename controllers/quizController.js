const Quiz = require('../models/quiz');

exports.createQuiz = async (req, res) => {
  try {
    const { title, description } = req.body;

    const quiz = await Quiz.create({
      title,
      description
    });

    res.status(201).json({ message: 'Kuis berhasil dibuat', quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findByPk(id);

    if (!quiz) return res.status(404).json({ message: 'Kuis tidak ditemukan' });

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const quiz = await Quiz.findByPk(id);
    if (!quiz) return res.status(404).json({ message: 'Kuis tidak ditemukan' });

    quiz.title = title || quiz.title;
    quiz.description = description || quiz.description;

    await quiz.save();

    res.json({ message: 'Kuis berhasil diperbarui', quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findByPk(id);

    if (!quiz) return res.status(404).json({ message: 'Kuis tidak ditemukan' });

    await quiz.destroy();

    res.json({ message: 'Kuis berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
