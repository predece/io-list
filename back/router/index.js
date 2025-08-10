const Router = require("express");
const router = Router();
const AuthRouter = require("./RegistrationRouters");
const ConfigRouter = require("./ConfigRouter");
const TaskRouter = require("./TaskRouter");

router.use("/", AuthRouter);
router.use("/config", ConfigRouter);
router.use("/task", TaskRouter);

module.exports = router;
