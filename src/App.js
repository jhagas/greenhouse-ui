import { useState } from "react";
import Footer from "./page/components/footer";
import Navbar from "./page/components/navbar";
import Info from "./page/Info";
import { Route, Routes } from "react-router-dom";
import Stats from "./page/stats";

function App() {
  if (localStorage.getItem("dark") === null) {
    localStorage.setItem("dark", "true");
  }
  const [dark, setDark] = useState(JSON.parse(localStorage.getItem("dark")));
  localStorage.setItem("dark", dark);
  const toogleDark = () => {
    setDark(!dark);
  };

  return (
    <div className={dark ? "dark" : "light"}>
      <div className="h-screen transition duration-300 w-full bg-[#F2F2F2] dark:bg-[#16222A]">
        <Navbar dark={dark} toogleDark={toogleDark} />
        <Routes>
          <Route path="/" element={<Info />} />
          <Route path="/stats" element={<Stats dark={dark} />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
