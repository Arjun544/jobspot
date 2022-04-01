import React, { useState } from "react";
import { useSelector } from "react-redux";
import CompaniesView from "../../../components/CompaniesView";
import TopBar from "../../../components/TopBar";

import Lottie from "lottie-react";
import login from "../../../public/login.json";
import { getUserCompany } from "../../../services/company_services";

const MyCompanies = ({ company }) => {
  const { isAuth } = useSelector((state) => state.auth);

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
            Login to view your company
          </span>
        </div>
      )}
      <div className="flex flex-col px-10 pt-80 md:px-16 md:pt-20">
        <span className="text-sm font-semibold tracking-wider md:text-base">
          Your company
        </span>
        <CompaniesView companies={[company]} />
      </div>
    </div>
  );
};

export default MyCompanies;

export async function getStaticPaths() {
  return {
    paths: [{ params: { userId: "1" } }],
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
  };
}
