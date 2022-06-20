import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
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
}
