import { useState } from "react";
import { BsCloudMoonFill, BsSun } from "react-icons/bs";
import { ImLeaf } from "react-icons/im";
import Info from "./Info";

function App() {
  if (localStorage.getItem("dark") === null) {
    localStorage.setItem("dark", "true");
  }
  const [dark, setDark] = useState(JSON.parse(localStorage.getItem("dark")));
  localStorage.setItem("dark", dark);
  const toogleDark = () => {
    setDark(!dark);
  };

  return (
    <div className={dark ? "dark" : "light"}>
      <div className="h-screen transition duration-300 w-full bg-[#F2F2F2] dark:bg-[#16222A]">
        <div className="flex flex-row items-center px-8 h-16 justify-between">
          <div className="flex flex-row items-center dark:text-yellow-300 text-sky-800 transition-colors duration-300">
            <ImLeaf size="20px" />
            <p className="sm:text-lg text-md transition font-semibold ml-2 text-gray-700 dark:text-stone-100">
              Sensor Monitoring
            </p>
          </div>
          <div className="flex flex-row items-center gap-6">
            <div className="tooltip tooltip-left" data-tip="Dark toogle">
              <div
                onClick={toogleDark}
                className="cursor-pointer transition-colors duration-300 hover:text-purple-600 dark:hover:text-yellow-300 text-gray-600 dark:text-white"
              >
                {dark ? <BsSun size="20px" /> : <BsCloudMoonFill size="20px" />}
              </div>
            </div>
          </div>
        </div>
        <Info />
        <div className="text-xs text-black dark:text-white opacity-40 h-4 text-center">
          <p className="inline">© 2022 Jhagas Hana Winaya, MIT License. </p>
          <a
            className="inline text-cyan-900 dark:text-cyan-400 underline hover:brightness-75 hover:opacity-60 transition-all"
            href="https://github.com/jhagas/greenhouse-ui/"
          >
            GitHub Page
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
