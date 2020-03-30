const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('users', {
  id : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  cover: Sequelize.STRING,
  begin_at: Sequelize.DATE,
  end_at: Sequelize.DATE,
  login_time: Sequelize.INTEGER,
  gate: Sequelize.INTEGER
},{
  freezeTableName: true,
  timestamps: false
});

module.exports = User;