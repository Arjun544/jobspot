import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { ProgressIndicator, ProgressStep } from "react-rainbow-components";
import YourDetails from "../components/YourDetails";
import ApplyAs from "../components/ApplyAs";
import { useRefreshToken } from "../helpers/useRefreshToken";
import { toast } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import { updateUser } from "../services/user_services";
import { useSelector } from "react-redux";

const Apply = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setcurrentTab] = useState(1);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [details, setDetails] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cv, setCv] = useState("");
  const stepNames = ["step-1", "step-2"];
  const hasPrevPage = router.query ? true : false;

  useEffect(() => {
    if (!hasPrevPage) {
      router.push("/");
    }
  }, [hasPrevPage, router]);

  const handleNextClick = async () => {
    if (details.length === 0 || selectedCity === "" || cv.length < 1) {
      return toast.warn("Please fill all the fields");
    } else if (currentStepIndex < stepNames.length - 1) {
      const nextStepIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextStepIndex);
    } else {
      try {
        setIsLoading(true);
        const data = {
          details,
          city: selectedCity,
          cv: cv,
        };
        await updateUser(user.email,data );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        toast.error(error.message);
      }
    }
  };

  const handlePrevClick = () => {
    if (currentStepIndex > 0) {
      const previewStepIndex = currentStepIndex - 1;
      setCurrentStepIndex(previewStepIndex);
    }
  };

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
    <div className="flex h-screen w-screen flex-col bg-white px-20 py-6">
      <div className="flex items-center justify-between">
        <span className="font-semibold tracking-wider text-black">
          Let us know more about you
        </span>
        <button className="rounded-lg bg-green-400 px-6 py-2 text-sm font-semibold tracking-wider shadow hover:bg-green-500">
          Save
        </button>
      </div>
      <div className="rainbow-m-bottom_large rainbow-m-top_xx-large rainbow-p-bottom_large mt-6">
        <ProgressIndicator currentStepName={stepNames[currentStepIndex]}>
          <ProgressStep name="step-1" label="Your details" />
          <ProgressStep name="step-2" label="Apply as" />
        </ProgressIndicator>
        {currentStepIndex === 0 ? (
          <YourDetails
            setDetails={setDetails}
            details={details}
            setSelectedCity={setSelectedCity}
            selectedCity={selectedCity}
            setCv={setCv}
            cv={cv}
          />
        ) : (
          <ApplyAs />
        )}
        {isLoading ? (
          <div className="flex items-center justify-center">
            <ScaleLoader color="#00BFFF" loading={isLoading} />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevClick}
              className="rounded-lg bg-slate-400 py-2 px-4 text-sm tracking-wider text-white hover:bg-slate-500"
            >
              Previous
            </button>
            <button
              onClick={handleNextClick}
              className="rounded-lg bg-green-400 py-2 px-7 text-sm tracking-wider text-white hover:bg-green-500"
            >
              Next
            </button>
          </div>
        )}
      </div>
      {/* <div className="mt-4 mb-6 flex items-center justify-center gap-6">
        <span className="text-sm font-semibold tracking-wider text-black">
          Apply as
        </span>
        <div className="flex h-16 w-72 gap-2 rounded-2xl bg-slate-100">
          <div
            onClick={() => setcurrentTab(1)}
            className={`m-2 flex w-full cursor-pointer items-center justify-center rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 ${
              currentTab === 1 ? "bg-sky-500 text-white" : "bg-slate-100"
            }`}
          >
            Individual
          </div>
          <div
            onClick={() => setcurrentTab(2)}
            className={`m-2 flex w-full cursor-pointer items-center justify-center rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 ${
              currentTab === 2 ? "bg-sky-500 text-white" : "bg-slate-100"
            }`}
          >
            Company
          </div>
        </div>
      </div>
      
      */}
    </div>
  );
};

export default Apply;
