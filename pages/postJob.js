import Lottie from "lottie-react";
import login from "../public/login.json";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TopBar from "../components/TopBar";
import { createJob } from "../services/job_services";
import CustomDropDown from "../components/CustomDropDown";
import LocationInput from "../components/LocationInput";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import Head from "next/head";

const PostJob = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const [isLoading, setIsloading] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [title, setTitle] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [salary, setSalary] = useState(0);
  const [city, setCity] = useState("");
  const [industry, setIndustry] = useState("");
  const [contact, setContact] = useState("");
  const [details, setDetails] = useState("");

  const handleCreateJob = async () => {
    // Check if all fields are filled
    if (
      title === "" ||
      selectedSchedule === "" ||
      selectedType === "" ||
      selectedLevel === "" ||
      salary === 0 ||
      city === "" ||
      industry === "" ||
      contact === "" ||
      details === ""
    ) {
      toast.warn("Please fill all fields");
      return;
    }
    const job = {
      title,
      schedule: selectedSchedule,
      type: selectedType,
      level: selectedLevel,
      salary,
      location: city,
      industry,
      contact,
      description: details,
    };
    try {
      setIsloading(true);
      const { data } =
        currentTab === 0
          ? await createJob("individual", user, job, user.companyId)
          : await createJob("company", user, job, user.companyId);
      setIsloading(false);
      if (data.success === true) {
        setTitle("");
        setSelectedSchedule("");
        setSelectedType("");
        setSelectedLevel("");
        setSalary(0);
        setCity("");
        setIndustry("");
        setContact("");
        setDetails("");
        return toast.success("Job created successfully");
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Post Job - Jobspot</title>
        <meta
          name="Jobspot is a job listing platform, where you can create jobs and hire people as individual or as a company."
          content="Jobspot is a job listing platform, where you can create jobs and hire people as individual or as a company."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-screen bg-white">
        <TopBar />
        {/* If user not login */}
        {!isAuth && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex h-72 w-72 items-center justify-center">
              <Lottie animationData={login} autoPlay={true} loop={true} />
            </div>
            <span className="font-semibold tracking-widest text-slate-400">
              Login to create job
            </span>
          </div>
        )}
        <div className="flex flex-col px-10 pt-20">
          <div className="mt-4 mb-6 items-center justify-between md:flex">
            {/* Tabbar*/}
            {user?.companyId === null ? (
              <span className="text-sm font-semibold tracking-wider text-black">
                Creating job as individual
              </span>
            ) : (
              <div className="flex items-center justify-center gap-6">
                <span className="text-sm font-semibold tracking-wider text-black">
                  Create job as
                </span>
                <div className="flex h-16 w-72 gap-2 rounded-2xl bg-slate-100">
                  <div
                    onClick={() => setCurrentTab(0)}
                    className={`m-2 flex w-full cursor-pointer items-center justify-center rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 ${
                      currentTab === 0
                        ? "bg-sky-500 text-white"
                        : "bg-slate-100"
                    }`}
                  >
                    Individual
                  </div>
                  <div
                    onClick={() => setCurrentTab(1)}
                    className={`m-2 flex w-full cursor-pointer items-center justify-center rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 ${
                      currentTab === 1
                        ? "bg-sky-500 text-white"
                        : "bg-slate-100"
                    }`}
                  >
                    Company
                  </div>
                </div>
              </div>
            )}
            {/* Button */}
            {isLoading ? (
              <ScaleLoader color="#00BFFF" loading={isLoading} />
            ) : (
              <button
                onClick={(e) => handleCreateJob(e)}
                className="mt-6 rounded-xl bg-green-400 px-10 py-3 text-sm font-semibold tracking-widest text-white shadow hover:bg-green-300 md:mt-0"
              >
                Post
              </button>
            )}
          </div>
          {/* Tab content */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-4 md:flex md:flex-row">
              <input
                value={title}
                type="text"
                placeholder="Job title"
                autoComplete="off"
                onChange={(e) => setTitle(e.target.value)}
                className="h-16 w-full rounded-xl border-0 bg-slate-200 pl-4 text-sm text-black outline-none placeholder:text-sm placeholder:text-slate-400"
              ></input>
              <CustomDropDown
                hint={"Select schedule"}
                items={[
                  "Full time",
                  "Part time",
                  "Project work",
                  "Volunteering",
                  "Internship",
                ]}
                selectedItem={selectedSchedule}
                setSelectedItem={setSelectedSchedule}
              />
            </div>
            <div className="flex flex-col items-center gap-4 md:flex md:flex-row">
              <CustomDropDown
                hint={"Select type"}
                items={[
                  "Full day",
                  "Shift work",
                  "Flexible schedule",
                  "Remote",
                  "Shift method",
                ]}
                selectedItem={selectedType}
                setSelectedItem={setSelectedType}
              />
              <CustomDropDown
                hint={"Select level"}
                items={[
                  "Tainee level",
                  "Junior level",
                  "Middle level",
                  "Senior level",
                  "Director level",
                ]}
                selectedItem={selectedLevel}
                setSelectedItem={setSelectedLevel}
              />
            </div>
            <div className="flex flex-col items-center gap-4 md:flex md:flex-row">
              <input
                value={salary}
                type="number"
                placeholder="Salary"
                autoComplete="off"
                min={0}
                onChange={(e) => setSalary(e.target.value)}
                className="h-16 w-full rounded-xl border-0 bg-slate-200 px-4 text-sm text-black outline-none placeholder:text-sm placeholder:text-slate-400"
              ></input>
              <LocationInput
                selectedCity={city}
                setSelectedCity={setCity}
                height="h-16"
                width={"w-full"}
              />
            </div>
            <div className="flex flex-col items-center gap-4 md:flex md:flex-row">
              <input
                value={industry}
                type="text"
                placeholder="Industry"
                autoComplete="off"
                onChange={(e) => setIndustry(e.target.value)}
                className="h-16 w-full rounded-xl border-0 bg-slate-200 pl-4 text-sm text-black outline-none placeholder:text-sm placeholder:text-slate-400"
              ></input>
              <input
                value={contact}
                type="text"
                placeholder="Email/Contact"
                autoComplete="off"
                onChange={(e) => setContact(e.target.value)}
                className="h-16 w-full rounded-xl border-0 bg-slate-200 pl-4 text-sm text-black outline-none placeholder:text-sm placeholder:text-slate-400"
              ></input>
            </div>
            <textarea
              value={details}
              name="details"
              id="details"
              cols="20"
              rows="5"
              draggable={false}
              style={{ resize: "none" }}
              placeholder="Description"
              required
              onChange={(e) => setDetails(e.target.value)}
              className="mb-6 rounded-xl border-0 bg-slate-200 p-4 outline-none"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostJob;
