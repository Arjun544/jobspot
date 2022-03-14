import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TopBar from "../components/TopBar";
import { useRefreshToken } from "../helpers/useRefreshToken";

const PostJob = () => {
  // call refresh endpoint
  const { loading } = useRefreshToken();
  const router = useRouter();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuth) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

export default PostJob;
