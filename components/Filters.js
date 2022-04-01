import React, { useContext, useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../pages/_app";
import CustomCheckbox from "./CustomCheckbox";
import CustomSort from "./CustomSort";

const sorts = [
  "Newest",
  "Oldest",
  "By salary",
  "By reviews",
  "By applicants",
  "Weekly",
  "Monthly",
];

const Filters = ({ jobs, isAllJobs = false }) => {
  const { filteredJobs, setFilteredJobs } = useContext(AppContext);
  const { isAuth, user } = useSelector((state) => state.auth);
  const [currentSort, setCurrentSort] = useState(null);
  const [sortCheck, setSortCheck] = useState(0);
  const [schedules, setSchedules] = useState([]);
  const [types, setTypes] = useState([]);
  const [levels, setLevels] = useState([]);

  // Returns the jobs where job industry contains any recommended key
  const recommendedJobs = useMemo(() => {
    const recommendedKeys = [
      "software",
      "web",
      "mobile",
      "design",
      "IT",
      "developer",
      "program",
      "industry",
    ];
    let data;
    switch (isAllJobs) {
      case false:
        data = isAuth
          ? jobs.filter(
              (job) => job.location === user.city && job.userId !== user.id
            )
          : jobs.filter((job) =>
              recommendedKeys
                .map((key) =>
                  job.industry.toLowerCase().includes(key.toLowerCase())
                )
                .includes(true)
            );
        break;
      case true:
        data = isAuth ? jobs.filter((job) => job.userId !== user.id) : jobs;
        break;
      default:
        break;
    }

    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, jobs]);

  // Returns the jobs where job type contains any schedule type
  const schedulesJobs = useMemo(() => {
    const newJobs = recommendedJobs.filter((job) =>
      schedules
        .map((schedule) =>
          job.schedule.toLowerCase().includes(schedule.toLowerCase())
        )
        .includes(true)
    );
    return newJobs;
  }, [recommendedJobs, schedules]);

  // Returns the jobs where job type contains any type type
  const typesJobs = useMemo(() => {
    const newJobs = recommendedJobs.filter((job) =>
      types
        .map((type) => job.type.toLowerCase().includes(type.toLowerCase()))
        .includes(true)
    );
    return newJobs;
  }, [recommendedJobs, types]);

  // Returns the jobs where job type contains any type type
  const levelsJobs = useMemo(() => {
    const newJobs = recommendedJobs.filter((job) =>
      levels
        .map((level) => job.level.toLowerCase().includes(level.toLowerCase()))
        .includes(true)
    );
    return newJobs;
  }, [recommendedJobs, levels]);

  const sortedJobs = useMemo(() => {
    let newJobs;
    switch (currentSort) {
      case "Newest":
        newJobs = filteredJobs.sort((a, b) => a.createdAt - b.createdAt);
      case "Oldest":
        newJobs = filteredJobs.sort((a, b) => b.createdAt - a.createdAt);
      case "By salary":
        newJobs = filteredJobs.sort((a, b) => a.salary - b.salary);
    }
    return newJobs;
  }, [currentSort, filteredJobs]);

  if (
    schedules.length === 0 &&
    types.length === 0 &&
    levels.length === 0 &&
    currentSort === null
  ) {
    setFilteredJobs(recommendedJobs);
  } else if (schedules.length !== 0) {
    setFilteredJobs(schedulesJobs);
  } else if (types.length !== 0) {
    setFilteredJobs(typesJobs);
  } else if (levels.length !== 0) {
    setFilteredJobs(levelsJobs);
  } else {
    console.log(sortedJobs);
    setFilteredJobs([]);
  }

  return (
    <div className="mt-2 flex flex-col gap-10 bg-slate-50">
      <span className="text-sm font-semibold tracking-wider md:text-base">
        Filters
      </span>
      {/* Sort */}
      <div className="flex flex-col gap-3">
        <span className="mb-2 text-xs font-semibold tracking-wider text-slate-400">
          Sort
        </span>
        {sorts.map((sort, index) => (
          <CustomSort
            key={index}
            index={index}
            sort={sort}
            sortCheck={sortCheck}
            setSortCheck={setSortCheck}
            setCurrentSort={setCurrentSort}
          />
        ))}
      </div>
      {/* Schedule */}
      <div className="flex flex-col gap-3">
        <span className="mb-2 text-xs font-semibold tracking-wider text-slate-400">
          Schedule
        </span>
        <CustomCheckbox
          text={"Full time"}
          states={schedules}
          setStates={setSchedules}
        />
        <CustomCheckbox
          text={"Part time"}
          states={schedules}
          setStates={setSchedules}
        />
        <CustomCheckbox
          text={"Project time"}
          states={schedules}
          setStates={setSchedules}
        />
        <CustomCheckbox
          text={"Volunteering"}
          states={schedules}
          setStates={setSchedules}
        />
        <CustomCheckbox
          text={"Internship"}
          states={schedules}
          setStates={setSchedules}
        />
      </div>
      {/* Type */}
      <div className="flex flex-col gap-3">
        <span className="mb-2 text-xs font-semibold tracking-wider text-slate-400">
          Type
        </span>
        <CustomCheckbox text={"Full day"} states={types} setStates={setTypes} />
        <CustomCheckbox
          text={"Shift work"}
          states={types}
          setStates={setTypes}
        />
        <CustomCheckbox
          text={"Flexible schedule"}
          states={types}
          setStates={setTypes}
        />
        <CustomCheckbox text={"Remote"} states={types} setStates={setTypes} />
        <CustomCheckbox
          text={"Shift work"}
          states={types}
          setStates={setTypes}
        />
      </div>
      {/* Level */}
      <div className="flex flex-col gap-3">
        <span className="mb-2 text-xs font-semibold tracking-wider text-slate-400">
          Level
        </span>
        <CustomCheckbox
          text={"Tainee level"}
          states={levels}
          setStates={setLevels}
        />
        <CustomCheckbox
          text={"Junior level"}
          states={levels}
          setStates={setLevels}
        />
        <CustomCheckbox
          text={"Middle level"}
          states={levels}
          setStates={setLevels}
        />
        <CustomCheckbox
          text={"Senior level"}
          states={levels}
          setStates={setLevels}
        />
        <CustomCheckbox
          text={"Director level"}
          states={levels}
          setStates={setLevels}
        />
      </div>
    </div>
  );
};

export default Filters;
