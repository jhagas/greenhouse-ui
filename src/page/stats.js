import "chartjs-adapter-moment";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { useFilter, useSelect, useSubscription } from "react-supabase";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "./components/Load";
import ErrorMessage from "./components/Error";
import { parse } from "json2csv";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function Stats({ dark }) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
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

  const [value, setValue] = useState(0);
  const [graph, setGraph] = useState(0);
  const [date, setDate] = useState([
    moment(moment().format("YYYY-MM-DD"))
      .subtract(7, "hours")
      .format("YYYY-MM-DD 17:00:00"),
    moment(moment().format("YYYY-MM-DD"))
      .subtract(7, "hours")
      .add(1, "day")
      .format("YYYY-MM-DD 17:00:00"),
  ]);

  const filter = useFilter(
    (query) =>
      query
        .gte("time", `${date[0]}`)
        .lt("time", `${date[1]}`)
        .order("time", { ascending: true }),
    [date]
  );

  const [{ data, error }, reexecute] = useSelect("data", { filter });

  useSubscription(
    () => {
      reexecute();
    },
    {
      event: "INSERT",
      table: "data",
    }
  );

  useEffect(() => {
    const momentval = moment(moment().format("YYYY-MM-DD"))
      .subtract(7, "hours")
      .subtract(value, "days");
    const date = momentval.format("YYYY-MM-DD 17:00:00");
    const datetom = momentval.add(1, "day").format("YYYY-MM-DD 17:00:00");
    setDate([date, datetom]);
  }, [value]);

  if (error) return <ErrorMessage />;
  if (!data) return <Loading />;

  const labels = [];
  const ds = [];
  const datasets = [];

  if (data.length > 0) {
    data.forEach((data, index) => {
      const time = data.time;
      if (index === 0) {
        data.data.forEach((sensor) => {
          ds.push([{ x: time, y: sensor.value }]);
          const name = sensor.name;
          const unit = sensor.unit.length === 0 ? "" : " (" + sensor.unit + ")";
          labels.push(name + unit);
        });
      } else {
        data.data.forEach((sensor, index) => {
          ds[index].push({ x: time, y: sensor.value });
        });
      }
    });

    labels.forEach((label, index) => {
      datasets.push({
        datasets: [
          {
            // data: [{x: 0, y:0}],
            label: label,
            data: ds[index],
            borderColor: "#1FB2A6",
            backgroundColor: "#1FB2A650",
          },
        ],
      });
    });
  }

  function downloadCSV() {
    const text = [];
    let filename;

    data.forEach((data) => {
      let time = moment(data.time).format("D/MM/YYYY hh:mm:ss");
      filename = moment(data.time).format("D/MM/YYYY")
      let parted = { time };

      data.data.forEach((sensor) => {
        const key =
          sensor.name +
          (sensor.unit.length === 0 ? "" : " (" + sensor.unit + ")");
        parted[key] = sensor.value;
      });
      text.push(parted);
    });

    const csv = parse(text);

    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(csv)
    );
    element.setAttribute("download", `Data ${filename}.csv`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <>
      <div
        className="flex flex-col w-full items-center "
        style={{
          height: "calc(100% - 6rem)",
        }}
      >
        <div className="p-2 w-full flex flex-col items-center justify-center gap-3">
          <div className="flex flex-row gap-3 items-center justify-center">
            <select
              className="select select-bordered bg-[#F2F2F2] dark:bg-slate-800 text-base-700 dark:text-base-300 select-sm w-full max-w-[12rem]"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            >
              <option value={0}>Today</option>
              <option value={1}>Yesterday</option>
              <option value={2}>2 days ago</option>
              <option value={3}>3 days ago</option>
            </select>
            <button className="btn btn-primary btn-xs" onClick={downloadCSV}>
              Download Data
            </button>
          </div>
          <div className="btn-group justify-center items-center">
            {labels.map((label, index) => {
              const cn = dark
                ? "btn btn-sm border-teal-800 text-teal-500 hover:border-teal-800"
                : "btn btn-sm border-slate-400 hover:bg-slate-600 hover:border-slate-700";

              const className =
                graph !== index
                  ? cn + (dark ? " btn-outline" : " btn-outline text-slate-700")
                  : cn + (dark ? " bg-slate-700" : "");
              return (
                <button
                  className={className}
                  key={index}
                  onClick={() => setGraph(index)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        <div
          style={{
            width: windowDimensions.width - 50 + "px",
            height: windowDimensions.height - 225 + "px",
          }}
        >
          <div className="flex flex-col items-center justify-center h-full w-full">
            {data.length > 0 ? (
              <Line options={options} data={datasets[graph]} />
            ) : (
              <h1 className="text-center font-semibold text-xl md:text-3xl text-slate-800 dark:text-teal-200 ">
                Belum ada data untuk rentang waktu ini..
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
