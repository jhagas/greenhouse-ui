import { MdOutlineHighlight, MdThermostat } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { GiChemicalDrop } from "react-icons/gi";
import Moment from "react-moment";
import { useRealtime, useFilter } from "react-supabase";
import Loading from "./components/Load";
import ErrorMessage from "./components/Error";
import { useEffect, useState } from "react";

const Icons = {
  temperature: <MdThermostat size="32px" />,
  relativeHumidity: <WiHumidity size="40px" />,
  illuminance: <MdOutlineHighlight size="32px" />,
  ph: <GiChemicalDrop size="32px" />,
};

export default function Info() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const filter = useFilter((query) =>
    query.order("time", { ascending: false }).limit(1)
  );

  const [{ data, error }] = useRealtime("data", {
    select: { filter },
  });

  if (!data) return <Loading />;
  if (error) return <ErrorMessage />;
  const api = data[data.length - 1];
  const fault = now - new Date(api.time) > 300000 ? true : false;

  return (
    <>
      <div
        className="flex flex-col w-full justify-center items-center "
        style={{
          height: "calc(100% - 6rem)",
        }}
      >
        <div>
          <div className="text-stone-700 dark:text-stone-300">
            <div className="flex flex-row gap-2 justify-center items-center mb-4">
              <div
                className={
                  "w-2 h-2 rounded-full animate-pulse " +
                  (fault ? "bg-red-600" : "bg-green-600")
                }
              />
              <div className="text-xs flex flex-row gap-1 items-center">
                {fault ? (
                  <p className="opacity-80">Cek perangkat anda!</p>
                ) : (
                  <p className="opacity-80">Perangkat berjalan dengan baik</p>
                )}
                {fault && (
                  <div className="dropdown dropdown-end">
                    <label htmlFor="my-modal-6" className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </label>
                    <input
                      type="checkbox"
                      id="my-modal-6"
                      className="modal-toggle"
                    />
                    <div className="modal modal-bottom sm:modal-middle bg-black bg-opacity-60">
                      <div className="modal-box bg-gray-100 dark:bg-slate-800">
                        <h3 className="font-bold text-lg">
                          Perangkat tidak mengirim data selama 5 menit!
                        </h3>
                        <p className="py-4">
                          Ini dapat disebabkan oleh perangkat yang tidak
                          tersmbung dengan daya, koneksi internet atapupun
                          terjadi kesalahan pada sensor.
                        </p>
                        <div className="modal-action">
                          <label
                            htmlFor="my-modal-6"
                            className="btn btn-primary"
                          >
                            Mengerti
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="stats shadow-md bg-gray-200 dark:bg-slate-800 stats-vertical lg:stats-horizontal mb-2">
              {api.data.map((data, index) => (
                <div className="stat" key={index}>
                  <div className="stat-figure dark:text-secondary text-primary">
                    {Icons.hasOwnProperty(data.type) ? Icons[data.type] : null}
                  </div>
                  <div className="stat-title text-stone-700 dark:text-stone-300">
                    {data.name}
                  </div>
                  <div className="stat-value text-cyan-900 dark:text-stone-300">
                    {data.value.toFixed(1) + " " + data.unit}
                  </div>
                </div>
              ))}
            </div>

            <p className=" text-xs opacity-60 text-center">
              Diperbaharui{" "}
              <Moment format="DD MMMM YYYY, HH:mm">{api.time}</Moment>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
