const Router = require("express");
const router = Router();
const TaskController = require("../controller/TaskController");

router.post("/", TaskController.postTask);
router.get("/", TaskController.getTask);
router.get("/:id", TaskController.finishedTask);
router.delete("/:id", TaskController.deleteTask);

module.exports = router;
