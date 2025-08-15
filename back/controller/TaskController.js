const Task = require("../module/Task");
const { ForeignKeyConstraintError } = require("sequelize");

class TaskController {
  async postTask(req, res) {
    try {
      const { UserId, title, description, deadline, status, priority, notified } = req.body;
      const TaskConfig = {
        UserId,
        title,
        description,
        deadline,
        priority,
        notified,
        ...(status && { status }),
      };

      const data = await Task.create(TaskConfig);
      return res.json({ data });
    } catch (e) {
      if (e instanceof ForeignKeyConstraintError) {
        return res.status(400).json({
          message: "Не удалось добавить задачу, так как такой пользователь не существует",
        });
      }
      console.error(e);
      return res.status(500).json({ message: "Ошибка при создании задачи" });
    }
  }
  async getTask(req, res) {
    const ArrayTask = await Task.findAll();
    return res.json(ArrayTask);
  }
  async finishedTask(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.json({ message: "Id not found" });
      }
      const taskId = await Task.findByPk(id);
      const task = await taskId.update({ status: "done" });

      return res.json(task);
    } catch (e) {
      res.json(console.log(e));
    }
  }
  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.json({ message: "Id not found" });
      }
      const checkTask = Task.findByPk(id);
      if (checkTask) {
        res.json({ message: "Задача не найдена" });
      }
      const newTask = Task.destroy({ where: { id } });
      if (newTask) {
        return res.json({ message: "Задача удалена" });
      }
    } catch (e) {
      console.log(e);
    }
  }
  async UpdateTask(req, res) {
    try {
      const { id, title, description, deadline, priority } = req.body;
      const checkTask = await Task.findByPk(id);
      if (!checkTask) {
        return res.json({ message: "Task not found" });
      }
      const UpdateTask = await checkTask.update({ title, description, deadline, priority, notified: false, status: "todo" });
      return res.json(UpdateTask);
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new TaskController();
