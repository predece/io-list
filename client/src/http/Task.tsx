"use client";

import { $host } from "./Host";
import type { Itask } from "@/store/taskDeadlineStore";

export const AddTask = async (config: Itask) => {
  const { data } = await $host.post("/api/task", config);
  return data;
};

export const GetTask = async () => {
  const { data } = await $host.get("/api/task");
  return data;
};

export const FinishedTask = async (id: number) => {
  const { data } = await $host.get(`api/task/delete/${id}`);
  return data;
};

export const DeleteTask = async (id: number) => {
  const { data } = await $host.delete(`api/task/delete/${id}`);
  return data;
};

export const UpdateTassk = async (config: Itask) => {
  const { data } = await $host.post("api/task/update", config);
  return data;
};

// export const GetTask = async () => {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_APP_URL}api/task`, { next: { revalidate: 30 } });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Ошибка при загрузке задач:", error);
//     return null;
//   }
// };
