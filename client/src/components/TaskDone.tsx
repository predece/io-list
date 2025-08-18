"use client";

import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "@/app/mobx-provider";
import TaskS from "./taskStructure/TaskS";

const TaskDone = () => {
  const { task } = useContext(Context);
  const statusTask = task.getWindowDoneTask();
  return (
    <>
      {statusTask && (
        <section className="flex flex-col  text-[24px] text-[#202020] font-bold">
          <div>Выполнены:</div>
          <hr className="mb-2 text-gray-500/10" />
          <TaskS caseId={3} />
        </section>
      )}
    </>
  );
};

export default observer(TaskDone);
