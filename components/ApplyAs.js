import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import LocationInput from "./LocationInput";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode
);

const ApplyAs = ({
  currentTab,
  setCurrentTab,
  companyName,
  setCompanyName,
  companyWebsite,
  setCompanyWebsite,
  companyImage,
  setCompanyImage,
  companySize,
  setCompanySize,
  companyIndustry,
  setCompanyIndustry,
  companyCity, setCompanyCity,
  companyDetails,
  setCompanyDetails,
}) => {
  return (
    <div className="mt-14 flex h-full w-full flex-col">
      <div className="mt-4 mb-6 flex items-center justify-center gap-6">
        <span className="text-sm font-semibold tracking-wider text-black">
          Apply for job posting as
        </span>
        <div className="flex h-16 w-72 gap-2 rounded-2xl bg-slate-100">
          <div
            onClick={() => setCurrentTab(1)}
            className={`m-2 flex w-full cursor-pointer items-center justify-center rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 ${
              currentTab === 1 ? "bg-sky-500 text-white" : "bg-slate-100"
            }`}
          >
            Individual
          </div>
          <div
            onClick={() => setCurrentTab(2)}
            className={`m-2 flex w-full cursor-pointer items-center justify-center rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 ${
              currentTab === 2 ? "bg-sky-500 text-white" : "bg-slate-100"
            }`}
          >
            Company
          </div>
        </div>
      </div>
      {currentTab === 2 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <input
              value={companyName}
              type="text"
              placeholder="Company name"
              required
              min={2}
              autoComplete="off"
              onChange={(e) => setCompanyName(e.target.value)}
              className="h-16 w-full rounded-xl border-0 bg-slate-200 pl-4 text-sm text-black outline-none placeholder:text-sm placeholder:text-slate-400"
            ></input>
            <input
              value={companyWebsite}
              type="text"
              placeholder="Company website"
              required
              min={2}
              autoComplete="off"
              onChange={(e) => setCompanyWebsite(e.target.value)}
              className="h-16 w-full rounded-xl border-0 bg-slate-200 px-4 text-sm text-black outline-none placeholder:text-sm placeholder:text-slate-400"
            ></input>
          </div>
          <div className="flex items-center gap-4">
            <input
              value={companySize}
              type="number"
              placeholder="Company size"
              required
              min={1}
              autoComplete="off"
              onChange={(e) => setCompanySize(e.target.value)}
              className="h-16 w-full rounded-xl border-0 bg-slate-200 px-4 text-sm text-black outline-none placeholder:text-sm placeholder:text-slate-400"
            ></input>
            <input
              value={companyIndustry}
              type="text"
              placeholder="Company industry"
              required
              min={2}
              autoComplete="off"
              onChange={(e) => setCompanyIndustry(e.target.value)}
              className="h-16 w-full rounded-xl border-0 bg-slate-200 px-4 text-sm text-black outline-none placeholder:text-sm placeholder:text-slate-400"
            ></input>
          </div>
          <LocationInput
            selectedCity={companyCity}
            setSelectedCity={setCompanyCity}
            height="16"
          />
          <textarea
            value={companyDetails}
            name="details"
            id="details"
            cols="20"
            rows="5"
            draggable={false}
            style={{ resize: "none" }}
            placeholder="Your details"
            required
            onChange={(e) => setCompanyDetails(e.target.value)}
            className="mb-6 rounded-xl bg-slate-200 p-4 outline-none"
          ></textarea>
          <div className="mt-3 w-full">
            <FilePond
              files={companyImage}
              allowReorder={false}
              allowMultiple={false}
              onupdatefiles={setCompanyImage}
              allowFileTypeValidation={true}
              allowFileEncode={true}
              acceptedFileTypes={["image/png", "image/jpeg"]}
              labelIdle={
                "Drag & Drop company image or <span class=filepond--label-action text-green-500 no-underline>Browse</span>"
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyAs;
