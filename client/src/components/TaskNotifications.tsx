"use client";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import io from "socket.io-client";
import { useContext } from "react";
import { Context } from "@/app/mobx-provider";
let socket: any;

const TaskNotifications = () => {
  const { taskNow, message, task } = useContext(Context);
  useEffect(() => {
    socket = io("http://localhost:7000");
    const userId = localStorage.getItem("userEmail");
    if (userId) {
      socket.emit("register", userId);
    }
    socket.on("taskUserConnectionId", (task: any) => {
      taskNow.postTask(task.task);
    });
    socket.on("expiredTask", (taskConf: any) => {
      taskNow.postTaskDeadline(taskConf.task);
      message.postQuantity(2);
      task.postWindowMessageTask(true);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return null;
};

export default observer(TaskNotifications);
