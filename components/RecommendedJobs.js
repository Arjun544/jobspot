import React, { useContext, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import JobGridCard from "./JobGridCard";
import Lottie from "lottie-react";
import empty from "../public/empty.json";
import { AppContext } from "../pages/_app";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import ViewType from "./ViewType";
import JobListCard from "./JobListCard";
import Image from "next/image";
import { TiLocation } from "react-icons/ti";
import { AiFillClockCircle } from "react-icons/ai";
import { MdOutlineWork, MdEmail, MdGroup, MdReviews } from "react-icons/md";
import { toast } from "react-toastify";
import { applyJob, saveJob } from "../services/job_services";
import { ScaleLoader } from "react-spinners";
import { HiOfficeBuilding } from "react-icons/hi";

const RecommendedJobs = ({ isAllJobs = false }) => {
  const { filteredJobs } = useContext(AppContext);
  const { isAuth, user } = useSelector((state) => state.auth);
  const [viewType, setViewType] = useState("grid");
  const [selectedListJob, setSelectedListJob] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSave, setIsSave] = useState(
    isAuth
      ? filteredJobs[0]?.saveBy.map((item) => item.id).includes(user?.id)
      : false
  );
  const [isApplied, setIsApplied] = useState(
    isAuth
      ? filteredJobs[0]?.applicants.map((item) => item.id).includes(user?.id)
      : false
  );

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isAuth) {
      return toast.warning("Login to save job");
    }
    // Save & remove job
    try {
      isSave
        ? await saveJob(true, filteredJobs[selectedListJob].id, user.id)
        : await saveJob(false, filteredJobs[selectedListJob].id, user.id);
      toast.success(
        `${isSave ? "Unsaved successfully" : "Saved successfully"}`
      );
      isSave ? setIsSave(false) : setIsSave(true);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!isAuth) {
      return toast.warning("Login to apply for job");
    }
    try {
      setIsLoading(true);
      await applyJob(filteredJobs[selectedListJob].id, user.id);
      setIsLoading(false);
      toast.success("Applied for job successfully");
      setIsApplied(true);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex w-full flex-col overflow-hidden pl-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2 pb-3 md:pb-0">
          <span className="text-sm font-semibold tracking-wider md:text-base">
            {isAllJobs ? 'All Jobs' :isAuth ? "Jobs in your city" : "Recommended jobs"}
          </span>
          <span className="text-sm font-semibold tracking-wider text-slate-400 md:text-base">
            {filteredJobs.length}
          </span>
        </div>
        <ViewType viewType={viewType} setViewType={setViewType} />
      </div>
      {/* List of jobs */}
      {filteredJobs.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center pt-20">
          <div className="flex h-72 w-72 items-center justify-center">
            <Lottie animationData={empty} autoPlay={true} loop={true} />
          </div>
          <span className="font-semibold tracking-widest text-slate-300">
            No jobs found
          </span>
        </div>
      ) : viewType === "grid" ? (
        <div className="mt-5 grid h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobGridCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="mt-5 flex h-full w-full gap-4">
          {/* list */}
          <div className="flex w-full flex-col md:w-2/5">
            {filteredJobs.map((job, index) => (
              <JobListCard
                key={job.id}
                index={index}
                job={job}
                setSelectedListJob={setSelectedListJob}
              />
            ))}
          </div>
          {/*items details */}
          <div className="sticky hidden h-screen w-full flex-col gap-10 rounded-xl bg-slate-100 p-6 md:flex">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Image
                  className="rounded-full"
                  src={filteredJobs[selectedListJob].image}
                  alt="Image of job"
                  height={50}
                  width={50}
                />
                <div className="flex flex-col gap-2">
                  <span className="text-ellipsis text-xs font-semibold capitalize tracking-wider text-slate-500 line-clamp-2">
                    {filteredJobs[selectedListJob].company !== null
                      ? filteredJobs[selectedListJob].company.name
                      : filteredJobs[selectedListJob].createdBy.name}
                  </span>
                  <span className="text-ellipsis text-xs font-semibold capitalize tracking-wider line-clamp-2">
                    {filteredJobs[selectedListJob].title}
                  </span>
                  <span className="text-ellipsis text-xs font-semibold capitalize tracking-wider text-purple-500 line-clamp-2">
                    Pkr {filteredJobs[selectedListJob].salary}
                  </span>
                  {/* Industry */}
                  <div className="flex items-center gap-2">
                    <HiOfficeBuilding className="fill-purple-500" />
                    <span className="text-xs font-semibold capitalize tracking-wider text-slate-400">
                      {filteredJobs[selectedListJob].industry}
                    </span>
                  </div>

                  {/* Types */}
                  <div className="flex items-center gap-2">
                    <MdOutlineWork className="fill-purple-500" />
                    <div className="mr-6 rounded-lg bg-purple-200 px-3 py-1 text-[0.6rem] font-semibold text-purple-700">
                      {filteredJobs[selectedListJob].schedule}
                    </div>
                    <div className="mr-6 rounded-lg bg-green-200 px-2 py-1 text-[0.6rem] font-semibold text-green-700">
                      {filteredJobs[selectedListJob].type}
                    </div>
                    <div className="rounded-lg bg-blue-200 px-2 py-1 text-[0.6rem] font-semibold text-blue-700">
                      {filteredJobs[selectedListJob].level}
                    </div>
                  </div>
                  {/* Location */}
                  <div className="flex items-center gap-2">
                    <TiLocation className="fill-purple-500" />
                    <span className="text-xs font-semibold tracking-wider text-slate-400">
                      {filteredJobs[selectedListJob].location}
                    </span>
                  </div>
                  {/* Created At */}
                  <div className="flex items-center gap-2">
                    <AiFillClockCircle className="fill-purple-500" />
                    <span className="text-xs font-semibold capitalize tracking-wider text-slate-400">
                      {moment(filteredJobs[selectedListJob].createdAt).format(
                        "Do MMM YYYY"
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div
                onClick={(e) => handleSave(e)}
                className="flex cursor-pointer items-center justify-center rounded-lg p-2 hover:bg-slate-400"
              >
                {!isSave ? (
                  <BsBookmark />
                ) : (
                  <BsFillBookmarkFill className="fill-black" />
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="mb-3 text-ellipsis text-xs font-semibold capitalize tracking-wider line-clamp-2">
                Description
              </span>
              <p className="text-ellipsis text-sm text-slate-400">
                {filteredJobs[selectedListJob].description} Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Consequuntur repudiandae
                consequatur, assumenda necessitatibus voluptatum ex perferendis.
                Numquam corporis autem deleniti sit minima. Delectus, libero non
                accusamus autem ut officia ea? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Ad impedit doloremque dicta dolor
                illo iusto qui earum dolore! Quaerat cum natus quisquam
                aspernatur, nihil consequatur ducimus debitis animi fuga
                eveniet? Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Fuga molestiae adipisci voluptatibus eos vero facere unde
                error quod, minus sint possimus facilis eum esse cumque labore
                atque, officiis praesentium commodi.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {/* Applied */}
              <div className="flex items-center gap-2">
                <MdGroup />
                <span className="text-xs font-semibold tracking-wider text-slate-400">
                  {filteredJobs[selectedListJob].applicants.length}
                </span>
              </div>
              {/* Contacts */}
              <div className="flex items-center gap-2">
                <MdEmail />
                <span className="text-xs font-semibold tracking-wider text-slate-400">
                  {filteredJobs[selectedListJob].contact}
                </span>
              </div>
              {/* Rating */}
              <div className="flex items-center gap-2">
                <MdReviews />
                <span className="text-xs font-semibold tracking-wider text-slate-400">
                  {filteredJobs[selectedListJob].reviews.length}
                </span>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex w-full items-center justify-center">
              {isLoading ? (
                <ScaleLoader color="#00BFFF" loading={isLoading} />
              ) : (
                <button
                  onClick={(e) => handleApply(e)}
                  disabled={isApplied}
                  className="w-1/2 rounded-xl bg-sky-300 px-12 py-3 text-xs font-medium tracking-wider text-white hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {isApplied ? "Applied already" : "Apply"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendedJobs;
