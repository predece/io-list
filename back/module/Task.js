const { DataTypes, DATE } = require("sequelize");
const sequelize = require("../db");
module.exports = sequelize.define("task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  UserId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "users",
      key: "email",
    },
  },
  deadline: {
    type: DataTypes.DATE,
  },
  priority: {
    type: DataTypes.ENUM("none", "low", "medium", "high"),
    defaultValue: "medium",
  },
  status: {
    type: DataTypes.ENUM("todo", "in_progress", "done"),
    defaultValue: "todo",
  },
  notified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
