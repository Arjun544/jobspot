import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import TopBar from "../../components/TopBar";
import Lottie from "lottie-react";
import login from "../../public/login.json";
import { getUser, updateCv, updateProfile } from "../../services/user_services";
import Image from "next/image";
import {
  BsFillFileEarmarkPdfFill,
  BsFillFileEarmarkPlusFill,
} from "react-icons/bs";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import { toast } from "react-toastify";
import FileSaver from "file-saver";
import { RiDownloadCloudFill, RiEditCircleFill } from "react-icons/ri";
import { ScaleLoader } from "react-spinners";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode
);

const Profile = ({ user }) => {
  const router = useRouter();
  const { isAuth } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.name);
  const [newProfile, setNewProfile] = useState(user.profile);
  const [isUpdatingCv, setIsUpdatingCv] = useState(false);
  const [newCV, setNewCV] = useState("");

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (username.length === 0 || newProfile.length < 1) {
      return toast.warn("Fields can't be empty");
    }
    try {
      setIsLoading(true);
      const { data } = await updateProfile(
        user.email,
        username,
        newProfile[0].getFileEncodeDataURL(),
        user.profileId
      );
      setIsLoading(false);
      if (data.success === false) {
        return toast.error(data.message);
      } else {
        toast.success("Profile updated successfully");
        setNewProfile("");
        setIsEditing(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleDownloadCV = (e) => {
    e.preventDefault();
    FileSaver.saveAs(user.cv, `${user.name}'s Cv`);
  };

  const handleCvUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await updateCv(
        user.email,
        newCV[0].getFileEncodeDataURL(),
        user.cvId
      );
      setIsLoading(false);
      if (data.success === false) {
        return toast.error(data.message);
      } else {
        toast.success("Cv updated successfully");
        setNewCV("");
        setIsUpdatingCv(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Profile - Jobspot</title>
        <meta
          name="Jobspot is a job listing platform, where you can create jobs and hire people as individual or as a company."
          content="Jobspot is a job listing platform, where you can create jobs and hire people as individual or as a company."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-screen bg-white">
        <TopBar />
        {/* If user not login */}
        {!isAuth ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex h-72 w-72 items-center justify-center">
              <Lottie animationData={login} autoPlay={true} loop={true} />
            </div>
            <span className="font-semibold tracking-widest text-slate-400">
              Login to view your profile
            </span>
          </div>
        ) : (
          <div className="m-auto flex w-2/3 flex-col gap-6 px-10 pt-80 md:px-16 md:pt-20">
            <span className="font-medium tracking-widest">Your Profile</span>
            <div className="flex items-center justify-between rounded-xl bg-slate-100 px-6 py-4 shadow-sm transition-all duration-500 ease-in-out">
              {!isEditing ? (
                <div className="flex items-center gap-6">
                  <Image
                    className="rounded-full"
                    src={user.profile}
                    alt="Image of user"
                    height={50}
                    width={50}
                  />
                  <span className="text-sm font-semibold capitalize tracking-wider">
                    {user.name}
                  </span>
                </div>
              ) : (
                <div className="flex w-full flex-col gap-6">
                  <input
                    value={username}
                    type="text"
                    placeholder="Username"
                    required
                    min={2}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-16 w-full rounded-xl border-0 bg-slate-200 px-4 text-sm text-black outline-none placeholder:text-sm placeholder:text-slate-400"
                  ></input>

                  <div className="w-full">
                    <FilePond
                      files={newProfile}
                      allowReorder={false}
                      allowMultiple={false}
                      onupdatefiles={setNewProfile}
                      allowFileTypeValidation={true}
                      allowFileEncode={true}
                      acceptedFileTypes={[
                        "image/png",
                        "image/jpeg",
                        "image/jpg",
                      ]}
                      labelIdle={
                        "Drag & Drop new Profile or <span class=filepond--label-action text-green-500 no-underline>Browse</span>"
                      }
                    />
                  </div>
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <ScaleLoader color="#00BFFF" loading={isLoading} />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-6">
                      <button
                        onClick={(e) => setIsEditing(false)}
                        className="text-sm font-semibold tracking-wider text-red-500 hover:text-red-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e) => handleSaveEdit(e)}
                        className="text-sm font-semibold tracking-wider text-green-500 hover:text-green-400"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              )}

              {!isEditing && (
                <RiEditCircleFill
                  onClick={(e) => setIsEditing(true)}
                  className="cursor-pointer fill-green-500 hover:fill-green-400"
                />
              )}
            </div>
            <div className="flex items-center justify-between">
              <div
                onClick={(e) =>
                  user.jobs.length > 0 &&
                  router.push(`/profile/jobs/${user.id}`)
                }
                className="flex cursor-pointer items-center gap-6 rounded-xl bg-slate-100 py-3 px-6 shadow-sm hover:bg-slate-200"
              >
                <span className="text-sm font-semibold capitalize tracking-wider text-slate-400">
                  My Jobs
                </span>
                <span className="text-xs font-semibold capitalize tracking-wider">
                  {user.jobs.length}
                </span>
              </div>
              <div
                onClick={(e) =>
                  user.company !== null &&
                  router.push(`/profile/company/${user.id}`)
                }
                className="flex cursor-pointer items-center gap-6 rounded-xl bg-slate-100 py-3 px-6 shadow-sm hover:bg-slate-200"
              >
                <span className="text-sm font-semibold capitalize tracking-wider text-slate-400">
                  My Company
                </span>
                <span className="text-xs font-semibold capitalize tracking-wider">
                  {user.company ? "1" : "0"}
                </span>
              </div>
              <div
                onClick={(e) => router.push(`/profile/applied/${user.id}`)}
                className="flex cursor-pointer items-center gap-6 rounded-xl bg-slate-100 py-3 px-6 shadow-sm hover:bg-slate-200"
              >
                <span className="text-sm font-semibold capitalize tracking-wider text-slate-400">
                  Applied jobs
                </span>
              </div>
            </div>
            {/* CV */}
            <div
              className={`flex flex-col ${
                isUpdatingCv ? "h-52" : "h-20"
              } w-full items-center justify-center gap-6 rounded-xl bg-slate-100 px-6 shadow-sm transition-all duration-1000 ease-in-out`}
            >
              <div className="flex w-full items-center justify-between">
                <BsFillFileEarmarkPdfFill className="h-12 w-12 fill-slate-300" />
                <span className="text-sm font-semibold tracking-wider text-slate-400">
                  {user.name} cv.pdf
                </span>
                {isUpdatingCv ? (
                  <div className="flex items-center gap-4">
                    <RiDownloadCloudFill
                      onClick={(e) => handleDownloadCV(e)}
                      className="cursor-pointer fill-green-500 hover:fill-green-400"
                      fontSize={25}
                    />
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <ScaleLoader color="#00BFFF" loading={isLoading} />
                      </div>
                    ) : (
                      <button
                        onClick={(e) => handleCvUpdate(e)}
                        disabled={newCV.length < 1 ? true : false}
                        className="text-sm font-semibold tracking-wider text-green-500 hover:text-green-400 disabled:cursor-not-allowed disabled:text-slate-300"
                      >
                        Update
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <RiDownloadCloudFill
                      onClick={(e) => handleDownloadCV(e)}
                      className="cursor-pointer fill-green-500 hover:fill-green-400"
                      fontSize={25}
                    />
                    <BsFillFileEarmarkPlusFill
                      onClick={() => setIsUpdatingCv(true)}
                      className="h-5 w-5 cursor-pointer text-black hover:text-green-500"
                    />
                  </div>
                )}
              </div>
              {isUpdatingCv && (
                <div className="w-full">
                  <FilePond
                    files={newCV}
                    allowReorder={false}
                    allowMultiple={false}
                    onupdatefiles={setNewCV}
                    allowFileTypeValidation={true}
                    allowFileEncode={true}
                    acceptedFileTypes={[
                      "application/pdf",
                      "image/png",
                      "image/jpeg",
                      "image/jpg",
                    ]}
                    labelIdle={
                      "Drag & Drop new Cv or <span class=filepond--label-action text-green-500 no-underline>Browse</span>"
                    }
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const userId = params.userId;
  const { data } = await getUser(userId);

  return {
    props: {
      user: data.user,
    },
  };
}
