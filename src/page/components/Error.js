import { MdError } from "react-icons/md";

export default function ErrorMessage() {
  return (
    <>
      <div
        className="flex flex-col w-full justify-center items-center "
        style={{
          height: "calc(100% - 6rem)",
        }}
      >
        <div>
          <div className="flex flex-col items-center gap-2 max-w-md px-6">
            <div className="text-red-600 animate-bounce">
              <MdError size="40px" />
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400">
              There's some problem, please check your internet
              connection/database and refresh the page.
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
