import Image from "next/image";
import Lottie from "lottie-react";
import empty from "../public/empty.json";
import React, { useRef } from "react";
import { MdClose } from "react-icons/md";
import { RiDownloadCloud2Line } from "react-icons/ri";
import FileSaver from "file-saver";
import { useOnClickOutside } from "usehooks-ts";

const ApplicantsDialogue = ({ applicants, setIsApplicantsOpen }) => {
  const ref = useRef();
  const handleClickOutside = () => {
    setIsDialogueOpen(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  const handleDownloadCV = (e, applicant) => {
    e.preventDefault();
    FileSaver.saveAs(applicant.cv, `${applicant.name}'s Cv`);
  };

  return (
    <div className="absolute z-40 h-screen w-full overflow-hidden bg-amber-50 bg-opacity-10 backdrop-blur-sm backdrop-filter">
      <div
        ref={ref}
        className="absolute right-0 left-0 top-0 bottom-0 z-50 m-auto flex h-3/4 w-3/4 flex-col justify-between overflow-hidden rounded-xl bg-slate-100 py-8 px-10"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tracking-wider">
            Applicants of this job ({applicants.length})
          </span>
          <MdClose
            onClick={() => setIsApplicantsOpen(false)}
            className="cursor-pointer"
          />
        </div>
        <div className="my-4 flex h-full w-full flex-col items-start overflow-y-auto">
          {applicants.length === 0 ? (
            <div className="flex h-full w-full flex-col items-center pt-20">
              <div className="flex h-72 w-72 items-center justify-center">
                <Lottie animationData={empty} autoPlay={true} loop={true} />
              </div>
              <span className="font-semibold tracking-widest text-slate-300">
                No Applicants yet
              </span>
            </div>
          ) : (
            applicants.map((applicant) => (
              <div
                key={applicant.id}
                className="mb-4 flex h-16 w-full items-center justify-around rounded-xl bg-white"
              >
                <Image
                  className="rounded-full"
                  src={applicant.profile}
                  alt="Image of applicant"
                  height={50}
                  width={50}
                />
                <span className="text-xs font-medium capitalize tracking-wider">
                  {applicant.name}
                </span>
                <span className="text-xs font-medium capitalize  tracking-wider">
                  {applicant.email}
                </span>
                <span className="text-xs font-medium capitalize  tracking-wider">
                  {applicant.city}
                </span>
                <button
                  onClick={(e) => handleDownloadCV(e, applicant)}
                  className="flex items-center gap-3 rounded-xl bg-green-400 px-4 py-2 hover:bg-green-300"
                >
                  <RiDownloadCloud2Line fill="#fff" />
                  <span className="text-xs font-medium capitalize tracking-wider text-white">
                    CV
                  </span>
                </button>
              </div>
            ))
          )}
        </div>
        {/* Buttons */}
        <div className="flex w-full items-center justify-end gap-6">
          <button
            onClick={() => setIsApplicantsOpen(false)}
            className="text-xs font-semibold tracking-wider text-red-500 hover:text-red-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsDialogue;
