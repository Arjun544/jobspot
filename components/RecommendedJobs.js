import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import JobCard from "./JobCard";
import SortBy from "./SortBy";
import Lottie from "lottie-react";
import empty from "../public/empty.json";
import { AppContext } from "../pages";
import moment from "moment";

const RecommendedJobs = () => {
  const { filteredJobs, setFilteredJobs } = useContext(AppContext);
  const { isAuth } = useSelector((state) => state.auth);
  const [sortBy, setSortBy] = useState("");
  // const [sortedJobs, setSortedJobs] = useState(filteredJobs);

  // console.log(sortedJobs);
  // Returns the jobs where job createdAt is in ascending order
  // useEffect(() => {
  //   switch (sortBy) {
  //     case "Newest":
  //        return setSortedJobs(filteredJobs);
  //      case "Oldest":
  //        setSortedJobs(filteredJobs.reverse());
  //      case "By salary":
  //        setSortedJobs(filteredJobs.sort((a, b) => a.salary - b.salary));
  //      case "By reviews":
  //        setSortedJobs(
  //          filteredJobs.sort((a, b) => b.reviews.length - a.reviews.length)
  //        );
  //      case "By applicants":
  //        setSortedJobs(
  //          filteredJobs.sort(
  //            (a, b) => b.applicants.length - a.applicants.length
  //          )
  //        );
  //      case "Weekly":
  //        setSortedJobs(
  //          filteredJobs.filter((job) =>
  //            moment(new Date(new Date(job.createdAt).getTime())).isBetween(
  //              moment(new Date(new Date().getTime() - 168 * 60 * 60 * 1000))
  //            )
  //          )
  //        );
  //      case "Monthly":
  //        setSortedJobs(
  //          filteredJobs.filter((job) =>
  //            moment(new Date(new Date(job.createdAt).getTime())).isBetween(
  //              moment(new Date(new Date().getTime() - 720 * 60 * 60 * 1000))
  //            )
  //          )
  //        );
  //      default:
  //        return null;
  //    }
  // }, [filteredJobs, sortBy])

  return (
    <div className="flex w-full flex-col pl-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2 pb-3 md:pb-0">
          <span className="text-sm font-semibold tracking-wider md:text-base">
            {isAuth ? "Jobs in your city" : "Recommended jobs"}
          </span>
          <span className="text-sm font-semibold tracking-wider text-slate-400 md:text-base">
            {filteredJobs.length}
          </span>
        </div>
        <SortBy
          items={[
            "Newest",
            "Oldest",
            "By salary",
            "By reviews",
            "By applicants",
            "Weekly",
            "Monthly",
          ]}
          selectedItem={sortBy}
          setSelectedItem={setSortBy}
        />
      </div>
      {/* List of jobs */}
      {filteredJobs.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center pt-20">
          <div className="flex h-72 w-72 items-center justify-center">
            <Lottie animationData={empty} autoPlay={true} loop={true} />
          </div>
          <span className="font-semibold tracking-widest text-slate-300">
            No jobs found
          </span>
        </div>
      ) : (
        filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
      )}
    </div>
  );
};

export default RecommendedJobs;
