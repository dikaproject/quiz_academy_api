const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('student', 'admin'),
    defaultValue: 'student'
  }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User;
