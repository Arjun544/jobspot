import Link from "next/link";
import React from "react";
import ProfileSection from "./ProfileSection";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const TopBar = () => {
  const router = useRouter();
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <div className="flex h-16 w-full items-center justify-between bg-white px-16 shadow">
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
        <Link href="/" passHref>
          <span
            className={`cursor-pointer rounded-xl py-2 px-4 ${
              router.pathname === "/" ? "text-sky-500" : "text-black"
            } text-sm font-semibold tracking-wider hover:bg-slate-200`}
          >
            Home
          </span>
        </Link>
        <Link href="/companies" passHref>
          <span
            className={`cursor-pointer rounded-xl py-2 ${
              router.pathname === "/companies" ? "text-sky-500" : "text-black"
            } px-4 text-sm font-semibold tracking-wider hover:bg-slate-200`}
          >
            Companies
          </span>
        </Link>
        {isAuth && (
          <Link href="/myjobs" passHref>
            <span
              className={`cursor-pointer rounded-xl py-2 px-4 ${
                router.pathname === "/myjobs" ? "text-sky-500" : "text-black"
              } text-sm font-semibold tracking-wider hover:bg-slate-200`}
            >
              My Jobs
            </span>
          </Link>
        )}
      </div>
      {isAuth ? (
        <div className="flex items-center gap-3">
          {/* Post job */}
          <button
            onClick={(e) => router.push("/postJob")}
            className="rounded-lg px-4 py-2 text-sm font-semibold tracking-wider text-green-500 hover:bg-slate-100"
          >
            Post a Job
          </button>
          {/* Profile */}

          <ProfileSection />
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <Link href="/login" passHref>
            <span className="cursor-pointer text-sm font-semibold tracking-wider text-green-500 hover:text-green-400">
              Login
            </span>
          </Link>
          <Link href="/register" passHref>
            <button className="rounded-xl bg-sky-400 py-2 px-4 text-sm font-semibold tracking-wider text-white hover:bg-sky-300">
              Signup
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TopBar;
