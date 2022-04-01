import Link from "next/link";
import React from "react";
import ProfileSection from "./ProfileSection";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const TopBar = () => {
  const router = useRouter();
  const { isAuth, user } = useSelector((state) => state.auth);

  return (
    <div className="fixed z-50 flex h-16 w-full items-center justify-between bg-white px-4 shadow md:px-16">
      {/* Logo */}
      <div className="flex items-center">
        <span className="font-semibold tracking-wider text-black md:text-xl">
          Job
        </span>
        <span className="font-semibold tracking-wider text-sky-500 md:text-xl">
          spot
        </span>
      </div>
      {/* Links */}
      <div className="flex items-center md:gap-4">
        <Link href="/" passHref>
          <span
            className={`cursor-pointer rounded-xl py-2 px-4 ${
              router.pathname === "/" ? "text-sky-500" : "text-black"
            } text-xs font-semibold tracking-wider hover:bg-slate-200 md:text-sm`}
          >
            Home
          </span>
        </Link>
        <Link href="/jobs" passHref>
          <span
            className={`cursor-pointer rounded-xl py-2 ${
              router.pathname === "/jobs" ? "text-sky-500" : "text-black"
            } px-4 text-xs font-semibold tracking-wider hover:bg-slate-200 md:text-sm`}
          >
            Jobs
          </span>
        </Link>
        <Link href="/companies" passHref>
          <span
            className={`cursor-pointer rounded-xl py-2 ${
              router.pathname === "/companies" ? "text-sky-500" : "text-black"
            } px-4 text-xs font-semibold tracking-wider hover:bg-slate-200 md:text-sm`}
          >
            Companies
          </span>
        </Link>
        {isAuth && (
          <Link href={`/mySaved/${user.id}`} passHref>
            <span
              className={`cursor-pointer rounded-xl py-2 px-4 ${
                router.pathname === "/mySaved" ? "text-sky-500" : "text-black"
              } text-xs font-semibold tracking-wider hover:bg-slate-200 md:text-sm`}
            >
              My Saved
            </span>
          </Link>
        )}
      </div>
      {isAuth ? (
        <div className="flex items-center gap-3">
          {/* Post job */}
          <button
            onClick={(e) => router.push("/postJob")}
            className="rounded-lg px-4 py-2 text-xs font-semibold tracking-wider text-green-500 hover:bg-slate-100 md:text-sm"
          >
            Post a Job
          </button>
          {/* Profile */}

          <ProfileSection />
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <Link href="/login" passHref>
            <span className="cursor-pointer text-xs font-semibold tracking-wider text-green-500 hover:text-green-400 md:text-sm">
              Login
            </span>
          </Link>
          <Link href="/register" passHref>
            <button className="rounded-xl bg-sky-400 py-2 px-4 text-xs font-semibold tracking-wider text-white hover:bg-sky-300 md:text-sm">
              Signup
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TopBar;
