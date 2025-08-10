"use client";

import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "@/app/mobx-provider";
import TaskS from "./taskStructure/TaskS";

const TaskExpired = () => {
  const { task } = useContext(Context);
  let statusTask = task.getWindowExpiredTask();
  return (
    <>
      {statusTask && (
        <section className="flex flex-col  text-[24px] text-[#202020] font-bold">
          <div>Просрочены:</div>
          <hr className="mb-2 text-gray-500/10" />
          <TaskS caseId={2} />
        </section>
      )}
    </>
  );
};

export default observer(TaskExpired);
