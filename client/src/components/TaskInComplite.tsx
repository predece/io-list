import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "@/app/mobx-provider";
import TaskS from "./taskStructure/TaskS";

const TaskList = () => {
  const { task, taskNow } = useContext(Context);
  let statusWindow = task.getWindowTitleTask();
  return (
    <>
      {statusWindow && (
        <div className="flex flex-col  text-[24px] text-[#202020] font-bold">
          <section>
            <div>Ждут выполнения:</div>
            <hr className="mb-2 text-gray-500/10" />
            <TaskS caseId={1} />
          </section>
          {/* <section>
            <div>Просрочены:</div>
            <hr className="mb-2 text-gray-500/10" />
            <TaskS caseId={2} />
          </section>
          <section>
            <div>Выполнены:</div>
            <hr className="mb-2 text-gray-500/10" />
            <TaskS caseId={3} />
          </section> */}
        </div>
      )}
    </>
  );
};

export default observer(TaskList);
