import Head from "next/head";
import TopBar from "../components/TopBar";
import SearchSection from "../components/SearchSection";
import { getAllJobs } from "../services/job_services";
import Filters from "../components/Filters";
import RecommendedJobs from "../components/RecommendedJobs";

function Home({ jobs }) {
  return (
    <>
      <Head>
        <title>Home - Jobspot</title>
        <meta
          name="Jobspot is a job listing platform, where you can create jobs and hire people as individual or as a company."
          content="Jobspot is a job listing platform, where you can create jobs and hire people as individual or as a company."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-slate-50">
        <TopBar />
        <SearchSection />

        <div className="flex h-screen px-6 pt-96 md:px-16 md:pt-40">
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
