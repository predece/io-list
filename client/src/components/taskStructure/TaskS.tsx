"use client";

import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "@/app/mobx-provider";
import { DeleteTask, FinishedTask, GetTask } from "@/http/Task";
import { configurationData, type IconfigurationData } from "@/config/Time.config";
import type { Itask } from "@/store/taskDeadlineStore";
import Image from "next/image";

interface Itasks {
  caseId: number;
}
interface IformDate {
  id: number;
  month: string;
  day: string;
  time: string;
}

const TaskS = ({ caseId }: Itasks) => {
  const { taskNow, task } = useContext(Context);
  const [dateConfig, setDateConfig] = useState<IformDate[]>([]);

  const checkIdDate = (id: number) => {
    for (const check of dateConfig) {
      if (check.id == id) {
        return (
          <>
            <span key={check.id} className="flex gap-1 text-[13px] text-red-700">
              <div>{check.day}</div>
              <div>{check.month}</div>
              <div>{check.time}</div>
            </span>
          </>
        );
      }
    }
  };
  const fuFinishedTask = async (id: number) => {
    try {
      const task = await FinishedTask(id);
      if (!task.message) {
        taskNow.postTaskFinished(task);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const fuDeleteTask = async (id: number) => {
    try {
      console.log(id);
      await DeleteTask(id);
      const data = await GetTask();
      console.log(data);
      taskNow.postTask(data);
      taskNow.postTaskFinished(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    try {
      const taskLog = async () => {
        const data = await GetTask();
        let arrNewTask: Itask[] = [];
        let arrFinishedTask: Itask[] = [];
        for (const checkNewTask of data) {
          if (checkNewTask.status === "todo") {
            arrNewTask.push(checkNewTask);
          }
          if (checkNewTask.status === "done") {
            arrFinishedTask.push(checkNewTask);
          }
        }
        if (arrNewTask.length > 0) {
          taskNow.postTask(arrNewTask);
        }
        if (arrFinishedTask.length > 0) {
          taskNow.postTaskFinished(arrFinishedTask);
        }
        const dateConfigQ = data.map((prev: any) => ({
          id: prev.id,
          month: `${configurationData[prev.deadline.slice(5, 7) as keyof IconfigurationData]}`,
          day: prev.deadline.slice(8, 10),
          time: prev.deadline.slice(11, 19),
        }));
        console.log(dateConfigQ);
        setDateConfig(dateConfigQ);
      };
      taskLog();
    } catch (e) {
      console.error(e);
    }
  }, []);
  console.log(taskNow.getTaskFinished());
  return (
    <div className="font-normal text-[15px] ">
      {caseId == 1 &&
        (taskNow.getTask().length > 0 ? (
          taskNow.getTask()?.map((taskData: any) => (
            <section key={taskData.id} className="grid h-full mt-2">
              <div className="flex ">
                <div className="flex h-5 w-7">
                  <input onClick={() => fuFinishedTask(taskData.id)} type="radio" className="cursor-pointer" />
                </div>
                <div className="grid w-full">
                  <div className="flex  items-center justify-between">
                    <div className="">{taskData.title}</div>
                    <div>{taskData.priority}</div>
                  </div>
                  {taskData.description && <div className="text-[13px] text-gray-500">{taskData.description}</div>}
                  {checkIdDate(taskData.id)}
                </div>
              </div>
              <hr className="mb-2 text-gray-500/10" />
            </section>
          ))
        ) : (
          <a onClick={() => task.postWindowTask(true)} className="font-normal text-[14px] text-gray-500 mt-1 cursor-pointer hover:text-gray-600 duration-300 ease-in-out">
            К сожалению, Вы не добавили ни одной задачи. Попробуйте сделать это прямо сейчас!
          </a>
        ))}
      {caseId == 2 &&
        (taskNow.getTaskDeadline().length > 0 ? (
          taskNow.getTaskDeadline().map((taskData: any) => (
            <section key={taskData.id} className="grid h-full mt-2">
              <div className="flex ">
                <div className="flex h-5 w-7">
                  <input onClick={() => fuFinishedTask(taskData.id)} type="radio" className="cursor-pointer" />
                </div>
                <div className="grid w-full">
                  <div className="flex  items-center justify-between">
                    <div className="">{taskData.title}</div>
                    <div>{taskData.priority}</div>
                  </div>
                  {taskData.description && <div className="text-[13px] text-gray-500">{taskData.description}</div>}
                  {checkIdDate(taskData.id)}
                </div>
              </div>
              <hr className="mb-2 text-gray-500/10" />
            </section>
          ))
        ) : (
          <div className="font-normal text-[14px] text-gray-500 mt-1 cursor-pointer hover:text-gray-600 duration-300 ease-in-out">У вас нет просроченных задач!</div>
        ))}
      {caseId == 3 &&
        (taskNow.getTaskFinished().length > 0 ? (
          taskNow.getTaskFinished().map((taskData: any) => (
            <section key={taskData.id} className="grid h-full mt-2">
              <div className="flex ">
                <div className="grid h-5  w-7 justify-center ">
                  <div>✅</div>
                  <Image alt="reloadTask" src="/ReloadTask.svg" width={17} height={17} className="cursor-pointer" />
                </div>
                <div className="grid w-full">
                  <div className="flex  items-center justify-between">
                    <div className="">{taskData.title}</div>
                    <div>{taskData.priority}</div>
                  </div>
                  {taskData.description && <div className="text-[13px] text-gray-500">{taskData.description}</div>}
                  <div className="flex justify-between">
                    {checkIdDate(taskData.id)}
                    <Image onClick={() => fuDeleteTask(taskData.id)} alt="basket" src="/BasketTask.svg" width={17} height={17} className="cursor-pointer" />
                  </div>
                </div>
              </div>
              <hr className="mb-2 text-gray-500/10" />
            </section>
          ))
        ) : (
          <div className="font-normal text-[14px] text-gray-500 mt-1 cursor-pointer hover:text-gray-600 duration-300 ease-in-out">У вас нет выполненных задач!</div>
        ))}
    </div>
  );
};

export default observer(TaskS);
