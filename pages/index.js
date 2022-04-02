import Head from "next/head";
import TopBar from "../components/TopBar";
import SearchSection from "../components/SearchSection";
import { getAllJobs } from "../services/job_services";
import Filters from "../components/Filters";
import RecommendedJobs from "../components/RecommendedJobs";
import { useSelector } from "react-redux";

function Home({ jobs }) {
  return (
    <>
      <Head>
        <title>Home - Jobspot</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-slate-50">
        <TopBar />
        <SearchSection />

        <div className="flex px-6 pt-80 md:px-16 md:pt-40">
          {/* filters */}
          <Filters jobs={jobs} />
          <RecommendedJobs />
        </div>
      </main>
    </>
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
