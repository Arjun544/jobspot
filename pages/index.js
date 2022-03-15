import Head from "next/head";
import TopBar from "../components/TopBar";
import SearchSection from "../components/SearchSection";
import { useRefreshToken } from "../helpers/useRefreshToken";
import { getAllJobs } from "../services/job_services";
import Filters from "../components/Filters";
import RecommendedJobs from "../components/RecommendedJobs";

function Home({jobs}) {
  // call refresh endpoint
  const { loading } = useRefreshToken();

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
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-slate-100">
        <TopBar />
        <SearchSection />

        <div className="flex px-16 pt-8">
          {/* filters */}
          <Filters jobs={jobs} />
          <RecommendedJobs jobs={jobs} />
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
