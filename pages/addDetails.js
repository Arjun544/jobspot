import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import JobFinderView from "../components/JobFinderView";
import RecruiterView from "../components/RecruiterView";

const AddDetails = () => {
  const router = useRouter();
  const [currentTab, setcurrentTab] = useState(1);
  const hasPrevPage = router.query ? true : false;

  useEffect(() => {
    if (!hasPrevPage) {
      router.push("/");
    }
  }, [hasPrevPage, router]);

  return (
    <div className="flex h-screen w-screen flex-col bg-white px-20 py-6">
      <span className="text-xl font-semibold tracking-wider text-black">
        Let us know more about you
      </span>
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className="font-semibold tracking-wider text-black">
          Apply as a job
        </span>
        {/* Tabbar */}
        <div className="flex h-16 w-60 gap-2 rounded-2xl bg-slate-100">
          <div
            onClick={() => setcurrentTab(1)}
            className={`m-3 flex w-full cursor-pointer items-center justify-center rounded-xl transition-all duration-300 ease-in-out hover:scale-95 ${
              currentTab === 1 ? "bg-sky-500 text-white" : "bg-slate-100"
            }`}
          >
            Finder
          </div>
          <div
            onClick={() => setcurrentTab(2)}
            className={`m-3 flex w-full cursor-pointer items-center justify-center rounded-xl transition-all duration-300 ease-in-out hover:scale-95 ${
              currentTab === 2 ? "bg-sky-500 text-white" : "bg-slate-100"
            }`}
          >
            Recruiter
          </div>
        </div>
      </div>
        {/* Tab Views */}
        {currentTab === 1 ? <JobFinderView /> : <RecruiterView />}
    </div>
  );
};

export default AddDetails;
