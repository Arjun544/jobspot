import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import JobsView from "../../../components/JobsView";
import TopBar from "../../../components/TopBar";
import Lottie from "lottie-react";
import login from "../../../public/login.json";
import { getUserAppliedJobs } from "../../../services/job_services";

const MyAppliedJobs = ({ jobs }) => {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <>
      <Head>
        <title>My Applied Jobs - Jobspot</title>
        <meta
          name="Jobspot is a job listing platform, where you can create jobs and hire people as individual or as a company."
          content="Jobspot is a job listing platform, where you can create jobs and hire people as individual or as a company."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-screen bg-white">
        <TopBar />
        {/* If user not login */}
        {!isAuth ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex h-72 w-72 items-center justify-center">
              <Lottie animationData={login} autoPlay={true} loop={true} />
            </div>
            <span className="font-semibold tracking-widest text-slate-400">
              Login to view your applied jobs
            </span>
          </div>
        ) : (
          <div className="flex flex-col px-10 pt-20 md:px-16 md:pt-20">
            <span className="text-sm font-semibold tracking-wider md:text-base">
              Your Applied jobs
            </span>
            <JobsView jobs={jobs} />
          </div>
        )}
      </div>
    </>
  );
};

export default MyAppliedJobs;

export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.userId;
  const { data } = await getUserAppliedJobs(userId);

  return {
    props: {
      jobs: data.jobs,
    },
  };
}
