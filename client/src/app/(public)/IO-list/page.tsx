import ToDoList from "@/app/(public)/IO-list/ToDoList";
import TaskNotifications from "@/components/TaskNotifications";
import ComponentLoader from "@/componentStore/componentLoader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IO-list",
};

export default function TitilePage() {
  return (
    <>
      <ComponentLoader />
      <ToDoList />
    </>
  );
}
