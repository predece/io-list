import Link from "next/link";
import { CONFIG } from "@/config/page.config";
import Loading from "@/components/Loading";

export default function FrontPage() {
  return (
    <>
      <div className="w-screen h-screen grid" style={{ backgroundColor: "#1D1E24", gridTemplateRows: "120px 1fr" }}>
        <nav className="flex  gap-10 h-auto p-10 justify-between" style={{ backgroundColor: "" }}>
          <Link
            className="italic font-bold text-2xl"
            style={{
              textShadow: "0 0 8px #fff, 0 0 26px #fff, 0 0 80px #fff",
            }}
            href={CONFIG.getIOList()}
          >
            IOList
          </Link>
          <Link className="border rounded p-2 hover:bg-gray-400/40 transition duration-700 hover:translate-x-2 hover:translate-y-[-5px] " href={CONFIG.getLogin()}>
            Login
          </Link>
        </nav>
        <section className="flex flex-col justify-center text-center items-center gap-2">
          <span className="text-2xl italic">Всегда что-то забываете?</span>
          <span className="text-2xl">Тогда наш сайт для вас</span>
          <span className="text-2xl">Здесь вы сможете сохранить все свои задачи, чтобы не забыть их!</span>
          <Link href={CONFIG.getIOList()} className="mt-10 text-2xl font-bold transition-color duration-700 ease-in-out hover:text-gray-500/30 ">
            Начни планировать прямо сейчас!
          </Link>
        </section>
        <Loading />
      </div>
    </>
  );
}
