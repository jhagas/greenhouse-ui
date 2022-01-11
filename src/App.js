import { useState } from "react";
import { BsCloudMoonFill, BsSun } from "react-icons/bs";
import { AiTwotoneThunderbolt } from "react-icons/ai";

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
      <div className="h-screen transition duration-300 w-full bg-gradient-to-l from-white to-[#FFEFBA] dark:from-[#A43931] dark:to-[#1D4350]">
        <div className="flex flex-row items-center px-8 h-16 justify-between">
          <div className="flex flex-row items-center dark:text-yellow-300 text-sky-800 transition-colors duration-300">
            <AiTwotoneThunderbolt size="24px" />
            <p className="text-lg font-semibold ml-1 text-gray-700 dark:text-stone-100">
              Wetonizer
            </p>
          </div>
          <div
            onClick={toogleDark}
            className="cursor-pointer transition-colors duration-300 hover:text-blue-800 dark:hover:text-yellow-300 text-gray-700 dark:text-white"
          >
            {dark ? <BsSun size="24px" /> : <BsCloudMoonFill size="24px" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
