"use client";

import Login from "@/components/Login";
import Registration from "@/components/Registration";
import { useSearchParams } from "next/navigation";

export function AuthPage() {
  const params = useSearchParams();
  const type = params.get("type");
  let form;

  switch (type) {
    case "login":
      form = <Login />;
      break;
    case "registration":
      form = <Registration />;
      break;
  }
  return <>{form}</>;
}

