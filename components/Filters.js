import React, { useContext, useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../pages/index";
import CustomCheckbox from "./CustomCheckbox";

const Filters = ({ jobs }) => {
  const { filteredJobs, setFilteredJobs } = useContext(AppContext);
  const { isAuth, user } = useSelector((state) => state.auth);
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
    const data = isAuth
      ? jobs.filter((job) => job.location === user.city)
      : jobs.filter((job) =>
          recommendedKeys
            .map((key) =>
              job.industry.toLowerCase().includes(key.toLowerCase())
            )
            .includes(true)
        );
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
  }, [levels, recommendedJobs]);

  schedules.length === 0 && types.length === 0 && levels.length === 0
    ? setFilteredJobs(recommendedJobs)
    : setFilteredJobs(...[schedulesJobs, typesJobs, levelsJobs]);

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
        <CustomCheckbox
          text={"Newest"}
          states={schedules}
          setStates={setSchedules}
        />
        <CustomCheckbox
          text={"Oldest"}
          states={schedules}
          setStates={setSchedules}
        />
        <CustomCheckbox
          text={"By salary"}
          states={schedules}
          setStates={setSchedules}
        />
        <CustomCheckbox
          text={"By reviews"}
          states={schedules}
          setStates={setSchedules}
        />
        <CustomCheckbox
          text={"By applicants"}
          states={schedules}
          setStates={setSchedules}
        />
        <CustomCheckbox
          text={"Weekly"}
          states={schedules}
          setStates={setSchedules}
        />
        <CustomCheckbox
          text={"Monthly"}
          states={schedules}
          setStates={setSchedules}
        />
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
