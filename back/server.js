require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router/index");
const sequelize = require("./db");
// const fileUpload = require("express-fileupload");
// const path = require("path");
const cron = require("./cronTask/cron");
const http = require("http");
const { initSoket } = require("./socket");
const server = http.createServer(app);


app.use(cors());


initSoket(server);

app.use(express.json());
// app.use(fileUpload());
// app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", router);

server.listen(7000);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server start" });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    cron.checkCron();
  } catch (e) {
    console.error(e);
  }
};
start();

