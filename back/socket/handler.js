exports.handleConnection = (socket) => {
  console.log("Новый клиент подключился:", socket.id);
  socket.on("disconnect", () => {
    console.log("Клиент отключился:", socket.id);
  });
};
