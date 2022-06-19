import { useState } from "react";
import { BsCloudMoonFill, BsSun } from "react-icons/bs";
import { ImLeaf } from "react-icons/im";
import Info from "./Info";
import Stats from "./Stats";

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
            <ImLeaf size="24px" />
            <p className="text-lg transition font-semibold ml-2 text-gray-700 dark:text-stone-100">
              GreenHouse.mu
            </p>
          </div>
          <div className="flex flex-row items-center gap-6">
            <Stats />
            <div className="tooltip tooltip-left" data-tip="Dark toogle">
              <div
                onClick={toogleDark}
                className="cursor-pointer transition-colors duration-300 hover:text-purple-600 dark:hover:text-yellow-300 text-gray-600 dark:text-white"
              >
                {dark ? <BsSun size="24px" /> : <BsCloudMoonFill size="24px" />}
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
