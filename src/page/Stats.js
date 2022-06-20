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
  const [temp, setTemp] = useState(null);
  const [humid, setHumid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  const { dark } = useContext(PagesContext);

  const color = dark
    ? ["#d6d3d195", "rgba(168, 162, 158, 0.2)"]
    : ["#191D2495", "#191D2420"];

  const options = {
    responsive: true,
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
          unit: "hour",
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
          color: color[0],
        },
        grid: {
          color: color[1],
        },
      },
    },
  };

  useEffect(() => {
    const momentval = moment(moment().format("YYYY-MM-DD"))
      .subtract(7, "hours")
      .subtract(value, "days");
    const date = momentval.format("YYYY-MM-DD 17:00:00");
    const datetom = momentval.add(1, "day").format("YYYY-MM-DD 17:00:00");
    ambilData();
    async function ambilData() {
      let { data } = await supabase
        .from("data")
        .select("*")
        .gte("time", `${date}`)
        .lt("time", `${datetom}`)
        .order("time", { ascending: true });
      let temperature = await {
        datasets: [
          {
            // data: [{x: 0, y:0}],
            label: "Temperature (°C)",
            data: data.map((i) => {
              return { x: i.time, y: i.temp };
            }),
            borderColor: "#1FB2A6",
            backgroundColor: "#1FB2A650",
          },
        ],
      };
      let humidity = await {
        datasets: [
          {
            // data: [{x: 0, y:0}],
            label: "Humidity (%)",
            data: data.map((i) => {
              return { x: i.time, y: i.humid };
            }),
            borderColor: "#D926A9",
            backgroundColor: "#D926A950",
          },
        ],
      };
      setTemp(temperature);
      setHumid(humidity);
      setLoading(false);
    }
  }, [value]);

  const Select = () => {
    return (
      <div>
        <select
          className="select select-bordered bg-[#F2F2F2] dark:bg-base-100 text-base-100/60 dark:text-base-content select-sm w-full max-w-xs mb-2"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          <option value={0}>Today</option>
          <option value={1}>Yesterday</option>
          <option value={2}>2 days ago</option>
          <option value={3}>3 days ago</option>
        </select>
      </div>
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
          <Select />
          {loading ? (
            <Loading />
          ) : (
            <div>
              <Line options={options} data={temp} />
              <Line options={options} data={humid} />
            </div>
          )}
        </label>
      </label>
    </div>
  );
}
