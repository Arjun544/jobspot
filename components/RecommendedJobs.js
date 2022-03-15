import React, { useState } from "react";
import SortBy from "./SortBy";

const RecommendedJobs = ({ jobs }) => {
  const [sortBy, setSortBy] = useState("");

  return (
    <div className="flex w-full flex-col pl-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wider">Recommended jobs</span>
          <span className="font-semibold text-slate-400 tracking-wider">
          {jobs.length}
          </span>
        </div>
        <div className="w-44">
          <SortBy
            hint={"Sort by"}
            items={["New", "Old", "By reviews"]}
            selectedItem={sortBy}
            setSelectedItem={setSortBy}
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendedJobs;
