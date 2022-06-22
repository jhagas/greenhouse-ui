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
import { useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../supabase/supabase";
import moment from "moment";
import Loading from "./components/Load";
import { PagesContext } from "../supabase/context";
import zoomPlugin from "chartjs-plugin-zoom";
const { parseAsync } = require("json2csv");

ChartJS.register(
  zoomPlugin,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const zoomOptions = {
  pan: {
    enabled: true,
    mode: "xy",
  },
  zoom: {
    wheel: {
      enabled: true,
    },
    pinch: {
      enabled: true,
    },
    mode: "xy",
  },
};

export default function Stats() {
  const [th, setTH] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [csv, setCSV] = useState(null);

  const RefA = useRef(null);
  const resetZoom = () => {
    RefA.current.resetZoom();
  };

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
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      zoom: zoomOptions,
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
        ticks: {
          color: "#1FB2A6",
        },
        grid: {
          color: color[1],
        },
        position: "left",
      },
      y1: {
        ticks: {
          color: "#D926A9",
        },
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
      let temphumid = await {
        datasets: [
          {
            // data: [{x: 0, y:0}],
            label: "Temperature (°C)",
            data: data.map((i) => {
              return { x: i.time, y: i.temp };
            }),
            borderColor: "#1FB2A6",
            backgroundColor: "#1FB2A650",
            yAxisID: "y",
          },
          {
            // data: [{x: 0, y:0}],
            label: "Humidity (%)",
            data: data.map((i) => {
              return { x: i.time, y: i.humid };
            }),
            borderColor: "#D926A9",
            backgroundColor: "#D926A950",
            yAxisID: "y1",
          },
        ],
      };
      const fields = ["time", "temp", "humid", "lux"];
      const opts = { fields };

      parseAsync(data, opts)
        .then((csv) => setCSV(csv))
        .catch((err) => console.error(err));
      setTH(temphumid);
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
        className="select select-bordered bg-[#F2F2F2] dark:bg-base-100 text-base-100/60 dark:text-base-content select-sm w-full max-w-xs flex-[2]"
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
          <h3 className="text-lg font-bold mb-3 text-cyan-900 dark:text-stone-300">
            Measurement Record
          </h3>
          <div className="mb-2 flex flex-row gap-4 px-4 w-full items-center">
            <Select />
            <button
              onClick={resetZoom}
              className="btn btn-accent btn-outline btn-xs flex-1"
            >
              Reset Zoom
            </button>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div>
              <div>
                <Line options={options} data={th} ref={RefA} />
              </div>
              <button className="btn btn-primary btn-xs mt-2" onClick={downloadTxtFile}>Download data as CSV (spreadsheet)</button>
            </div>
          )}
        </label>
      </label>
    </div>
  );
}
