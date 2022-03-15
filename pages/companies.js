import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TopBar from "../components/TopBar";
import { useRefreshToken } from "../helpers/useRefreshToken";

const Companies = () => {
  // call refresh endpoint
  const { loading } = useRefreshToken();
  const router = useRouter();
  const { isAuth, user } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="animate-pulse text-xl font-semibold tracking-widest">
          Loading....
        </span>
      </div>
    );
  }
  return (
    <div className="h-screen w-screen bg-white">
      <TopBar />
    </div>
  );
};

export default Companies;
