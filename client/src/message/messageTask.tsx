"use client";

import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "@/app/mobx-provider";

interface Imessage {
  urlStatus: number;
  nameStatus: string;
}

const MessageTask = ({ urlStatus, nameStatus }: Imessage) => {
  const { message, task } = useContext(Context);
  let WebMessage = message.getMessage();
  const fuMessage = () => {
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
  };

  return (
    <>
      <section className="absolute left-0 top-[-1px]">
        <div>{WebMessage}</div>
        <button onClick={fuMessage}>{nameStatus}</button>
      </section>
    </>
  );
};

export default observer(MessageTask);
