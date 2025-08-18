const soketIo = require("socket.io");
const { connectionUser } = require("./user");
const { handleConnection } = require("./handler");

let io;

exports.initSoket = (server) => {
  io = soketIo(server, {
    cors: {
      origin: "https://client-production-dcf8.up.railway.app",
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
