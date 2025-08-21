"use client";

import { Context } from "@/app/mobx-provider";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

const ErrorMessage = () => {
  const { store } = useContext(Context);
  let error;
  if (store) {
    error = store.getError();
  }
  const OCwindow = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    store.clearError();
  };

  return (
    <>
      {store.getError() && (
        <section className="absolute top-0 flex flex-col  w-screen h-screen items-center justify-center backdrop-blur-[5px] transition duration-900 " onClick={(e) => OCwindow(e)}>
          <div>{error}</div>
          <div className="text-[13px] text-gray-500/80">*нажмите в любое место, чтобы закрыть данное окно</div>
        </section>
      )}
    </>
  );
};

export default observer(ErrorMessage);
