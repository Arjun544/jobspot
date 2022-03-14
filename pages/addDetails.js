import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { ProgressIndicator, ProgressStep } from "react-rainbow-components";
import YourDetails from "../components/YourDetails";
import ApplyAs from "../components/ApplyAs";
import { useRefreshToken } from "../helpers/useRefreshToken";
import { toast } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import { updateCompany, updateUser } from "../services/user_services";
import { useSelector } from "react-redux";

const Apply = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(1);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [details, setDetails] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cv, setCv] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companySize, setCompanySize] = useState(1);
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [companyImage, setCompanyImage] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");
  const stepNames = ["step-1", "step-2"];
  const hasPrevPage = router.query ? true : false;

  useEffect(() => {
    if (!hasPrevPage) {
      router.push("/");
    }
  }, [hasPrevPage, router]);

  const handleNextClick = async (e) => {
    e.preventDefault();
    if (currentStepIndex < stepNames.length - 1) {
      if (details.length === 0 || selectedCity === "" || cv.length < 1) {
        return toast.warn("Please fill all the fields");
      } else {
        try {
          setIsLoading(true);
          const data = {
            email: user.email,
            details,
            city: selectedCity,
            // cv: JSON.stringify(cv[0].getFileEncodeDataURL()),
          };
          await updateUser(data);
          setIsLoading(false);
          const nextStepIndex = currentStepIndex + 1;
          setCurrentStepIndex(nextStepIndex);
        } catch (error) {
          setIsLoading(false);
          console.log(error);
          toast.error(error.message);
        }
      }
    } else {
      //if applying as individual, navigate to home page
      if (currentTab === 1) {
        router.push("/");
      } else {
        if (
          companyName.length === 0 ||
          companyWebsite.length === 0 ||
          companySize === 0 ||
          companyIndustry.length === 0 ||
          companyImage.length < 1 ||
          companyDetails.length === 0
        ) {
          return toast.warn("Please fill all the fields");
        }
        try {
          setIsLoading(true);
          const company = {
            name: companyName,
            website: companyWebsite,
            size: companySize,
            industry: companyIndustry,
            city: companyCity,
            image: '',
            details: companyDetails,
            // image: JSON.stringify(companyImage[0].getFileEncodeDataURL()),
          };
          await updateCompany(user.email, company);
          setIsLoading(false);
          router.push("/");
        } catch (error) {
          setIsLoading(false);
          console.log(error);
          toast.error(error.message);
        }
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
      <span className="font-semibold tracking-wider text-black">
        Let us know more about you
      </span>
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
          <ApplyAs
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            companyName={companyName}
            setCompanyName={setCompanyName}
            companyWebsite={companyWebsite}
            setCompanyWebsite={setCompanyWebsite}
            companyImage={companyImage}
            setCompanyImage={setCompanyImage}
            companySize={companySize}
            setCompanySize={setCompanySize}
            companyIndustry={companyIndustry}
            setCompanyIndustry={setCompanyIndustry}
            companyCity={companyCity}
            setCompanyCity={setCompanyCity}
            companyDetails={companyDetails}
            setCompanyDetails={setCompanyDetails}
          />
        )}
        {isLoading ? (
          <div className="flex items-center justify-center pb-8">
            <ScaleLoader color="#00BFFF" loading={isLoading} />
          </div>
        ) : (
          <div className="flex items-center justify-center bg-red-500 gap-4 pb-8">
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
              {currentStepIndex === 0 ? "Next" : "Save"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Apply;
