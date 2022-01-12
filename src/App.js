import { useState } from "react";
import { BsCloudMoonFill, BsSun } from "react-icons/bs";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import Weton from './Weton'

function App() {
  // check if localstorage with key "dark" exist
  // if not (null), set to true. DARK MODE BY DEFAULT
  if (localStorage.getItem("dark") === null) {
    localStorage.setItem("dark", "true");
  }

  // initialize state, initial value is from localstoragewith key "dark"
  // localstorage hold value in string, so using JSON.parse(value) to convert to boolean
  const [dark, setDark] = useState(JSON.parse(localStorage.getItem("dark")));

  // State can detect if its value is changing. If its changing, run this line
  localStorage.setItem("dark", dark);

  // Define the function for toogling dark state (dark mode)
  const toogleDark = () => {
    setDark(!dark);
  };

  return (
    <div className={dark ? "dark" : "light"}>
      <div className="h-screen transition duration-300 w-full bg-[#F2F2F2] dark:bg-[#16222A]">
        <div className="flex flex-row items-center px-8 h-16 justify-between">
          <div className="flex flex-row items-center dark:text-yellow-300 text-sky-800 transition-colors duration-300">
            <AiTwotoneThunderbolt size="24px" />
            <p className="text-lg transition font-semibold ml-1 text-gray-700 dark:text-stone-100">
              Wetonizer
            </p>
          </div>
          <div
            onClick={toogleDark}
            className="group cursor-pointer transition-colors duration-300 hover:text-purple-600 dark:hover:text-yellow-300 text-gray-600 dark:text-white"
          >
            {dark ? <BsSun size="24px" /> : <BsCloudMoonFill size="24px" />}
            <div className="flex flex-row fixed right-[4.5rem] bg-stone-700 border border-gray-600 rounded-md text-zinc-50 p-3 group-hover:opacity-100 group-hover:translate-x-0 opacity-0 translate-x-2 transition -translate-y-8 text-sm">
              <p>Toogle dark mode</p>
              <div className="fixed translate-x-[7.75rem] border-t-8 border-b-8 border-t-transparent border-b-transparent border-l-8 border-l-stone-700"></div>
            </div>
          </div>
        </div>
        <Weton />
      </div>
    </div>
  );
}

export default App;
