import axios from "axios";
// import { parseCookies } from "nookies";

export const $host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_APP_URL,
  // timeout: 10000, // 10 секунд таймаут
});
export const $token_host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_APP_URL,
});

// const CheckToken = (config: any) => {
//   const cookie = parseCookies();
//   if (cookie.token) {
//     config.headers.authorization = `Bearer ${cookie.token}`;
//     return config;
//   }
// };
// $token_host.interceptors.request.use(CheckToken);
