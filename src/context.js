import { useEffect, useState } from "react";
import { createContext } from "react";
import App from "./App";

export const PagesContext = createContext(0);

export default function Context() {
  function Today() {
    let date = new Date().getDate();
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;

    if (month < 10) {
      month = "0" + month;
    }

    return `${year}-${month}-${date}`;
  }
  const today = Today();
  const [date, setDateValue] = useState(today);
  const [api, setApi] = useState(0);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function ambilData() {
      setLoading(true);
      const data = await fetch("https://wetonizer-api.herokuapp.com/" + date);
      const json = await data.json();
      setApi(json);
      setLoading(false);
    }
    ambilData();
  }, [date]);

  return (
    <PagesContext.Provider value={{ date, setDateValue, api, loading }}>
      <App />
    </PagesContext.Provider>
  );
}
