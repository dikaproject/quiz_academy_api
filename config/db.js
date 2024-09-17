const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

db.authenticate()
  .then(() => {
    console.log('Terhubung ke database MySQL!');
  })
  .catch(err => {
    console.error('Tidak dapat terhubung ke database:', err);
  });

module.exports = db;
