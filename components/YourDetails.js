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
  cv,
  setCv,
}) => {
  return (
    <div className="mt-14 flex h-full w-full flex-col">
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
        className="mb-6 rounded-xl border-0 bg-slate-200 p-4 outline-none"
      ></textarea>
      <div className="flex flex-col items-center justify-between">
        <LocationInput
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          height="h-16"
          width={'w-full'}
        />
        <div className="w-full mt-6">
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
