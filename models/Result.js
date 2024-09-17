const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');
const Quiz = require('./quiz');

const Result = db.define('Result', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  quizId: {
    type: DataTypes.INTEGER,
    references: {
      model: Quiz,
      key: 'id'
    },
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'results',
  timestamps: false
});

module.exports = Result;
