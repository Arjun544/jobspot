import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../pages/index";
import CustomCheckbox from "./CustomCheckbox";

const Filters = ({ jobs }) => {
  const { filteredJobs, setFilteredJobs } = useContext(AppContext);
  const [schedules, setSchedules] = useState([]);
  const [types, setTypes] = useState([]);
  const [levels, setLevels] = useState([]);

  // setFilteredJobs(jobs);

  // Returns the jobs where job type contains any schedule type
  const schedulesJobs = useMemo(() => {
    const newJobs = jobs.filter((job) =>
      schedules
        .map((schedule) =>
          job.schedule.toLowerCase().includes(schedule.toLowerCase())
        )
        .includes(true)
    );
    return newJobs;
  }, [schedules, jobs]);

  // Returns the jobs where job type contains any type type
  const typesJobs = useMemo(() => {
    const newJobs = jobs.filter((job) =>
      types
        .map((type) => job.type.toLowerCase().includes(type.toLowerCase()))
        .includes(true)
    );
    return newJobs;
  }, [types, jobs]);

  // Returns the jobs where job type contains any type type
  const levelsJobs = useMemo(() => {
    const newJobs = jobs.filter((job) =>
      levels
        .map((level) => job.level.toLowerCase().includes(level.toLowerCase()))
        .includes(true)
    );
    return newJobs;
  }, [levels, jobs]);

   schedules.length === 0 && types.length === 0 && levels.length === 0
     ? setFilteredJobs
       (jobs) :
     setFilteredJobs(...[schedulesJobs, typesJobs, levelsJobs]);

  return (
    <div className="mt-2 flex flex-col gap-10 bg-slate-100">
      <span className="text-sm font-semibold tracking-wider md:text-base">
        Filters
      </span>
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
          text={"Shift method"}
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
        <CustomCheckbox text={"Senior"} states={levels} setStates={setLevels} />
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
