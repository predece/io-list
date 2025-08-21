const User = require("../module/User");

class ProfileUser {
  async AddProfile(req, res) {
    try {
      let configUser = {};

      if (!req.body.email) {
        return res.json({ message: "Ошибка, повторите запрос позже" });
      }
      if (req.file) {
        if (!req.file.path) {
          return res.json({ message: "Ошибка сохранения задачи, попробуйте еще раз" });
        } else {
          configUser.img = req.file.path;
        }
      }

      const { email, name } = req.body;
      console.log(email, name);

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
