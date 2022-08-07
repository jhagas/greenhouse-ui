import { useContext } from "react";
import { BsCloudMoonFill, BsSun } from "react-icons/bs";
import { ImLeaf } from "react-icons/im";
import { PagesContext } from "../supabase/context";
import Control from "./Control";
import Info from "./Info";
import Stats from "./Stats";

function App() {
  const { toogleDark, dark } = useContext(PagesContext);

  return (
    <div className={dark ? "dark" : "light"}>
      <div className="h-screen transition duration-300 w-full bg-[#F2F2F2] dark:bg-[#16222A]">
        <div className="flex flex-row items-center px-8 h-16 justify-between">
          <div className="flex flex-row items-center dark:text-yellow-300 text-sky-800 transition-colors duration-300">
            <ImLeaf size="20px" />
            <p className="sm:text-lg text-md transition font-semibold ml-2 text-gray-700 dark:text-stone-100">
              Grh.se
            </p>
          </div>
          <div className="flex flex-row items-center gap-6">
            <Control />
            <Stats />
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
      </div>
    </div>
  );
}

export default App;
