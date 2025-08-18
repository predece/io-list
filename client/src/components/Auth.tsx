"use client";

import Link from "next/link";
import { useState } from "react";
import { CONFIG } from "@/config/page.config";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Context } from "@/app/mobx-provider";
import { observer } from "mobx-react-lite";
import ErrorMessage from "@/error/errorMessage";
import { LoginUser, Registration } from "@/http/HostAuth";

interface ErrorMessage {
  email: { message: string }[];
  password: { message: string }[];
}
interface ICheckPage {
  page: string;
}

const Auth = ({ page }: ICheckPage) => {
  const { store } = useContext(Context);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [error, setError] = useState<ErrorMessage>({ email: [], password: [] });
  const [check, setCheck] = useState<number>(0);
  let namePage: boolean = false;
  if (page === "login") {
    namePage = false;
  } else {
    namePage = true;
  }
  const fuLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError((prevError) => ({ ...prevError, email: [{ message: "Email должен содержать @" }] }));
    } else {
      setCheck(check + 1);
    }
    if (email.length < 8) {
      setError((prevError) => ({ ...prevError, email: [{ message: "Email не менее 9 символов" }] }));
    } else {
      setCheck(check + 1);
    }
    if (password.length < 8) {
      setError((prevPassword) => ({ ...prevPassword, password: [{ message: "Password не менее 9 символом" }] }));
    } else {
      setCheck(check + 1);
    }

    if (1 === 1) {
      try {
        let data;
        if (!namePage) {
          data = await LoginUser({ email, password });
        } else {
          data = await Registration({ email, password });
        }
        if (data.message) {
          store.postError(data.message);
        }

        if (data.jwtToken) {
          setCookie(null, "token", data.jwtToken, {
            maxAge: 24 * 60 * 60,
            path: "/",
          });
          setCookie(null, "userEmail", email, {
            maxAge: 24 * 60 * 60,
            path: "/",
          });
          console.log(email);
          router.push("/IO-list");
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    <div className="container">
      <div className="flex w-screen h-screen items-center justify-center">
        <form className="grid gap-1 rounded border p-8 text-center bg-[#FCFAF8]">
          <div className="mb-5">{!namePage ? "Please, login" : "Please, registration"}</div>
          <input
            className="p-2 border border-gray-500/50 outline-none rounded  transition-colors ease-in-out duration-700 focus:border-gray-800 "
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="h-4 text-left items-center">{error.email.length > 0 && <div className="text-red-500/60 visible text-[0.75rem] ">{error.email[0].message}</div>}</div>

          <input
            className="p-2 border border-gray-500/50 rounded transition-colors ease-in-out duration-700 outline-none  focus:border-gray-800"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="h-4 text-left items-center">{error.password.length > 0 && <div className="text-red-500/60 visible text-[0.75rem] ">{error.password[0].message}</div>}</div>

          <div>
            <button className="mt-2 mb-2 cursor-pointer p-1 rounded border hover:bg-gray-300/60 transition-color duration-500 ease-in-out" onClick={(e) => fuLogin(e)}>
              {!namePage ? "Login" : "Registration"}
            </button>
          </div>
          <Link href={!namePage ? CONFIG.getRegistration() : CONFIG.getLogin()} className="text-[0.75rem] text-gray-500/80 hover:text-gray-600 transition ease-in-out duriation-700">
            {!namePage ? "No account account? Register" : "Do you have an account? Login"}
          </Link>
        </form>
      </div>
      <ErrorMessage />
    </div>
  );
};

export default observer(Auth);
