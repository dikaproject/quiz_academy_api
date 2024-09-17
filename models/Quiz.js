const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Quiz = db.define('Quiz', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'quizzes',
  timestamps: false
});

module.exports = Quiz;
