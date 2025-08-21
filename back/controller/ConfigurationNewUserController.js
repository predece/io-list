const User = require("../module/User");

class ProfileUser {
  async AddProfile(req, res) {
    try {
      if (!req.body.email) {
        return res.json({ message: "Ошибка, повторите запрос позже" });
      }
      if (!req.file.path) {
        return res.json({ message: "Ошибка сохранения задачи, попробуйте еще раз" });
      }
      const { email, name } = req.body;
      let configUser = {};
      configUser.img = req.file.path;
      if (email && name) {
        const checkConfigUser = await User.findOne({ where: { email } });
        if (checkConfigUser.name === name) {
          res.json({ message: "Повтор имени" });
        } else {
          configUser.name = name;
        }
      }

      const user = await User.findOne({ where: { email } });
      const data = await user.update(configUser);
      return res.json({ data });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new ProfileUser();
