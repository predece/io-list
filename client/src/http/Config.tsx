import { $host } from "./Host";

export const Config = async (configuration: FormData) => {
  const { data } = await $host.post("/api/config", configuration);
  return data;
};
