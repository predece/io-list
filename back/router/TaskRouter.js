const Router = require("express");
const router = Router();
const TaskController = require("../controller/TaskController");

router.post("/", TaskController.postTask);
router.post("/update/", TaskController.UpdateTask);
router.get("/", TaskController.getTask);
router.get("/finished/:id", TaskController.finishedTask);
router.delete("/delete/:id", TaskController.deleteTask);

module.exports = router;
