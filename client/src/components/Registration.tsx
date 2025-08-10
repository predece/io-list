"use client";

import { observer } from "mobx-react-lite";
import Auth from "./Auth";
import Loading from "./Loading";

const Registration = () => {
  return (
    <>
      <Auth page={"registration"} />
      <Loading />
    </>
  );
};

export default observer(Registration);
