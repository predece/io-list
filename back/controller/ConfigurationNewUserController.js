const path = require("path");
const User = require("../module/User");
const uuid = require("uuid");

class ProfileUser {
  async AddProfile(req, res) {
    try {
      if (!req.body.email) {
        return res.json({ message: "Ошибка, повторите запрос позже" });
      }
      const { email, name } = req.body;
      let configUser = {};
      let fileImage = null;
      if (req.files) {
        const { img } = req.files;
        fileImage = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileImage));
      }
      if (email && name) {
        const checkConfigUser = await User.findOne({ where: { email } });
        if (checkConfigUser.name === name) {
          res.json({ message: "Повтор имени" });
        } else {
          configUser.name = name;
        }
      }
      if (fileImage) {
        configUser.img = fileImage;
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
