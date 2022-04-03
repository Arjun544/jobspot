import React from "react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";

const CompaniesGridCard = ({ company }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/companies/${company.id}`)}
      className="flex h-72 w-full cursor-pointer flex-col justify-around rounded-xl bg-slate-100 py-2 px-5 shadow-sm transition-all duration-300 ease-in-out hover:scale-105"
    >
      {/* Image & date */}
      <div className="flex items-center justify-between">
        <Image
          className="rounded-full"
          src={company.image}
          alt="Image of company"
          height={50}
          width={50}
        />
        <span className="text-xs font-semibold text-slate-300">
          {moment(company.createdAt).format("Do MMM")}
        </span>
      </div>
      {/* Title */}
      <div className="flex">
        <span className="text-sm font-semibold capitalize tracking-wider">
          {company.name}
        </span>
      </div>
      {/* Types */}
      <div className="flex w-full items-center gap-6">
        <div className="rounded-lg capitalize bg-purple-200 px-3 py-1 text-[0.6rem] font-semibold text-purple-700">
          {company.industry}
        </div>
        <div className="rounded-lg bg-green-200 px-2 py-1 text-[0.6rem] font-semibold text-green-700">
          Size: {company.size}
        </div>
        <div className="rounded-lg bg-blue-200 px-2 py-1 text-[0.6rem] font-semibold text-blue-700">
          {company.website}
        </div>
      </div>
      <span className="text-xs font-semibold capitalize tracking-wider">
        {company.city}
      </span>
      <p className="text-ellipsis text-sm text-slate-400 line-clamp-3">
        {company.details}
      </p>
    </div>
  );
};

export default CompaniesGridCard;
