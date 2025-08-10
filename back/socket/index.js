const soketIo = require("socket.io");
const { connectionUser } = require("./user");
const { handleConnection } = require("./handler");

let io;

exports.initSoket = (server) => {
  io = soketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    connectionUser(socket);
    handleConnection(socket);
  });
};

exports.getIo = () => {
  if (!io) {
    throw new Error("Socket.io не инициализирован");
  }
  return io;
};
