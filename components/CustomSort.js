import React from "react";

const CustomSort = ({
  index,
  sort,
  sortCheck,
  setSortCheck,
  setCurrentSort,
}) => {
  const handleOnSortChange = (e) => {
    if (index === sortCheck) {
      setCurrentSort(sort);
      setSortCheck(0);
    } else {
      setSortCheck(index);
    }
  };

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <input
        type="checkbox"
        className="rounded-md border-slate-300 text-sky-400 outline-none"
        value={index === sortCheck ? true : false}
        checked={index === sortCheck ? true : false}
        onChange={(e) => handleOnSortChange(e)}
      />
      <span className="text-xs font-semibold">{sort}</span>
    </div>
  );
};

export default CustomSort;
