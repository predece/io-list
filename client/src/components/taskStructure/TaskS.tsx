"use client";

import { observer } from "mobx-react-lite";
import { useEffect, useState, useRef } from "react"; // Добавил useRef
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

interface ItimerState {
  [taskId: number]: {
    minutes: number;
    seconds: number;
  };
}

const TaskS = ({ caseId }: Itasks) => {
  const { taskNow, task } = useContext(Context);
  const [dateConfig, setDateConfig] = useState<IformDate[]>([]);
  const [timers, setTimers] = useState<ItimerState>({});

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
      await DeleteTask(id);
      const data = await GetTask();
      taskNow.postTask(data);
      taskNow.postTaskFinished(data);
    } catch (e) {
      console.error(e);
    }
  };

  const startTimerForTask = (taskId: number, initialTime: number) => {
    let time = initialTime;

    const minutes = Math.floor(initialTime / 60);
    const seconds = initialTime % 60;
    setTimers((prev) => ({
      ...prev,
      [taskId]: { minutes, seconds },
    }));

    const interval = setInterval(() => {
      if (time > 0) {
        time--;

        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        setTimers((prev) => ({
          ...prev,
          [taskId]: { minutes, seconds },
        }));
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  const TimerDeadline = (date: Date | null, taskId: number) => {
    const now = new Date();
    if (date) {
      const deadlineDate = new Date(date);
      const diffInSeconds = Math.floor((deadlineDate.getTime() - now.getTime()) / 1000);

      if (diffInSeconds > 0 && diffInSeconds <= 300) {
        startTimerForTask(taskId, diffInSeconds);
      }
    }
  };

  useEffect(() => {
    const task = async () => {
      try {
        const data = await GetTask();
        const arrNewTask: Itask[] = data.filter((task: Itask) => task.status === "todo");
        const arrFinishedTask: Itask[] = data.filter((task: Itask) => task.status === "done");
        const arrExpiredTask: Itask[] = data.filter((task: Itask) => task.status === "expired");

        taskNow.postTask(arrNewTask);
        taskNow.postTaskFinished(arrFinishedTask);
        taskNow.postTaskDeadline(arrExpiredTask);

        const dateConfigQ = data.map((prev: any) => ({
          id: prev.id,
          month: `${configurationData[prev.deadline.slice(5, 7) as keyof IconfigurationData]}`,
          day: prev.deadline.slice(8, 10),
          time: prev.deadline.slice(11, 19),
        }));
        setDateConfig(dateConfigQ);

        arrNewTask.forEach((taskItem: Itask) => {
          if (taskItem.notified && taskItem.deadline && taskItem.id) {
            TimerDeadline(taskItem.deadline, taskItem.id);
          }
        });
      } catch (e) {
        console.error(e);
      }
    };

    const DestroyInterval = setInterval(task, 1000);
    task();

    return () => {
      clearInterval(DestroyInterval);
    };
  }, []);

  return (
    <div className="font-normal text-[15px] ">
      {caseId == 1 &&
        (taskNow.getTask().length > 0 ? (
          [...taskNow.getTask()]
            .sort((a, b) => {
              if (a.notified && !b.notified) return -1;
              if (!a.notified && b.notified) return 1;
              return 0;
            })
            ?.map((taskData: any) => (
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
                    <div className="flex justify-between">
                      {checkIdDate(taskData.id)}
                      <div>
                        {taskData.notified && timers[taskData.id] && (
                          <div className="text-red-700">
                            Истекает через {timers[taskData.id].minutes.toString().padStart(2, "0")}:{timers[taskData.id].seconds.toString().padStart(2, "0")}
                          </div>
                        )}
                      </div>
                    </div>
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
