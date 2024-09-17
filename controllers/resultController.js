const Result = require('../models/Result');
const StudentAnswer = require('../models/StudentAnswer');
const Question = require('../models/Question');
const Option = require('../models/Option');

exports.submitResult = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; // Array of { questionId, optionId }
    const userId = req.user.userId;

    let correctAnswers = 0;

    for (let answer of answers) {
      const option = await Option.findOne({
        where: {
          id: answer.optionId,
          questionId: answer.questionId
        }
      });

      if (option && option.isCorrect) {
        correctAnswers++;
      }

      await StudentAnswer.create({
        userId,
        questionId: answer.questionId,
        optionId: answer.optionId
      });
    }

    const totalQuestions = await Question.count({ where: { quizId } });
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    const result = await Result.create({
      userId,
      quizId,
      score
    });

    res.json({ message: 'Hasil berhasil disimpan', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserResults = async (req, res) => {
  try {
    const { userId } = req.params;

    const results = await Result.findAll({
      where: { userId }
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResultById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Result.findByPk(id);

    if (!result) return res.status(404).json({ message: 'Hasil tidak ditemukan' });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
