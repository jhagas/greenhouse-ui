import { MdError } from "react-icons/md";

export default function ErrorMessage() {
  return (
    <>
      <div
        className="flex flex-col w-full justify-center items-center "
        style={{
          height: "calc(100% - 6rem)",
        }}
      >
        <div>
          <div className="flex flex-col items-center gap-2 max-w-md px-6">
            <div className="text-red-600 animate-bounce">
              <MdError size="40px" />
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400">
              There's some problem, please check your internet
              connection/database and refresh the page.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
