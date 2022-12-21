import { BsCloudMoonFill, BsSun } from "react-icons/bs";
import { ImLeaf } from "react-icons/im";
import { Link } from "react-router-dom";
import { IoStatsChart } from "react-icons/io5";

export default function Navbar({ dark, toogleDark }) {
  return (
    <div className="flex flex-row items-center px-8 h-16 justify-between">
      <Link to="/" className="flex flex-row items-center dark:text-yellow-300 text-sky-800 transition-colors duration-300">
        <ImLeaf size="20px" />
        <p className="sm:text-lg text-md transition font-semibold ml-2 text-gray-700 dark:text-stone-100">
          IoT Logger
        </p>
      </Link>
      <div className="flex flex-row items-center gap-6">
        <div className="tooltip tooltip-left" data-tip="Stats">
          <Link
            to="/stats"
            className="cursor-pointer transition-colors duration-300 hover:text-purple-600 dark:hover:text-yellow-300 text-gray-600 dark:text-white"
          >
            <IoStatsChart size="20px" />
          </Link>
        </div>
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
  );
}
