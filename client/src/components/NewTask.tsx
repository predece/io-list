"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useRef, useState } from "react";
import { Context } from "@/app/mobx-provider";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import type { Itask } from "@/store/taskDeadlineStore";
import { AddTask } from "@/http/Task";

const buttonStyle = "border p-1 rounded hover:bg-hover-color transition-colors duration-400 ease-in-out cursor-pointer w-30 text-gray-400 border-gray-300";

const NewTask = () => {
  const { task, taskNow } = useContext(Context);
  const inputRef = useRef<HTMLInputElement>(null);
  const [stateWindow, setStateWindow] = useState({
    PriorityWindow: false,
    CheckCloseWindow: false,
  });
  const [deadline, setDeadline] = useState(null);
  const [userId, setUserId] = useState<string>("");
  const [config, setConfig] = useState<Itask>({
    title: "",
    description: "",
    UserId: "",
    deadline: null,
    priority: "medium",
    status: "todo",
    notified: false,
  });

  useEffect(() => {
    const userId = localStorage.getItem("userEmail");
    if (userId) {
      setConfig((state) => ({ ...state, UserId: JSON.parse(userId) }));
    }
  }, []);

  useEffect(() => {
    if (task.getWindowTask() && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [task.getWindowTask()]);

  const closeTask = () => {
    setStateWindow((status) => ({ ...status, CheckCloseWindow: true }));
    setStateWindow((state) => ({ ...state, PriorityWindow: false }));
  };

  const confirmClose = () => {
    task.postWindowTask(false);

    setStateWindow({
      PriorityWindow: false,
      CheckCloseWindow: false,
    });
  };

  const cancelClose = () => {
    setStateWindow((status) => ({ ...status, CheckCloseWindow: false }));
  };

  const fuPriority = (_priority: string) => {
    setConfig((prev) => ({ ...prev, priority: _priority }));
    setStateWindow((prev) => ({ ...prev, PriorityWindow: false }));
  };
  const ptiorityList = () => {
    if (!stateWindow.PriorityWindow) {
      setStateWindow((state) => ({ ...state, PriorityWindow: true }));
    } else {
      setStateWindow((state) => ({ ...state, PriorityWindow: false }));
    }
  };
  const fuNewTask = async () => {
    if (config.title && config.deadline) {
      await AddTask(config);
      task.postWindowTask(false);
    }
  };
  return (
    <>
      {task.getWindowTask() && (
        <div>
          <div className="fixed inset-0 bg-black/50 w-screen h-screen" onClick={closeTask} />
          <section className="fixed top-0 left-0 w-screen h-screen flex mt-30 justify-center " onClick={closeTask}>
            <div className="grid max-w-[550px] max-h-[210px] w-full h-full shadow-[5px_5px_25px_gray] p-5 rounded-[10px] z-2 bg-white" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col gap-2">
                <input
                  ref={inputRef}
                  onChange={(e) => {
                    setConfig((prev) => ({ ...prev, title: e.target.value }));
                  }}
                  placeholder="Найти рейсы для поездки p2"
                  className="font-bold text-[19px] text-gray-800 outline-none"
                />
                <input onChange={(e) => setConfig((prev) => ({ ...prev, description: e.target.value }))} placeholder="Описание" className="text-[0.85rem] text-gray-800" />
                <div className="flex flex-row gap-5 relative">
                  <label className="text-center mt-[1px]">
                    <div className="text-gray-500">Дедлайн</div>
                    <DatePicker
                      placeholderText="Выбрать время"
                      selected={config.deadline}
                      onChange={(date: any) => setConfig((state) => ({ ...state, deadline: date }))}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={1}
                      dateFormat="dd.MM.yyyy HH:mm"
                      className={`cursor-pointer text-center text-[14px] ${buttonStyle}`}
                    />
                  </label>

                  <button onClick={() => ptiorityList()} className={`${buttonStyle}`}>
                    Приоритет <br /> {config.priority ? config.priority : "..."}
                  </button>
                  {stateWindow.PriorityWindow && (
                    <li className="absolute left-31 top-17 flex flex-col bg-white p-3 rounded gap-2 border shadow-2xl">
                      <button onClick={() => fuPriority("high")} className={`${buttonStyle} bg-[rgb(192_61_61)] hover:bg-red-800 text-gray-900`}>
                        Высокий
                      </button>
                      <button onClick={() => fuPriority("medium")} className={`${buttonStyle} bg-[rgb(240_120_2)] hover:bg-orange-600 text-gray-900`}>
                        Средний
                      </button>
                      <button onClick={() => fuPriority("low")} className={`${buttonStyle} bg-[rgb(255_242_0)] hover:bg-yellow-500 text-gray-900`}>
                        Низкий
                      </button>
                      <button onClick={() => fuPriority("none")} className={`${buttonStyle} bg-white text-gray-900 text-[15px]`}>
                        Без приоритета
                      </button>
                    </li>
                  )}
                  <button className={buttonStyle}>Напоминания</button>
                </div>
                <hr className="mt-2 ml-[-20px] mr-[-20px] text-gray-400" />
                <div className="flex gap-5 w-full justify-end">
                  <button onClick={() => task.postWindowTask(false)} className={`${buttonStyle} w-[70px]`}>
                    Назад
                  </button>
                  <button onClick={() => fuNewTask()} className={`${buttonStyle} w-[80px]`}>
                    Создать
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {stateWindow.CheckCloseWindow && (
        <div>
          <div className="absolute top-0 left-0 w-screen h-screen" />
          <div className="fixed top-0 left-0 grid w-screen mt-60 justify-center h-20 z-[9999] text-center">
            <div className="bg-white w-100 grid gap-3 rounded shadow-[8px_12px_30px_black] p-2">
              <div>Вы уверены, что хотите закрыть данное окно?</div>
              <div className="flex justify-between ml-10 mr-10">
                <button className={`${buttonStyle}`} onClick={confirmClose}>
                  Закрыть
                </button>
                <button className={`${buttonStyle}`} onClick={cancelClose}>
                  Назад
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default observer(NewTask);
