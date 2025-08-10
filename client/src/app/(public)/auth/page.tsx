import { AuthPage } from "./AuthPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | IO-list",
};

export default function TitlePage() {
  return (
    <>
      <AuthPage />
    </>
  );
}
