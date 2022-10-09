const { Sequelize } = require('sequelize');

const conn = require('../database');
const Cow = require('./Cow');

const Weighing = conn.define('weighings', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

Cow.hasMany(Weighing, {
  onDelete: 'CASCADE',
});
Weighing.belongsTo(Cow);
Weighing.sync();
module.exports = Weighing;