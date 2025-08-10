"use client";

import { createContext } from "react";
import { Estore } from "@/store/errorStore";
import { User } from "@/store/userStore";
import { task as Task } from "@/store/taskStatusStore";
import { TaskDeadlineStore } from "@/store/taskDeadlineStore";

export const Context = createContext({ store: Estore, user: User, task: Task, taskNow: TaskDeadlineStore });

interface Props {
  children: React.ReactNode;
}

export function Mobx({ children }: Props) {
  return (
    <>
      <Context.Provider value={{ store: Estore, user: User, task: Task, taskNow: TaskDeadlineStore }}>{children}</Context.Provider>
    </>
  );
}
