import { useEffect, useState } from "react";
import { createContext } from "react";
import App from "./App";
import { supabase } from "./supabase/supabase";

export const PagesContext = createContext(0);

export default function Context() {
  const [api, setApi] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function ambilData() {
      let { data, error } = await supabase
        .from("data")
        .select("*")
        .order("time", { ascending: false })
        .limit(1);
      setApi({ data: { now: new Date(), data }, error });
      setLoading(false);
    }
    ambilData();

    const interval = setInterval(() => {
      ambilData();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PagesContext.Provider value={{ api, loading }}>
      <App />
    </PagesContext.Provider>
  );
}
