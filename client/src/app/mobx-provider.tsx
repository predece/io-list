"use client";

import { createContext } from "react";
import { Estore } from "@/store/errorStore";
import { User } from "@/store/userStore";
import { task as Task } from "@/store/taskStatusStore";
import { TaskDeadlineStore } from "@/store/taskDeadlineStore";
import { Message } from "@/store/message";

export const Context = createContext({ store: Estore, user: User, task: Task, taskNow: TaskDeadlineStore, message: Message });

interface Props {
  children: React.ReactNode;
}

export function Mobx({ children }: Props) {
  return (
    <>
      <Context.Provider value={{ store: Estore, user: User, task: Task, taskNow: TaskDeadlineStore, message: Message }}>{children}</Context.Provider>
    </>
  );
}
