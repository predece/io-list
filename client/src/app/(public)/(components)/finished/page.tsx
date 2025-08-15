import { observer } from "mobx-react-lite";
import type { Metadata } from "next";
import ComponentsFinished from "./components";

export const metadata: Metadata = {
  title: "Выполнены",
};

const FinishedPage = () => {
  return (
    <>
      <ComponentsFinished />
    </>
  );
};

export default observer(FinishedPage);
