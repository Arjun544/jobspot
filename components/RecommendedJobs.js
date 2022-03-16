import React, { useState } from "react";
import { useSelector } from "react-redux";
import JobCard from "./JobCard";
import SortBy from "./SortBy";
import Lottie from "lottie-react";
import empty from "../public/empty.json";

const RecommendedJobs = ({ jobs }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const [sortBy, setSortBy] = useState("");

  return (
    <div className="flex w-full flex-col pl-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2 pb-3 md:pb-0">
          <span className="text-sm font-semibold tracking-wider md:text-base">
            {isAuth ? "Jobs in your city" : "Recommended jobs"}
          </span>
          <span className="text-sm font-semibold tracking-wider text-slate-400 md:text-base">
            {jobs.length}
          </span>
        </div>
        <SortBy
          hint={"Sort by"}
          items={["New", "Old", "By reviews"]}
          selectedItem={sortBy}
          setSelectedItem={setSortBy}
        />
      </div>
      {/* List of jobs */}
      {jobs.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center pt-20">
          <div className="flex h-72 w-72 items-center justify-center">
            <Lottie animationData={empty} autoPlay={true} loop={true} />
          </div>
          <span className="font-semibold tracking-widest text-slate-300">
            No jobs found
          </span>
        </div>
      ) : (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      )}
    </div>
  );
};

export default RecommendedJobs;
