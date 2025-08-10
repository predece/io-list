const cron = require("node-cron");
const Task = require("../module/Task");
const { Op } = require("sequelize");
const { getIo } = require("../socket/index");
const { connectionGetUser } = require("../socket/user");

class Cron {
  checkCron() {
    cron.schedule("*/5 * * * * *", async () => {
      try {
        console.log("Проверка дедлайна задач");

        const NowTime = new Date();
        const fiveMinutesFromNow = new Date(NowTime.getTime() + 5 * 60 * 1000);
        const dueTasks = await Task.findAll({
          where: {
            deadline: {
              [Op.lte]: fiveMinutesFromNow,
              [Op.gt]: NowTime,
            },
            notified: false,
          },
        });
        if (dueTasks.length > 0) {
          for (const task of dueTasks) {
            const io = getIo();
            const userConnectionId = connectionGetUser(task.UserId);
            if (userConnectionId) {
              io.to(userConnectionId).emit("taskUserConnectionId", {
                task,
              });
            } else {
              console.log("Error");
            }

            await sendNotification(task);
            // await task.update({ notified: true });
          }

          console.log(`Отправелно ${dueTasks.length} уведомлений о дедлайнах`);
        }
      } catch (e) {
        console.error("Ошибка при проверке дедлайнов", e);
      }
    });
  }
}

async function sendNotification(task) {
  console.log(`Напоминание: задача ${task.title} должна быть выполнена к ${task.deadline}`);
}

module.exports = new Cron();
