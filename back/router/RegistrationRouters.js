const Router = require("express");
const router = Router();
const Auth = require("../controller/AuthController");
const Token = require("../middleware/AuthMiddle");

router.post("/registration", Auth.register);
router.post("/login", Auth.login);
router.get("/userConfig", Auth.User);
router.get("/auth", Token, (req, res) => {
  const token = req.user;
  return res.json({ token });
});

module.exports = router;
