import { useEffect, useState } from "react";
import { createContext } from "react";
import App from "../page/App";
import { supabase } from "./supabase";

export const PagesContext = createContext(0);

export default function Context() {
  const [api, setApi] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fault, setFault] = useState(false);
  const [status, setStatus] = useState(true);

  // check if localstorage with key "dark" exist
  // if not (null), set to true. DARK MODE BY DEFAULT
  if (localStorage.getItem("dark") === null) {
    localStorage.setItem("dark", "true");
  }

  // initialize state, initial value is from localstoragewith key "dark"
  // localstorage hold value in string, so using JSON.parse(value) to convert to boolean
  const [dark, setDark] = useState(JSON.parse(localStorage.getItem("dark")));

  // State can detect if its value is changing. If its changing, run this line
  localStorage.setItem("dark", dark);

  // Define the function for toogling dark state (dark mode)
  const toogleDark = () => {
    setDark(!dark);
  };

  useEffect(() => {
    async function ambilData() {
      let { data, error } = await supabase
        .from("data")
        .select("*")
        .order("time", { ascending: false })
        .limit(1);
      setApi({ data, error });
      setLoading(false);
      if (new Date() - new Date(data[0].time) > 320000) {
        setFault(true);
      }
    }

    function changeStatus() {
      setStatus(navigator.onLine);
    }
    window.addEventListener("online", changeStatus);
    window.addEventListener("offline", changeStatus);
    
    if (status) {
      ambilData();
      
      const interval = setInterval(() => {
        ambilData();
      }, 20000);
      return () => {
        clearInterval(interval);
        window.removeEventListener("online", changeStatus);
        window.removeEventListener("offline", changeStatus);
      };
    }
  }, [status]);

  return (
    <PagesContext.Provider value={{ api, loading, fault, toogleDark, dark, status }}>
      <App />
    </PagesContext.Provider>
  );
}
