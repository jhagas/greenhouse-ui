import { IoStatsChart } from "react-icons/io5";

export default function Stats() {
  const Select = () => {
    return (
      <div>
        <label class="label">
          <span class="label-text opacity-75">Select the timerange</span>
        </label>
        <input type="range" min="1" max="3" class="range" step="1" />
        <div class="w-full flex justify-between text-xs px-2">
          <span>24H</span>
          <span>48H</span>
          <span>72H</span>
        </div>
      </div>
    );
  };
  return (
    <div className="tooltip tooltip-left" data-tip="Full stats">
      <label htmlFor="my-modal-3">
        <div className="hover:text-purple-600 cursor-pointer transition-colors duration-300 dark:hover:text-yellow-300 text-gray-600 dark:text-white">
          <IoStatsChart size="24px" />
        </div>
      </label>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <label htmlFor="my-modal-3" class="modal cursor-pointer">
        <label class="modal-box relative" for="">
          <h3 class="text-lg font-bold">Measurement Record</h3>
          <Select />
        </label>
      </label>
    </div>
  );
}
