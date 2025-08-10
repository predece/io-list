import { Context } from "@/app/mobx-provider";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";

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
        <section className="absolute top-0 flex w-screen h-screen items-center justify-center backdrop-blur-[5px] transition duration-900 " onClick={(e) => OCwindow(e)}>
          <div>{error}</div>
        </section>
      )}
    </>
  );
};

export default observer(ErrorMessage);
