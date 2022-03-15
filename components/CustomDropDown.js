import React from "react";

import { useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useOnClickOutside } from "usehooks-ts";

const CustomDropDown = ({ hint, items, selectedItem, setSelectedItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef();
  const handleClickOutside = () => {
    setIsOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsOpen((isOpen) => !isOpen);
  };
  const handleSort = (e, item) => {
    e.preventDefault();
    setSelectedItem(item);
  };

  return (
    <div
      onClick={toggleMenu}
      className={`relative mb-3 flex h-16 w-full cursor-pointer items-center justify-between rounded-xl border-none bg-slate-200 px-4 shadow-sm hover:bg-slate-100 md:mb-0`}
    >
      <span className="text-sm tracking-wider text-slate-500">
        {Object.keys(selectedItem).length === 0 ? hint : selectedItem}
      </span>

      <RiArrowDropDownLine
        fontSize={25}
        className="fill-black"
      ></RiArrowDropDownLine>
      {isOpen && (
        <div
          ref={ref}
          className={`absolute top-[70px] left-0 right-1 z-50 flex max-h-96 w-full flex-col overflow-y-scroll rounded-2xl bg-slate-200 py-4 px-2 shadow`}
        >
          {items.map((item, index) => (
            <span
              key={index}
              className="mb-1 rounded-md py-1 pl-4 text-sm tracking-wider text-black hover:bg-slate-400"
            >
              <div onClick={(e) => handleSort(e, item)}>{item}</div>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropDown;
