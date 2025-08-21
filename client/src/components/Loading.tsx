"use client";

import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "@/app/mobx-provider";

const Loading = () => {
  const { task } = useContext(Context);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    if (task.getWindowLoading()) {
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [task.getWindowLoading()]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {_loading && (
        <div className="absolute top-0 flex w-screen h-screen items-center justify-center bg-white">
          <img alt="loading" width={50} height={50} src="/25.svg" />
        </div>
      )}
    </>
  );
};

export default observer(Loading);
