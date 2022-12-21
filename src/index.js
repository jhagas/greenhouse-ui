import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createClient } from "@supabase/supabase-js";
import { Provider } from "react-supabase";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const client = createClient(supabaseUrl, supabaseAnonKey);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider value={client}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
