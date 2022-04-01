import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CompaniesView from "../../components/CompaniesView";
import JobsView from "../../components/JobsView";
import TopBar from "../../components/TopBar";

import Lottie from "lottie-react";
import login from "../../public/login.json";
import { getUserSavedJobs } from "../../services/job_services";
import { getUserSavedCompanies } from "../../services/company_services";

const MySaved = ({ jobs, companies }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="h-screen w-screen bg-white">
      <TopBar />
      {/* If user not login */}
      {!isAuth && (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex h-72 w-72 items-center justify-center">
            <Lottie animationData={login} autoPlay={true} loop={true} />
          </div>
          <span className="font-semibold tracking-widest text-slate-400">
            Login to view your saved jobs and companies
          </span>
        </div>
      )}
      <div className="flex h-full w-full flex-col items-center px-10 pt-20">
        {/* Tabbar */}
        <div className="flex h-16 w-72 gap-2 rounded-2xl bg-slate-100">
          <div
            onClick={() => setCurrentTab(0)}
            className={`m-2 flex w-full cursor-pointer items-center justify-center rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 ${
              currentTab === 0 ? "bg-sky-500 text-white" : "bg-slate-100"
            }`}
          >
            Jobs
          </div>
          <div
            onClick={() => setCurrentTab(1)}
            className={`m-2 flex w-full cursor-pointer items-center justify-center rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 ${
              currentTab === 1 ? "bg-sky-500 text-white" : "bg-slate-100"
            }`}
          >
            Companies
          </div>
        </div>
        {/* Tab view */}
        {currentTab === 0 ? (
          <JobsView jobs={jobs} />
        ) : (
          <CompaniesView companies={companies} />
        )}
      </div>
    </div>
  );
};

export default MySaved;

export async function getStaticPaths() {
  return {
    paths: [{ params: { userId: "1" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const userId = params.userId;
  const { data } = await getUserSavedJobs(userId);
  const companies = await getUserSavedCompanies(userId);

  return {
    props: {
      jobs: data.jobs,
      companies: companies.data.companies,
    },
  };
}