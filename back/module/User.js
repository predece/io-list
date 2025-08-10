const DataTypes = require("sequelize");
const sequelize = require("../db");

module.exports = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  img: {
    type: DataTypes.STRING,
  },
});
