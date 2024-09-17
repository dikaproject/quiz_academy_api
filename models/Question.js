const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Quiz = require('./quiz');

const Question = db.define('Question', {
  quizId: {
    type: DataTypes.INTEGER,
    references: {
      model: Quiz,
      key: 'id'
    },
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'questions',
  timestamps: false
});

module.exports = Question;
