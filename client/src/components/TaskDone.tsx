"use client";

import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "@/app/mobx-provider";

const TaskDone = () => {
  const { task } = useContext(Context);
  let statusTask = task.gettWindowDoneTask();
  return <>{statusTask && <section></section>}</>;
};

export default observer(TaskDone);
