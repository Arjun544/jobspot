import React, { useState } from "react";
import LocationInput from "./LocationInput";
import { useSelector } from "react-redux";
import { RiSearch2Fill } from "react-icons/ri";

const SearchSection = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const [salary, setSalary] = useState(50000);
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <div className="mt-1 flex h-20 w-full items-center justify-between gap-6 bg-white py-3 px-10 shadow">
      {/* Searchbar */}
      <div className="flex h-full w-1/2 items-center gap-4 rounded-xl bg-slate-200 pl-4 shadow">
        <RiSearch2Fill className="fill-slate-500" fontSize={22} />
        <input
          type="text"
          placeholder="Search job"
          className="h-full w-full rounded-xl border-0 bg-slate-200 text-black outline-none placeholder:text-sm placeholder:text-slate-400"
        ></input>
      </div>
      <LocationInput
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        height='full' 
      />
      <div className="flex w-52 flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold">The salary</span>
          <span className="text-xs font-semibold">$ 0 - $ {salary}</span>
        </div>
        <input
          value={salary}
          type="range"
          min="0"
          max="500000"
          className="h-1 appearance-none rounded-full bg-sky-300"
          onChange={(e) => setSalary(e.target.value)}
        ></input>
      </div>
    </div>
  );
};

export default SearchSection;
