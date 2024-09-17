const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');
const Question = require('./Question');
const Option = require('./Option');

const StudentAnswer = db.define('StudentAnswer', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  questionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Question,
      key: 'id'
    },
    allowNull: false
  },
  optionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Option,
      key: 'id'
    },
    allowNull: false
  }
}, {
  tableName: 'student_answers',
  timestamps: false
});

module.exports = StudentAnswer;
