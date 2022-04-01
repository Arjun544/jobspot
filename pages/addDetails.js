import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import YourDetails from "../components/YourDetails";
import ApplyAs from "../components/ApplyAs";

import { toast } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import { updateUser } from "../services/user_services";
import { createCompany } from "../services/company_services";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../redux/reducers/authSlice";

const Apply = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(1);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [details, setDetails] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [profile, setProfile] = useState("");
  const [cv, setCv] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companySize, setCompanySize] = useState(0);
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [companyContact, setCompanyContact] = useState("");
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
    e.stopPropagation();
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
            profile: profile[0].getFileEncodeDataURL(),
            cv: cv[0].getFileEncodeDataURL(),
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
            size: Number(companySize),
            industry: companyIndustry,
            city: companyCity,
            contact: companyContact,
            details: companyDetails,
          };
          const { data } = await createCompany(
            user,
            company,
            companyImage[0].getFileEncodeDataURL()
          );
          // Add user to redux
          if (data.success === true) {
            dispatch(
              setAuth({
                auth: data.auth,
                user: data.user,
              })
            );

            router.push("/");
          }
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

  const handlePrevClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (currentStepIndex > 0) {
      const previewStepIndex = currentStepIndex - 1;
      setCurrentStepIndex(previewStepIndex);
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-white px-10 py-6 md:px-20">
      <span className="mb-6 text-center font-semibold tracking-wider text-black">
        Let us know more about you
      </span>
      <div className="mt-6 flex flex-col">
        <div className="flex items-center justify-center gap-2">
          <div
            className={`h-5 w-5 rounded-full ${
              currentStepIndex === 0
                ? "border-2 border-black bg-green-400"
                : "bg-sky-200"
            } `}
          ></div>
          <div className="h-1 w-1/3 rounded-lg bg-sky-200"></div>
          <div
            className={`h-5 w-5 rounded-full ${
              currentStepIndex === 1
                ? "border-2 border-black bg-green-400"
                : "bg-sky-200"
            } `}
          ></div>
        </div>
        <div className="mt-1 flex items-center justify-center px-10">
          <span className="text-xs">Your details</span>
          <div className="h-1 w-1/3 rounded-lg bg-transparent"></div>
          <span className="text-xs">Apply as</span>
        </div>
        {currentStepIndex === 0 ? (
          <YourDetails
            setDetails={setDetails}
            details={details}
            setSelectedCity={setSelectedCity}
            selectedCity={selectedCity}
            profile={profile}
            setProfile={setProfile}
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
            companyContact={companyContact}
            setCompanyContact={setCompanyContact}
            setCompanyCity={setCompanyCity}
            companyDetails={companyDetails}
            setCompanyDetails={setCompanyDetails}
          />
        )}
        {isLoading ? (
          <div className="flex items-center justify-center pt-8">
            <ScaleLoader color="#00BFFF" loading={isLoading} />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4 py-8">
            <button
              onClick={(e) => handlePrevClick(e)}
              className="rounded-lg bg-slate-400 py-2 px-4 text-sm tracking-wider text-white hover:bg-slate-500"
            >
              Previous
            </button>
            <button
              onClick={(e) => handleNextClick(e)}
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
