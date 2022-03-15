import React, { useEffect, useRef, useState } from "react";
import { TiLocation } from "react-icons/ti";
import { useOnClickOutside } from "usehooks-ts";
import { getCities } from "../services/general_services";

const LocationInput = ({ selectedCity, setSelectedCity, height, width }) => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      setQuery(e.target.value);
      if (e.target.value.length > 2) {
        const { data } = await getCities(e.target.value);
        setCities(data.features);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  const handleItemClick = (e, city) => {
    e.stopPropagation();
    setSelectedCity(city);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div
      ref={ref}
      onClick={() => setIsOpen(true)}
      className={`relative flex h-${height} w-${width} items-center gap-4 rounded-xl bg-slate-200 pl-4 shadow`}
    >
      <TiLocation className="fill-slate-500" fontSize={22} />
      <span
        className={`text-sm ${
          selectedCity === "" ? "text-slate-400" : "text-black"
        } `}
      >
        {selectedCity === "" ? "Work location" : selectedCity}
      </span>
      {isOpen && (
        <div className="absolute left-0 top-[70px] z-50 flex w-full flex-col overflow-hidden rounded-xl bg-slate-200 fill-red-400 shadow">
          <input
            value={query}
            type="text"
            placeholder="Search city"
            required
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            className="h-10 w-full border-0 bg-white pl-4 text-sm text-black outline-none placeholder:text-sm placeholder:text-slate-400"
          ></input>
          {cities.map((city) => (
            <option
              key={city.id}
              onClick={(e) => {
                handleItemClick(e, city.place_name);
              }}
              className="cursor-pointer py-3 pl-3 text-xs font-semibold tracking-wider text-black hover:bg-slate-300"
            >
              {city.place_name}
            </option>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
