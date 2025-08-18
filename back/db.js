const Sequelize = require("sequelize");

module.exports = new Sequelize(process.env.DATABASE_PUBLIC_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
