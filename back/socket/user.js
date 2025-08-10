let user = new Map();

exports.connectionUser = (socket) => {
  socket.on("register", (userId) => {
    const cleanUserId = typeof userId === "string" ? userId.replace(/^"|"$/g, "") : userId;
    user.set(cleanUserId, socket.id);

    console.log(`Пользователь ${cleanUserId} зарегистрирован с socket ${socket.id}`);
  });
};

exports.connectionGetUser = (userId) => {
  const cleanUserId = typeof userId === "string" ? userId.replace(/^"|"$/g, "") : userId;
  return user.get(cleanUserId);
};
