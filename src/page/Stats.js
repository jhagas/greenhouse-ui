import { IoStatsChart } from "react-icons/io5";
import "chartjs-adapter-moment";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import moment from "moment";
import Loading from "./components/Load";
import { PagesContext } from "../supabase/context";
const { parseAsync } = require("json2csv");

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Stats() {
  const [ds, setDs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [csv, setCSV] = useState(null);

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([csv], {
      type: "text/csv",
    });
    element.href = URL.createObjectURL(file);
    element.download = "measurement.csv";
    document.body.appendChild(element);
    element.click();
  };

  const { dark } = useContext(PagesContext);

  const color = dark
    ? ["#d6d3d195", "rgba(168, 162, 158, 0.2)"]
    : ["#191D2495", "#191D2420"];

  const options = {
    elements: {
      point: {
        radius: 0,
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        labels: {
          color: color[0],
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          displayFormats: {
            minute: "HH:mm",
            hour: "HH:mm",
          },
        },
        ticks: {
          color: color[0],
        },
        grid: {
          color: color[1],
        },
      },
      y: {
        grid: {
          color: color[1],
        },
        position: "right",
      },
    },
  };

  useEffect(() => {
    const momentval = moment(moment().format("YYYY-MM-DD"))
      .subtract(7, "hours")
      .subtract(value, "days");
    const date = momentval.format("YYYY-MM-DD 17:00:00");
    const datetom = momentval.add(1, "day").format("YYYY-MM-DD 17:00:00");

    async function ambilData() {
      let { data } = await supabase
        .from("data")
        .select("*")
        .gte("time", `${date}`)
        .lt("time", `${datetom}`)
        .order("time", { ascending: true });

      let dsVar = await [
        {
          datasets: [
            {
              // data: [{x: 0, y:0}],
              label: "Temperature (°C)",
              short: "T (°C)",
              data: data.map((i) => {
                return { x: i.time, y: i.temp };
              }),
              borderColor: "#1FB2A6",
              backgroundColor: "#1FB2A650",
            },
          ],
        },

        {
          datasets: [
            {
              // data: [{x: 0, y:0}],
              label: "Relative Humidity (%)",
              short: "RH (%)",
              data: data.map((i) => {
                return { x: i.time, y: i.humid };
              }),
              borderColor: "#D926A9",
              backgroundColor: "#D926A950",
            },
          ],
        },

        {
          datasets: [
            {
              // data: [{x: 0, y:0}],
              label: "Illuminance (lx)",
              short: "Ev (lx)",
              data: data.map((i) => {
                return { x: i.time, y: i.lux };
              }),
              borderColor: "#6419E6",
              backgroundColor: "#6419E650",
            },
          ],
        },
      ];

      const fields = ["time", "temp", "humid", "lux"];
      const opts = { fields };

      parseAsync(data, opts)
        .then((csv) => setCSV(csv))
        .catch((err) => console.error(err));
      setDs(dsVar);
      setLoading(false);
    }

    ambilData();
    const interval = setInterval(() => {
      ambilData();
    }, 60000);
    return () => clearInterval(interval);
  }, [value]);

  const Select = () => {
    return (
      <select
        className="select select-bordered bg-[#F2F2F2] dark:bg-base-100 text-base-100/60 dark:text-base-content select-sm w-full max-w-xs"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        <option value={0}>Today</option>
        <option value={1}>Yesterday</option>
        <option value={2}>2 days ago</option>
        <option value={3}>3 days ago</option>
      </select>
    );
  };

  return (
    <div className="tooltip tooltip-left" data-tip="Full stats">
      <label htmlFor="my-modal-3">
        <div className="hover:text-purple-600 cursor-pointer transition-colors duration-300 dark:hover:text-yellow-300 text-gray-600 dark:text-white">
          <IoStatsChart size="24px" />
        </div>
      </label>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <label
        htmlFor="my-modal-3"
        className="modal bg-black/70 dark:bg-black/50 cursor-pointer"
      >
        <label className="modal-box bg-[#F2F2F2] dark:bg-base-100 relative">
          {loading ? (
            <Loading />
          ) : (
            <div>
              <div className="mb-4 flex flex-col gap-2 px-6 w-full items-center">
                <h3 className="text-xl font-bold text-cyan-900 dark:text-stone-300">
                  DATA RECORDS
                </h3>
                <Select />
              </div>
              <div>
                <div className="carousel w-full">
                  {ds.map((ds, i) => {
                    return (
                      <Line
                        options={options}
                        key={i}
                        id={"item" + i}
                        data={ds}
                        className="carousel-item w-full"
                      />
                    );
                  })}
                </div>
                <div className="flex justify-center w-full py-2 gap-3">
                  {ds.map((ds, i) => {
                    return (
                      <a href={"#item" + i} key={i} className="btn btn-sm px-4 normal-case">
                        {ds.datasets[0].short}
                      </a>
                    );
                  })}
                </div>
              </div>
              <button
                className="btn btn-primary btn-xs mt-2"
                onClick={downloadTxtFile}
              >
                Download data as CSV
              </button>
            </div>
          )}
        </label>
      </label>
    </div>
  );
}
