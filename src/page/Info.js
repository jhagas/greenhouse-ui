import { useContext } from "react";
import { MdOutlineHighlight, MdThermostat } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import Moment from "react-moment";
import { PagesContext } from "../supabase/context";
import ErrorMessage from "./components/Error";
import Loading from "./components/Load";

export default function Info() {
  const { api, loading, fault } = useContext(PagesContext);

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
        <div className="stats shadow-md bg-gray-200 dark:bg-slate-800 stats-vertical lg:stats-horizontal mb-2">
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
              {api.data[0].lux} lux
            </div>
          </div>
        </div>
        <p className=" text-xs opacity-60 text-center">
          Last updated at{" "}
          <Moment format="HH:mm, DD MMMM YYYY">{api.data[0].time}</Moment>
        </p>
      </div>
    );
  };

  return (
    <>
      <div
        className="flex flex-col w-full justify-center items-center "
        style={{
          height: "calc(100% - 6rem)",
        }}
      >
        <div>
          {!api.error ? loading ? <Loading /> : <Show /> : <ErrorMessage />}
        </div>
      </div>
      <div className="text-xs text-black dark:text-white opacity-40 h-4 text-center">
        <p className="inline">© 2022 Jhagas H.W.. Licensed in </p>
        <a className="inline text-cyan-900 dark:text-cyan-400 underline hover:brightness-75 hover:opacity-60 transition-all" href="https://github.com/jhagas/greenhouse-ui/">
          MIT License
        </a>
      </div>
    </>
  );
}
