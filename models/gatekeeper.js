const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const GateKeeper = sequelize.define('gatekeeper', {
  id : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  staff_required: Sequelize.INTEGER,
  percent: Sequelize.INTEGER,
},{
  freezeTableName: true,
  timestamps: false
});

module.exports = GateKeeper;