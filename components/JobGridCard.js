import React from "react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";

const JobGridCard = ({ job }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/jobs/${job.id}`)}
      className="flex h-72 w-full cursor-pointer flex-col justify-around rounded-xl bg-slate-100 py-2 px-5 shadow-sm transition-all duration-300 ease-in-out hover:scale-105"
    >
      {/* Image & date */}
      <div className="flex items-center justify-between">
        <Image
          className="rounded-full"
          src={job.image}
          alt="Image of job"
          height={50}
          width={50}
        />
        <span className="text-xs font-semibold text-slate-300">
          {moment(job.createdAt).format("Do MMM")}
        </span>
      </div>
      {/* Title */}
      <div className="flex">
        <span className="text-sm font-semibold capitalize tracking-wider">
          {job.title}
        </span>
      </div>
      {/* Types */}
      <div className="flex w-full items-center gap-6">
        <div className="rounded-lg bg-purple-200 px-3 py-1 text-[0.6rem] font-semibold text-purple-700">
          {job.schedule}
        </div>
        <div className="rounded-lg bg-green-200 px-2 py-1 text-[0.6rem] font-semibold text-green-700">
          {job.type}
        </div>
        <div className="rounded-lg bg-blue-200 px-2 py-1 text-[0.6rem] font-semibold text-blue-700">
          {job.level}
        </div>
      </div>
      <span className="text-xs font-semibold capitalize tracking-wider">
        {job.location}
      </span>
      <p className="text-ellipsis text-sm text-slate-400 line-clamp-3">
        sdjfsdfsfhsdhf dkshdkfs
        sdfksdfsksdsfjndfsnfsfnksndfsdfjsdfnslsndfsddsfnlsndlsldfsdfslndfsdfnsllllllsdnlsdfnlslllsndfsldfsldfslflls
        sdfsnflsflsdjfsdfosifhoshfoshf sfhsofhsofshfosh k{job.description}
      </p>
   
    </div>
  );
};

export default JobGridCard;
