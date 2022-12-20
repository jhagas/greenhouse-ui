import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <>
      <div
        className="flex flex-col w-full justify-center items-center "
        style={{
          height: "calc(100% - 6rem)",
        }}
      >
        <div>
          <div className="flex flex-col items-center justify-center m-4">
            <AiOutlineLoading3Quarters
              size="24px"
              className="text-sky-800 dark:text-amber-500 animate-spin"
            />
            <p className="text-stone-700 dark:text-stone-300 text-xl animate-pulse font-bold my-2">
              Loading Data...
            </p>
          </div>
        </div>
      </div>
      <div className="text-xs text-black dark:text-white opacity-40 h-4 text-center">
        <p className="inline">© 2022 Jhagas, MIT License. </p>
        <a
          className="inline text-cyan-900 dark:text-cyan-400 underline hover:brightness-75 hover:opacity-60 transition-all"
          href="https://github.com/jhagas/greenhouse-ui/"
        >
          GitHub Page
        </a>
      </div>
    </>
  );
}
