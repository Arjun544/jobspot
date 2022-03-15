import React from "react";
import CustomCheckbox from "./CustomCheckbox";

const Filters = ({jobs}) => {
  return (
    <div className="flex flex-col gap-10 bg-slate-100 mt-2">
      <span className="font-semibold tracking-wider">Filters</span>
      {/* Schedule */}
      <div className="flex flex-col gap-3">
        <span className="mb-2 text-xs font-semibold tracking-wider text-slate-400">
          Schedule
        </span>
        <CustomCheckbox text={"Full time"} />
        <CustomCheckbox text={"Part time"} />
        <CustomCheckbox text={"Project time"} />
        <CustomCheckbox text={"Volunteering"} />
        <CustomCheckbox text={"Internship"} />
      </div>
      {/* Type */}
      <div className="flex flex-col gap-3">
        <span className="mb-2 text-xs font-semibold tracking-wider text-slate-400">
          Type
        </span>
        <CustomCheckbox text={"Full day"} />
        <CustomCheckbox text={"Shift work"} />
        <CustomCheckbox text={"Flexible schedule"} />
        <CustomCheckbox text={"Remote"} />
        <CustomCheckbox text={"Shift method"} />
      </div>
      {/* Level */}
      <div className="flex flex-col gap-3">
        <span className="mb-2 text-xs font-semibold tracking-wider text-slate-400">
          Level
        </span>
        <CustomCheckbox text={"Tainee level"} />
        <CustomCheckbox text={"Junior level"} />
        <CustomCheckbox text={"Middle level"} />
        <CustomCheckbox text={"Senior"} />
        <CustomCheckbox text={"Director level"} />
      </div>
    </div>
  );
};

export default Filters;
