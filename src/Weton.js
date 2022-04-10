import React, { useContext, useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";
import { PagesContext } from "./context";
import Info from "./Info";

function Weton() {
  const dateRef = useRef();
  const { date, setDateValue } = useContext(PagesContext);

  const dateChange = () => {
    setDateValue(dateRef.current.value);
  };

  const Seek = (a) => {
    const Hari = new Date(date).getTime();
    const seek = Hari + a * 24 * 60 * 60 * 1000;

    const Baru = new Date(seek);
    const Bulan = Baru.getMonth().toString().length === 1 ? `0${Baru.getMonth() + 1}` : Baru.getMonth()+1;
    const Tanggal = Baru.getDate().toString().length === 1 ? `0${Baru.getDate().toString()}` : Baru.getDate();

    setDateValue(`${Baru.getFullYear()}-${Bulan}-${Tanggal}`);
  };

  return (
    <div
      className="flex flex-col w-full justify-center items-center "
      style={{
        height: "calc(100% - 4rem)",
      }}
    >
      <p className="font-medium text-stone-700 dark:text-stone-300 m-2">
        Pilih tanggal dalam masehi
      </p>
      <div className="flex flex-row items-center justify-center gap-2">
        <div
          onClick={() => {
            Seek(-1);
          }}
          className="bg-slate-400 bg-opacity-50 rounded-full w-7 h-7 dark:text-stone-200 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-stone-700 flex items-center justify-center"
        >
          <AiOutlineLeft />
        </div>
        <div className="flex flex-row items-center px-4 w-[11rem] text-stone-700 dark:text-stone-300 h-8 bg-white dark:bg-sky-900 rounded-md border-transparent focus:outline-2 focus:outline-sky-500 shadow-md">
          <IoCalendar className="fixed translate-x-32" />
          <input
            ref={dateRef}
            type="date"
            name="date"
            id="dategregorian"
            value={date}
            onChange={dateChange}
            className="flex items-center h-full w-full outline-none bg-transparent"
          />
        </div>
        <div
          onClick={() => {
            Seek(+1);
          }}
          className="bg-slate-400 bg-opacity-50 rounded-full w-7 h-7 dark:text-stone-200 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-stone-700 flex items-center justify-center"
        >
          <AiOutlineRight />
        </div>
      </div>
      <Info />
    </div>
  );
}

export default Weton;
