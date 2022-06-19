import { useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdError, MdOutlineHighlight, MdThermostat } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import Moment from "react-moment";
import { PagesContext } from "./context";

export default function Info() {
  const { api, loading, fault } = useContext(PagesContext);

  const Loading = () => {
    return (
      <div className="flex flex-col items-center justify-center m-4">
        <AiOutlineLoading3Quarters
          size="24px"
          className="text-sky-800 dark:text-amber-500 animate-spin"
        />
        <p className="text-stone-700 dark:text-stone-300 text-xl animate-pulse font-bold my-2">
          Loading Data...
        </p>
      </div>
    );
  };

  const ErrorMessage = () => {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="text-red-600 animate-bounce">
          <MdError size="48px" />
        </div>
        <p>
          There's some problem, please check your internet connection and
          refresh the page.
        </p>
      </div>
    );
  };

  const Show = () => {
    return (
      <div className="text-stone-700 dark:text-stone-300">
        <div className="flex flex-row gap-2 justify-center items-center mb-4">
          <div
            className={
              "w-2 h-2 rounded-full animate-pulse " +
              (fault ? "bg-red-600" : "bg-green-600")
            }
          />
          <p className="text-xs opacity-80">
            {fault
              ? "Please check your device"
              : "Monitoring Device is fully functional"}
          </p>
        </div>
        <div className="stats shadow-md bg-gray-200 dark:bg-base-200 stats-vertical lg:stats-horizontal mb-2">
          <div className="stat">
            <div className="stat-figure dark:text-secondary text-primary">
              <MdThermostat size="32px" />
            </div>
            <div className="stat-title text-stone-700 dark:text-stone-300">
              Temperature
            </div>
            <div className="stat-value text-cyan-900 dark:text-stone-300">
              {api.data[0].temp}°C
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure dark:text-secondary text-primary">
              <WiHumidity size="40px" />
            </div>
            <div className="stat-title text-stone-700 dark:text-stone-300">
              Humidity
            </div>
            <div className="stat-value text-cyan-900 dark:text-stone-300">
              {api.data[0].humid}%
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure dark:text-secondary text-primary">
              <MdOutlineHighlight size="32px" />
            </div>
            <div className="stat-title text-stone-700 dark:text-stone-300">
              Light Intensity
            </div>
            <div className="stat-value text-cyan-900 dark:text-stone-300">
              {api.data[0].lux} Lux
            </div>
          </div>
        </div>
        <p className=" text-xs opacity-60 text-center">
          Last update at{" "}
          <Moment format="hh:mm, DD MMMM YYYY">{api.data[0].time}</Moment>
        </p>
      </div>
    );
  };

  return (
    <div
      className="flex flex-col w-full justify-center items-center "
      style={{
        height: "calc(100% - 4rem)",
      }}
    >
      <div>
        {!api.error ? loading ? <Loading /> : <Show /> : <ErrorMessage />}
      </div>
    </div>
  );
}
