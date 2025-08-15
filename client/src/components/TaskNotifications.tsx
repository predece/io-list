"use client";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import io from "socket.io-client";
import { useContext } from "react";
import { Context } from "@/app/mobx-provider";
let socket;

const TaskNotifications = () => {
  const { taskNow } = useContext(Context);
  useEffect(() => {
    socket = io("http://localhost:7000");

    const userId = localStorage.getItem("userEmail");
    if (userId) {
      socket.emit("register", userId);
    }
    socket.on("taskUserConnectionId", (task) => {
      taskNow.postTask(task.task);
    });
    socket.on("expiredTask", (task) => {
      taskNow.postTaskDeadline(task.task);
    });
  }, []);

  return null;
};

export default observer(TaskNotifications);
