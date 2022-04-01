import React from "react";
import CompanyGridCard from "./CompanyGridCard";
import Lottie from "lottie-react";
import empty from "../public/empty.json";

const CompaniesView = ({ companies }) => {
  return (
    <div className="h-full w-full bg-white py-4">
      {companies.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center pt-20">
          <div className="flex h-72 w-72 items-center justify-center">
            <Lottie animationData={empty} autoPlay={true} loop={true} />
          </div>
          <span className="font-semibold tracking-widest text-slate-300">
            No companies found
          </span>
        </div>
      ) : (
        <div className="mt-5 grid h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <CompanyGridCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompaniesView;
