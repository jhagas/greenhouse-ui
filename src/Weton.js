import React, { useEffect, useRef, useState } from "react";
import { IoCalendar } from "react-icons/io5";

function Today() {
  let date = new Date().getDate();
  let year = new Date().getFullYear();

  let month = new Date().getMonth() + 1;

  if (month < 10) {
    month = "0" + month;
  }

  return `${year}-${month}-${date}`
}

function Weton() {
  const today = Today()
  const dateRef = useRef();
  const [dateValue, setDateValue] = useState(today);

  const dateChange = () => {
    setDateValue(dateRef.current.value);
  };

  useEffect(() => {
    const date = new Date(dateValue)
    console.log(date)
  });

  return (
    <div
      className="flex flex-col w-full justify-center items-center "
      style={{
        height: "calc(100vh - 4rem)",
      }}
    >
      <div className="flex flex-row items-center px-4 w-[11rem] text-stone-700 dark:text-stone-300 h-8 bg-white dark:bg-sky-900 rounded-md border-transparent focus:outline-2 focus:outline-sky-500 shadow-md">
        <IoCalendar className="fixed translate-x-32" />
        <input
          ref={dateRef}
          type="date"
          name="date"
          id="dategregorian"
          value={today}
          onChange={dateChange}
          className="flex items-center h-full w-full outline-none bg-transparent"
        />
      </div>
    </div>
  );
}

export default Weton;
