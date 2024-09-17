const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Question = require('./Question');

const Option = db.define('Option', {
  questionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Question,
      key: 'id'
    },
    allowNull: false
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isCorrect: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'options',
  timestamps: false
});

module.exports = Option;
