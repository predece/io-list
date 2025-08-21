const bcrypt = require("bcrypt");
const User = require("../module/User");
const jwt = require("jsonwebtoken");

const token = ({ email, role }) => {
  return jwt.sign({ email, role }, process.env.key, { expiresIn: "48h" });
};

class AuthController {
  async register(req, res) {
    try {
      const { email, password, role } = req.body;
      const checkUser = await User.findOne({ where: { email } });
      if (!email || !password) {
        res.json({ message: "Email and password requred" });
      }
      if (checkUser > 0) {
        return res.json({ message: "This user already exist" });
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const data = await User.create({ email, password: hashPassword, role });
      const jwtToken = await token({ email, role });
      return res.json({ jwtToken });
    } catch (e) {
      console.error(e);
    }
  }
  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ message: "Email and password requred" });
    }
    const data = await User.findOne({ where: { email } });
    if (!data) {
      return res.json({ message: "This user not exist" });
    }
    const checkPassword = await bcrypt.compareSync(password, data.password);
    if (!checkPassword) {
      return res.json({ message: "password no current" });
    }
    const jwtToken = await token({ email, role: data.role });
    return res.json({ jwtToken });
  }
  async User(req, res) {
    const { email } = req.query;
    if (email) {
      const data = await User.findOne({ where: { email } });
      if (data) {
        return res.json({ data });
      }
    }
  }
}
module.exports = new AuthController();
