"use client";

import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const Loading = () => {
  const [_loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);  
    }, 500);
  }, []);
  return (
    <>
      {_loading ? (
        <div className="absolute top-0 flex w-screen h-screen items-center justify-center bg-white">
          <img alt="loading" width={50} height={50} src="/25.svg" />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default observer(Loading);
