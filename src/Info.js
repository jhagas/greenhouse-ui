import { useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PagesContext } from "./context";

export default function Info() {
  const { api, loading } = useContext(PagesContext);

  const Loading = () => {
    return (
      <div className="flex flex-col items-center justify-center m-4">
        <AiOutlineLoading3Quarters
          size="24px"
          className="text-sky-800 dark:text-amber-500 animate-spin"
        />
        <p className="text-stone-700 dark:text-stone-300 text-xl animate-pulse font-bold my-2">
          Loading Data...
        </p>
      </div>
    );
  };

  const Show = () => {
    let hari =
      api.jawa.weton +
      ", " +
      api.jawa.tanggal +
      " " +
      api.jawa.bulan +
      " " +
      api.jawa.tahun;

    let mangsa = api.jawa.mangsa;

    return (
      <div className="my-5 px-4 max-w-5xl text-center">
        <h1 className="text-2xl text-sky-800 dark:text-amber-500 font-extrabold mb-3">
          KALENDER JAWA
        </h1>
        <div className="text-stone-700 dark:text-stone-300">
          <p className="text-xl font-semibold">{hari}</p>
          <p>Neptu {api.jawa.neptu}</p>
          <p>Warsa {api.jawa.warsa}</p>
          <p>Kurup {api.jawa.kurup}</p>
        </div>
        <div className="text-stone-700 dark:text-stone-300 mt-3">
          <p className="text-lg font-semibold mb-1">Mangsa {mangsa.nama}</p>
          <p>{mangsa.deskripsi}</p>
        </div>
      </div>
    );
  };

  return <div>{loading ? <Loading /> : <Show />}</div>;
}
