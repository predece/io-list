const Router = require("express");
const router = Router();
const NewConfig = require("../controller/ConfigurationNewUserController");

router.post("/", NewConfig.AddProfile);

module.exports = router;
