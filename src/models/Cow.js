const { Sequelize } = require('sequelize');
const conn = require('../database');

const Cow = conn.define('cows', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  birth: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Cow.sync();
module.exports = Cow;