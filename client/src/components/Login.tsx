"use client";

import { observer } from "mobx-react-lite";
import Auth from "./Auth";
import Loading from "./Loading";

const Login = () => {
  return (
    <>
      <Auth page={"login"} />
      <Loading />
    </>
  );
};

export default observer(Login);
