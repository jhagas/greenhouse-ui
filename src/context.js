import { useEffect, useState } from "react";
import { createContext } from "react";
import App from "./App";
import { supabase } from "./supabase/supabase";

export const PagesContext = createContext(0);

export default function Context() {
  const [api, setApi] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fault, setFault] = useState(false);

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
        setFault(true)
      }
    }
    ambilData();

    const interval = setInterval(() => {
      ambilData();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PagesContext.Provider value={{ api, loading, fault }}>
      <App />
    </PagesContext.Provider>
  );
}
