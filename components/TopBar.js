import Link from "next/link";
import React from "react";
import ProfileSection from "./ProfileDropDown";
const TopBar = () => {
  return (
    <div className="flex h-16 w-full items-center justify-between bg-white px-10 shadow">
      <div className="flex items-center">
        <span className="text-xl font-semibold tracking-wider text-black">
          Job
        </span>
        <span className="text-xl font-semibold tracking-wider text-sky-500">
          spot
        </span>
      </div>
      {/* Links */}
      <div className="flex items-center gap-4">
        <Link href="" passHref>
          <span className="cursor-pointer rounded-xl py-2 px-4 text-sm font-semibold tracking-wider hover:bg-slate-200">
            Home
          </span>
        </Link>
        <Link href="" passHref>
          <span className="cursor-pointer rounded-xl py-2 px-4 text-sm font-semibold tracking-wider hover:bg-slate-200">
            Companies
          </span>
        </Link>
        <span className="cursor-pointer rounded-xl py-2 px-4 text-sm font-semibold tracking-wider hover:bg-slate-200">
          My Jobs
        </span>
      </div>

      {/* Profile */}
      <ProfileSection />
    </div>
  );
};

export default TopBar;
