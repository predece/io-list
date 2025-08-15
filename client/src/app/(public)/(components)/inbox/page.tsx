import { observer } from "mobx-react-lite";
import type { Metadata } from "next";
import ComponentsTask from "./components";

export const metadata: Metadata = {
  title: "Входящие",
};

const Task = () => {
  return (
    <>
      <ComponentsTask />
    </>
  );
};

export default observer(Task);
