"use client";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import io from "socket.io-client";
import { useContext } from "react";
import { Context } from "@/app/mobx-provider";
import type { Itask } from "@/store/taskDeadlineStore";
let socket: any;

interface ItaskNotifications {
  task: Itask;
}

const TaskNotifications = () => {
  const { taskNow, message, task } = useContext(Context);
  useEffect(() => {
    socket = io("https://back-production-533d.up.railway.app/");
    const userId = localStorage.getItem("userEmail");
    if (userId) {
      socket.emit("register", userId);
    }
    socket.on("taskUserConnectionId", (task: ItaskNotifications) => {
      taskNow.postTask([task.task]);
    });
    socket.on("expiredTask", (taskConf: ItaskNotifications) => {
      taskNow.postTaskDeadline([taskConf.task]);
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
