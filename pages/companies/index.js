import Head from "next/head";
import Lottie from "lottie-react";
import empty from "../../public/empty.json";
import TopBar from "../../components/TopBar";
import SearchSection from "../../components/SearchSection";
import CompanyGridCard from "../../components/CompanyGridCard";
import { getAllCompanies } from "../../services/company_services";
import { useSelector } from "react-redux";

function Companies({ companies }) {
  const { isAuth, user } = useSelector((state) => state.auth);

  return (
    <div>
      <Head>
        <title>Companies - Jobspot</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white">
        <TopBar />
        <SearchSection />

        <div className="flex h-screen w-full flex-col px-6 pt-96 md:px-16 md:pt-44">
          <div className="flex items-center gap-2 pb-3 md:pb-0">
            <span className="text-sm font-semibold tracking-wider md:text-base">
              All Companies
            </span>
            <span className="text-sm font-semibold tracking-wider text-slate-400 md:text-base">
              {isAuth
                ? companies.filter((item) => item.userId !== user.id).length
                : companies.length}
            </span>
          </div>

          {/* List of companies */}
          {companies.length === 0 ? (
            <div className="flex h-full w-full flex-col items-center pt-20">
              <div className="flex h-72 w-72 items-center justify-center">
                <Lottie animationData={empty} autoPlay={true} loop={true} />
              </div>
              <span className="font-semibold tracking-widest text-slate-300">
                No Company found
              </span>
            </div>
          ) : (
            <div className="mt-5 grid h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {isAuth
                ? companies
                    .map((company) => (
                      <CompanyGridCard key={company.id} company={company} />
                    ))
                : companies.map((company) => (
                    <CompanyGridCard key={company.id} company={company} />
                  ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { data } = await getAllCompanies();

  return {
    props: {
      companies: data.companies,
    },
  };
}

export default Companies;
