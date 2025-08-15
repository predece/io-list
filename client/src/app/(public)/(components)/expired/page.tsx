import { observer } from "mobx-react-lite";
import type { Metadata } from "next";
import ComponentsExpired from "./components";
export const metadata: Metadata = {
  title: "Просрочены",
};

const ExpiredPage = () => {
  return (
    <>
      <ComponentsExpired />
    </>
  );
};

export default observer(ExpiredPage);
