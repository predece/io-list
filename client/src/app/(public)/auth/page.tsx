import Loading from "@/components/Loading";
import { AuthPage } from "./AuthPage";
import type { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Auth | IO-list",
};

export default function TitlePage() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <AuthPage />
      </Suspense>
    </>
  );
}
