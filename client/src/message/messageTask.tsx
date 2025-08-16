"use client";

import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "@/app/mobx-provider";

const MessageTask = () => {
  const { message, task } = useContext(Context);
  let page;

  useEffect(() => {
    let urlStatus = message.getQuantity();
    switch (urlStatus) {
      case 1:
        page = "Входящие";
        break;
      case 2:
        page = "Просрочены";
        break;
      case 3:
        page = "Выполнено";
        break;
    }
  }, []);

  if (task.getWindowMessageTask()) {
    console.log(task.getWindowMessageTask());
    setTimeout(() => {
      task.postWindowMessageTask(false);
    }, 2000);
  }
  const fuMessage = () => {
    let urlStatus = message.getQuantity();
    switch (urlStatus) {
      case 1:
        task.postWindowTask(true);
        break;
      case 2:
        task.postWindowExpiredTask(true);
        break;
      case 3:
        task.postWindowDoneTask(true);
        break;
    }
    task.postWindowMessageTask(false);
  };

  return (
    <>
      {task.getWindowMessageTask() && (
        <section className="absolute left-0 bottom-0 m-10 z-9999 border rounded border-gray-300 p-3 text-[16px]">
          <div>
            <div>Таски перенесены в: </div>
            <a onClick={fuMessage}>{page}</a>
          </div>
        </section>
      )}
    </>
  );
};

export default observer(MessageTask);
