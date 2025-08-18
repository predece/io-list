const { Sequelize } = require("sequelize");

module.exports = new Sequelize(process.env.DB_CONFIG, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
