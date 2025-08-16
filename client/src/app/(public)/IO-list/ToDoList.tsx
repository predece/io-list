"use client";

import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Context } from "@/app/mobx-provider";
import { useContext } from "react";
import { Config } from "@/http/Config";
import ErrorMessage from "@/error/errorMessage";
import Loading from "../../../components/Loading";
import NewTask from "../../../components/NewTask";
import TaskInComplite from "@/components/TaskInComplite";
import TaskDone from "@/components/TaskDone";
import TaskExpired from "@/components/TaskExpired";
import MessageTask from "@/message/messageTask";

const ToDoList = () => {
  const { store, user, task, taskNow } = useContext(Context);

  const [userName, setUserName] = useState<string | null>();
  const [name, setName] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [urlImage, setUrlImage] = useState<string | null>();
  const [state, setState] = useState<boolean>(true);
  const [checkPersonalization, setCheckPersonalization] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string>("");

  const personalizationUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!checkPersonalization) {
        setCheckPersonalization(true);
      } else {
        setCheckPersonalization(false);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const FuSaveConfig = async (type: string) => {
    const formData = new FormData();
    if (type === "name" && name.length <= 16) {
      console.log(name.length);
      formData.append("name", name);
    } else {
      formData.append("img", img);
    }
    if (name || img) {
      let parseUser = localStorage.getItem("userEmail");
      if (parseUser) {
        const userEmail = JSON.parse(parseUser);
        formData.append("email", userEmail);
        const data = await Config(formData);
        if (data.data) {
          setUserName(data.data.name);
          setUrlImage(data.data.img);
        }
        store.postError(data.message);
      }
    }
  };
  const visibilityClass = [
    { checkOpen: checkPersonalization ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none" },
    { checkOpenBorder: checkPersonalization ? "bg-gray-200/80 rounded ease-in-out" : "" },
  ];
  useEffect(() => {
    setTimeout(() => {
      try {
        setUserName(user.getUser()?.name);
        setUrlImage(user.getUser()?.img);
      } catch (e) {
        console.error(e);
      }
    }, 500);
  }, []);
  return (
    <>
      <div className="w-screen h-screen grid grid-cols-[auto_1fr] overflow-x-hidden overflow-y-auto">
        {state ? (
          <section className="w-55 2xl:w-85 xl:w-80 lg:w-70 md:w-70 sm:w-65">
            <section className="fixed  w-55 2xl:w-85 xl:w-80 lg:w-70 md:w-70 sm:w-65 bg-[#FCFAF8] p-5 transition-all h-full min-h-screen duration-200">
              <section className="flex justify-between h-15">
                <button
                  className={`flex items-center h-auto cursor-pointer transition-color p-[0px_10px] duration-200 ease-in-out hover:bg-hover-color rounded ${visibilityClass[1].checkOpenBorder}`}
                  onClick={(e) => personalizationUser(e)}
                >
                  <Image
                    src={urlImage ? `http://localhost:7000/${urlImage}` : "/DefaulUser.svg"}
                    alt="DefaultUser"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "40px", height: "40px" }}
                    className="rounded-[50%] border border-gray-800/50 p-0.5"
                  />
                  <span className="ml-4">{userName ? userName : "user"}</span>
                  <div className="ml-4">{">"}</div>
                </button>
                <div
                  className={`absolute top-26 rounded border w-56 p-3 grid grid-rows-4 gap-3 transition-all duration-600 border-gray-800/50 z-999 bg-[#FCFAF8] shadow-[6px_5px_10px_gray] ${visibilityClass[0].checkOpen}`}
                >
                  <div>Добавьте имя</div>
                  <div className="flex gap-1">
                    <input
                      className="p-1 w-40 border border-gray-500/50 rounded transition-colors ease-in-out duration-700 outline-none  focus:border-gray-800 text-[15px]"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <button
                      className="cursor-pointer border rounded p-2 border-gray-500/50 hover:bg-gray-200/80 transition duration-300 ease-in-out hover:translate-x-1"
                      onClick={() => FuSaveConfig("name")}
                    >
                      <Image src="/SaveConfigIcon.svg" alt="config-IO" width={20} height={20} />
                    </button>
                  </div>
                  <div>Добавьте фото</div>
                  <div className="flex gap-1">
                    <label className="flex cursor-pointer items-center w-[160px] h-9 p-1 border border-gray-500/50 rounded transition-colors ease-in-out duration-700 outline-none  focus:border-gray-800">
                      <p className="text-gray-500 text-[15px]">Выберите файл</p>
                      <input className="hidden" type="file" onChange={(e) => setImg(e.target.files[0])} />
                    </label>
                    <button
                      className="cursor-pointer border rounded p-2 border-gray-500/50 hover:bg-gray-200/80 transition duration-300 ease-in-out hover:translate-x-1 w-[34px]"
                      onClick={() => FuSaveConfig("image")}
                    >
                      <Image src="/SaveConfigIcon.svg" alt="config-IO" width={20} height={20} />
                    </button>
                  </div>
                </div>

                <div className="items-center">
                  <button className="h-full">
                    <Image src="/ThemeIcon.svg" alt="ThemeIcon" width={30} height={30} className="cursor-pointer" />
                  </button>

                  <button></button>
                </div>
              </section>
              <hr className="text-gray-300 mt-3" />
              <section className="grid mt-3 gap-2">
                <button
                  className="flex text-[18px] w-full text-orange-600 cursor-pointer active:text-[17.5px] active:scale-95 duration-200 ease-in-out hover:bg-hover-color rounded transform-gpu z-1 m-[10px_0px]"
                  onClick={() => {
                    task.postWindowTask(true);
                  }}
                >
                  + Добавить задачу
                </button>
                <button
                  className={`text-[15px] border-border-color  p-1  w-full text-left  transition-colors duration-200 ease-in-out cursor-pointer ${
                    activeButton === "incoming" ? "bg-active-menu-task-color rounded hover:bg-active-menu-task-color" : "hover:bg-hover-color"
                  }`}
                  onClick={() => {
                    setActiveButton("incoming");
                    task.postWindowTitleTask(true);
                    task.postWindowDoneTask(false);
                    task.postWindowExpiredTask(false);
                  }}
                >
                  Входящие
                </button>
                <button
                  className={`text-[15px] border-border-color  p-1  w-full text-left  transition-colors duration-200 ease-in-out cursor-pointer ${
                    activeButton === "expired" ? "bg-active-menu-task-color rounded hover:bg-active-menu-task-color" : "hover:bg-hover-color"
                  }`}
                  onClick={() => {
                    setActiveButton("expired");
                    task.postWindowTitleTask(false);
                    task.postWindowDoneTask(false);
                    task.postWindowExpiredTask(true);
                  }}
                >
                  Просрочены
                </button>
                <button
                  className={`text-[15px] border-border-color  p-1  w-full text-left transition-colors duration-200 ease-in-out cursor-pointer ${
                    activeButton === "done" ? "bg-active-menu-task-color rounded hover:bg-active-menu-task-color" : "hover:bg-hover-color"
                  }`}
                  onClick={() => {
                    setActiveButton("done");
                    task.postWindowTitleTask(false);
                    task.postWindowDoneTask(true);
                    task.postWindowExpiredTask(false);
                  }}
                >
                  Выполнено
                </button>
              </section>
            </section>
          </section>
        ) : (
          <section></section>
        )}
        <section className="flex justify-center h-screen mt-30">
          {task.getWindowTitleTask() && (
            <div className="max-w-[700px] w-full">
              <TaskInComplite />
            </div>
          )}
          {task.getWindowExpiredTask() && (
            <div className="max-w-[700px] w-full">
              <TaskExpired />
            </div>
          )}
          {task.getWindowDoneTask() && (
            <div className="max-w-[700px] w-full">
              <TaskDone />
            </div>
          )}
        </section>
        <ErrorMessage />
        <Loading />
        <NewTask />
        <MessageTask />
      </div>
    </>
  );
};

export default observer(ToDoList);
