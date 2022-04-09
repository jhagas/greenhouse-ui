import React, { useContext, useEffect, useRef } from "react";
import { IoCalendar } from "react-icons/io5";
import { PagesContext } from "./context";
import Info from "./Info";

function Weton() {
  const dateRef = useRef();
  const { date, setDateValue, api } = useContext(PagesContext);

  const dateChange = () => {
    setDateValue(dateRef.current.value);
  };

  return (
    <div
      className="flex flex-col w-full justify-center items-center "
      style={{
        height: "calc(100vh - 4rem)",
      }}
    >
      <p className="font-medium text-stone-700 dark:text-stone-300 m-2">Pilih tanggal dalam masehi</p>
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
      <Info/>
    </div>
  );
}

export default Weton;
