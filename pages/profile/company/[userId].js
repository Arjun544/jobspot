import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import CompaniesView from "../../../components/CompaniesView";
import TopBar from "../../../components/TopBar";
import Lottie from "lottie-react";
import login from "../../../public/login.json";
import empty from "../../../public/empty.json";
import { getUserCompany } from "../../../services/company_services";

const MyCompanies = ({ company }) => {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <>
      <Head>
        <title>My Company - Jobspot</title>
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
              Login to view your company
            </span>
          </div>
        ) : (
          <div className="flex flex-col px-10 pt-80 md:px-16 md:pt-20">
            <span className="text-sm font-semibold tracking-wider md:text-base">
              Your company
            </span>
            {company === null ? (
              <div className="flex h-full w-full flex-col items-center pt-20">
                <div className="flex h-72 w-72 items-center justify-center">
                  <Lottie animationData={empty} autoPlay={true} loop={true} />
                </div>
                <span className="font-semibold tracking-widest text-slate-300">
                  No Company found
                </span>
              </div>
            ) : (
              <CompaniesView companies={[company]} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MyCompanies;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const userId = params.userId;
  const { data } = await getUserCompany(userId);

  return {
    props: {
      company: data.company,
    },
    revalidate: 1,
  };
}
