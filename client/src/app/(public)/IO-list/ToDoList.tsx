"use client";

import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useEffect, useState, useContext } from "react"; // Импортируйте useContext и useState

import { Context } from "@/app/mobx-provider"; // Укажите правильный путь к Context

import { Config } from "@/http/Config"; // Укажите правильный путь к Config

import ErrorMessage from "@/error/errorMessage";
import Loading from "../../../components/Loading";
import NewTask from "../../../components/NewTask";
import TaskInComplite from "@/components/TaskInComplite";
import TaskDone from "@/components/TaskDone";
import TaskExpired from "@/components/TaskExpired";
import MessageTask from "@/message/messageTask";
import { getCookie } from "@/components/taskStructure/TaskS";
import Link from "next/link";
import { CONFIG } from "@/config/page.config";

const ToDoList = () => {
  const { store, user, task } = useContext(Context);

  const [userName, setUserName] = useState<string | null>();
  const [name, setName] = useState<string>("");
  const [img, setImg] = useState<File | null>(null);
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

    if (type === "name" && name.length <= 16 && name.length > 0) {
      formData.append("name", name);
      console.log(name);
    } else if (type === "name" && (name.length > 16 || name.length < 1)) {
      store.postError("Ваше имя либо не задано, либо превышает 16 символов");
    }
    if (type === "image" && img) {
      formData.append("img", img);
    } else if (type === "image" && !img) {
      store.postError("Файл изображения не выбран");
      return;
    }
    if (img && img.size >= 5 * 1024 * 1024) {
      store.postError("Изображение не должно превышать 5MB");
    }
    if ((type === "name" && name) || (type === "image" && img)) {
      const userEmail = getCookie("userEmail");
      if (userEmail) {
        formData.append("email", userEmail);
        try {
          if (img) {
            task.postWindowLoading(true);
          }

          const data = await Config(formData);
          console.log(data.data.img);
          if (data?.data) {
            setUserName(data.data.name);
            setUrlImage(data.data.img);
          }

          console.log(task.getWindowLoading());
          if (img && data?.data.img) {
            task.postWindowLoading(false);
          }
        } catch (error) {
          store.postError("Ошибка сети при сохранении.");
        }
      }
    }
  };
  const visibilityClass = [
    { checkOpen: checkPersonalization ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none" },
    { checkOpenBorder: checkPersonalization ? "bg-gray-200/80 rounded ease-in-out" : "" },
  ];
  useEffect(() => {
    setState(true);
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
        <Link className="fixed  right-1 m-2 border p-2 rounded-[50%] cursor-pointer flex text-center hover:bg-gray-200/80 duration-300 ease-in-out border-gray-800/50" href={CONFIG.getHellowPage()}>
          Back
        </Link>
        {state ? (
          <section className="w-55 2xl:w-85 xl:w-80 lg:w-70 md:w-70 sm:w-65  bg-[#FCFAF8]">
            <section className="fixed  w-55 2xl:w-85 xl:w-80 lg:w-70 md:w-70 sm:w-65 p-3 transition-all h-full min-h-screen duration-200">
              <section className="flex justify-between h-15">
                <button
                  className={`flex items-center h-auto cursor-pointer transition-color p-[0px_10px] duration-200 ease-in-out hover:bg-hover-color rounded ${visibilityClass[1].checkOpenBorder}`}
                  onClick={(e) => personalizationUser(e)}
                >
                  <Image
                    src={urlImage ? urlImage : "/DefaulUser.svg"}
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
                {checkPersonalization && <div className="absolute inset-0 w-screen h-screen z-999" onClick={() => setCheckPersonalization(false)}></div>}
                <div
                  className={`absolute top-26 rounded border w-60 p-3 flex flex-col items-center gap-3 justify-center transition-all duration-600 border-gray-800/50 z-9999 bg-[#FCFAF8] shadow-[6px_5px_10px_gray] ${visibilityClass[0].checkOpen}`}
                >
                  <div>
                    <div>Добавьте имя</div>
                    <div className="flex gap-1 mt-2 ">
                      <input
                        className={`p-1  w-40 h-10 border border-gray-500/50 rounded transition-colors ease-in-out duration-700 outline-none  focus:border-gray-800 text-[15px] ${
                          name && (name.length <= 16 ? "border-green-400 focus:border-green-600" : "border-red-400 focus:border-red-600")
                        }`}
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
                  </div>
                  <div>
                    <div>Добавьте фото</div>
                    <div className="flex gap-1 mt-2 ">
                      <label
                        className={`flex cursor-pointer items-center w-40 p-1 border border-gray-500/50 rounded transition-colors ease-in-out duration-700 outline-none  focus:border-gray-800 ${
                          img && (img.size < 1024 * 1024 * 5 ? "border-green-400" : "border-red-400")
                        }`}
                      >
                        <p className="text-gray-500 text-[15px]">{!img ? "Выберите файл" : "Файл выбран"}</p>
                        <input
                          className="hidden"
                          type="file"
                          name="img"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setImg(e.target.files[0]);
                            } else {
                              setImg(null);
                            }
                          }}
                        />
                      </label>
                      <button
                        className="cursor-pointer border rounded p-2 border-gray-500/50 hover:bg-gray-200/80 transition duration-300 ease-in-out hover:translate-x-1"
                        onClick={() => FuSaveConfig("image")}
                      >
                        <Image src="/SaveConfigIcon.svg" alt="config-IO" width={20} height={20} />
                      </button>
                    </div>
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
