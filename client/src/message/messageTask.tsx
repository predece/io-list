"use client";

import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "@/app/mobx-provider";

const MessageTask = () => {
  const { message, task } = useContext(Context);
  let page;

  if (task.getWindowMessageTask()) {
    setTimeout(() => {
      task.postWindowMessageTask(false);
    }, 3000);
    const urlStatus = message.getQuantity();
    switch (urlStatus) {
      case 1:
        page = "Входящее";
        break;
      case 2:
        page = "Просрочено";
        break;
      case 3:
        page = "Выполнено";
        break;
    }
  }
  const fuMessage = () => {
    const urlStatus = message.getQuantity();
    switch (urlStatus) {
      case 1:
        task.postWindowTitleTask(true);
        task.postWindowExpiredTask(false);
        task.postWindowDoneTask(false);
        break;
      case 2:
        task.postWindowExpiredTask(true);
        task.postWindowDoneTask(false);
        task.postWindowTitleTask(false);
        break;
      case 3:
        task.postWindowDoneTask(true);
        task.postWindowTitleTask(false);
        task.postWindowExpiredTask(false);
        break;
    }
    task.postWindowMessageTask(false);
  };

  return (
    <>
      {task.getWindowMessageTask() && (
        <section className="absolute left-0 bottom-0 m-10 z-9999 border rounded border-gray-300 p-3 text-[16px] bg-white">
          <div>
            <div className="cursor-pointer hover:text-gray-700" onClick={fuMessage}>{`Таски перенесены в: ${page}`}</div>
          </div>
        </section>
      )}
    </>
  );
};

export default observer(MessageTask);
