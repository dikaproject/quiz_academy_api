const Question = require('../models/Question');
const Option = require('../models/Option');

exports.addQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { text, options } = req.body;

    const question = await Question.create({ quizId, text });

    // Tambahkan opsi jawaban
    if (options && options.length > 0) {
      for (let opt of options) {
        await Option.create({
          questionId: question.id,
          text: opt.text,
          isCorrect: opt.isCorrect || false
        });
      }
    }

    res.status(201).json({ message: 'Pertanyaan berhasil ditambahkan', question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestionsByQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const questions = await Question.findAll({
      where: { quizId },
      include: [Option]
    });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, options } = req.body;

    const question = await Question.findByPk(id);
    if (!question) return res.status(404).json({ message: 'Pertanyaan tidak ditemukan' });

    question.text = text || question.text;
    await question.save();

    // Update options if provided
    if (options && options.length > 0) {
      await Option.destroy({ where: { questionId: id } });
      for (let opt of options) {
        await Option.create({
          questionId: id,
          text: opt.text,
          isCorrect: opt.isCorrect || false
        });
      }
    }

    res.json({ message: 'Pertanyaan berhasil diperbarui', question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);

    if (!question) return res.status(404).json({ message: 'Pertanyaan tidak ditemukan' });

    await Option.destroy({ where: { questionId: id } });
    await question.destroy();

    res.json({ message: 'Pertanyaan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
