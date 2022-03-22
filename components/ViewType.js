import { useRef, useState } from "react";
import { HiViewGrid } from "react-icons/hi";
import { FaListUl } from "react-icons/fa";

const ViewType = ({ viewType, setViewType }) => {
  return (
    <div className="flex h-10 w-28 items-center justify-around rounded-xl bg-slate-200">
      <div
        onClick={() => setViewType("grid")}
        className={`flex cursor-pointer items-center justify-center rounded-lg py-1.5 px-2 transition-all duration-500 ease-in-out hover:scale-100 ${
          viewType === "grid" ? "bg-sky-300 text-white" : "hover:text-sky-500"
        }`}
      >
        <HiViewGrid className="h-4 w-4" />
      </div>
      <div
        onClick={() => setViewType("list")}
        className={`flex cursor-pointer items-center justify-center rounded-lg py-1.5 px-2 transition-all duration-500 ease-in-out hover:scale-100 ${
          viewType === "list" ? "bg-sky-300 text-white" : " hover:text-sky-500"
        }`}
      >
        <FaListUl className="h-4 w-4" />
      </div>
    </div>
  );
};

export default ViewType;
