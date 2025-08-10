"use client";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { DataUser } from "@/http/HostAuth";
import { useContext } from "react";
import { Context } from "@/app/mobx-provider";

const CompopentLoader = () => {
  const { user } = useContext(Context);
  useEffect(() => {
    const UpdateUser = async () => {
      try {
        const UserEmail = localStorage.getItem("userEmail");
        if (UserEmail) {
          const parseEmail = JSON.parse(UserEmail);
          const userConfig = await DataUser(parseEmail);
          if (userConfig) {
            const { name, img } = userConfig.data;
            user.postUser({ name, img });
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    UpdateUser();
  }, []);
  return <></>;
};

export default observer(CompopentLoader);
