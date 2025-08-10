import { $host } from "./Host";

interface Iauth {
  email: string;
  password: string;
}

export const Registration = async ({ email, password }: Iauth) => {
  const { data } = await $host.post("api/registration", { email, password });
  return data;
};

export const LoginUser = async ({ email, password }: Iauth) => {
  const { data } = await $host.post("api/login", { email, password });
  return data;
};
export const DataUser = async (email: string) => {
  const { data } = await $host.get(`api/userConfig?email=${email}`);
  return data;
};
