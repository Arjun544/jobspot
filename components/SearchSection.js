import React, { useContext, useState } from "react";
import LocationInput from "./LocationInput";
import { useSelector } from "react-redux";
import { RiSearch2Fill } from "react-icons/ri";
import { getSearch } from "../services/search_services";
import { AppContext } from "../pages/_app";
import { toast } from "react-toastify";

const SearchSection = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const { query, setQuery, setFilteredJobs, setSearchedJobs } =
    useContext(AppContext);
  const [salary, setSalary] = useState(60000);
  const [selectedCity, setSelectedCity] = useState(isAuth ? user.city : "");

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(salary.toString());
    const { data } = await getSearch(
      query.toLowerCase(),
      selectedCity,
      salary.toString()
    );
    if (data.success) {
      setFilteredJobs(data.jobs);
      setSearchedJobs(data.jobs);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="fixed top-16 z-40 mt-0 flex h-1/3 w-full flex-col items-center justify-between gap-10 bg-white py-3 px-6 shadow md:flex md:h-20 md:flex-row md:px-16">
      {/* Searchbar */}
      <div className="flex h-16 w-full items-center gap-4 rounded-xl bg-slate-200 pl-4 shadow md:h-full md:w-1/2">
        <RiSearch2Fill className="fill-slate-500" fontSize={22} />
        <input
          value={query}
          type="text"
          placeholder="Search job"
          onChange={(e) => setQuery(e.target.value)}
          className="h-full w-full rounded-xl border-0 bg-slate-200 text-black outline-none ring-0 placeholder:text-sm placeholder:text-slate-400 focus:ring-0"
        ></input>
      </div>
      <LocationInput
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        height="h-16 md:h-full"
        width={"w-full md:w-1/2"}
      />
      <div className="mb-3 flex w-52 flex-col gap-4 md:mb-0">
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
      {/* Search button */}
      {query.length > 3 && (
        <button
          onClick={(e) => handleSearch(e)}
          className="rounded-xl bg-black px-8 py-3 text-sm font-semibold tracking-widest text-white transition-all duration-500 ease-in-out hover:scale-105"
        >
          Search
        </button>
      )}
    </div>
  );
};

export default SearchSection;
