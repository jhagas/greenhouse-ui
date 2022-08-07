import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";
import { supabase } from "../supabase/supabase";
import { PagesContext } from "../supabase/context";
import ErrLoadChain from "./components/ErrLoadChain";

export default function Control() {
  const [value, setValue] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { status } = useContext(PagesContext);

  useEffect(() => {
    async function ambilData() {
      let { data, error } = await supabase.from("control").select("*");

      setData(data);
      setError(error);
      setLoading(false);
    }

    if (status) {
      ambilData();
      const interval = setInterval(() => {
        ambilData();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [status]);

  const Isi = () => (
    <div className="mb-4 flex flex-col gap-2 px-6 w-full items-center">
      <h3 className="text-xl font-bold text-cyan-900 dark:text-stone-300">
        Control Systems
      </h3>
      <select
        className="select select-bordered bg-[#F2F2F2] dark:bg-base-100 text-base-100/60 dark:text-base-content select-sm w-full max-w-xs"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        {data?.map((data, index) => {
          return (
            <option value={data.id} key={index}>
              {data.display}
            </option>
          );
        })}
      </select>
    </div>
  );

  return (
    <div className="tooltip tooltip-left" data-tip="Control your Device">
      <label htmlFor="my-modal-4">
        <div className="hover:text-purple-600 cursor-pointer transition-colors duration-300 dark:hover:text-yellow-300 text-gray-600 dark:text-white">
          <BsFillMenuButtonWideFill size="20px" />
        </div>
      </label>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label
        htmlFor="my-modal-4"
        className="modal bg-black/70 dark:bg-black/50 cursor-pointer"
      >
        <label className="modal-box bg-[#F2F2F2] dark:bg-base-100 relative">
          <ErrLoadChain comp={Isi} err={error} loading={loading} />
        </label>
      </label>
    </div>
  );
}
