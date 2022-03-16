import Head from "next/head";
import TopBar from "../components/TopBar";
import SearchSection from "../components/SearchSection";
import { useRefreshToken } from "../helpers/useRefreshToken";
import { getAllJobs } from "../services/job_services";
import Filters from "../components/Filters";
import RecommendedJobs from "../components/RecommendedJobs";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { filterRecommendedJobs } from "../helpers/helpers";
import { useCallback } from "react";

function Home({ jobs }) {
  // call refresh endpoint
  const { loading } = useRefreshToken();
  const { isAuth, user } = useSelector((state) => state.auth);

  // const recommendedJobs = useCallback(() => {
  //   return filterRecommendedJobs(jobs);
  // }, [jobs]);

  // // Returns the jobs where job location is same as current user location
  // const locationBasedJobs = useCallback(() => {
  //   return isAuth && jobs.filter((job) => job.location === user.city);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [jobs, isAuth]);

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
    <div>
      <Head>
        <title>Home - Jobspot</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-slate-100 ">
        <TopBar />
        <SearchSection />

        <div className="flex px-6 pt-80 md:px-16 md:pt-44">
          {/* filters */}
          <Filters jobs={jobs} />
          <RecommendedJobs
            jobs={isAuth ? locationBasedJobs : recommendedJobs}
          />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { data } = await getAllJobs();

  return {
    props: {
      jobs: data.jobs,
    },
  };
}

export default Home;
