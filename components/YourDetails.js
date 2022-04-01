import React, { useState } from "react";
import LocationInput from "./LocationInput";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode
);

const YourDetails = ({
  details,
  setDetails,
  selectedCity,
  setSelectedCity,
  profile,
  setProfile,
  cv,
  setCv,
}) => {
  return (
    <div className="mt-14 flex h-full w-full lg:w-1/2 flex-col items-center justify-center">
      <textarea
        value={details}
        name="details"
        id="details"
        cols="20"
        rows="5"
        draggable={false}
        style={{ resize: "none" }}
        placeholder="Your details"
        required
        onChange={(e) => setDetails(e.target.value)}
        className="mb-6 rounded-xl w-full border-0 bg-slate-200 p-4 outline-none"
      ></textarea>
      <div className="flex flex-col items-center justify-between w-full">
        <LocationInput
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          height="h-16"
          width={"w-full"}
        />
        <div className="mt-6 w-full">
          <FilePond
            files={profile}
            allowReorder={false}
            allowMultiple={false}
            onupdatefiles={setProfile}
            allowFileTypeValidation={true}
            allowFileEncode={true}
            acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
            labelIdle={
              "Drag & Drop your profile or <span class=filepond--label-action text-green-500 no-underline>Browse</span>"
            }
          />
        </div>
        <div className="mt-6 w-full">
          <FilePond
            files={cv}
            allowReorder={false}
            allowMultiple={false}
            onupdatefiles={setCv}
            allowFileTypeValidation={true}
            allowFileEncode={true}
            acceptedFileTypes={["application/pdf"]}
            labelIdle={
              "Drag & Drop Cv or <span class=filepond--label-action text-green-500 no-underline>Browse</span>"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default YourDetails;
