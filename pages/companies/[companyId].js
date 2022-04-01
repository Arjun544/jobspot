import React, { useState } from "react";
import moment from "moment";
import Lottie from "lottie-react";
import empty from "../../public/empty.json";
import Image from "next/image";
import { TiLocation } from "react-icons/ti";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";
import { MdOutlineWork, MdEmail, MdGroup, MdReviews } from "react-icons/md";
import TopBar from "../../components/TopBar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import CommentDialogue from "../../components/CommentDialogue";
import CommentSection from "../../components/CommentSection";
import { HiOfficeBuilding } from "react-icons/hi";
import { getCompany, saveCompany } from "../../services/company_services";

const CompanyDetails = ({ company }) => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isSave, setIsSave] = useState(
    isAuth ? company?.saveBy.map((item) => item.id).includes(user?.id) : false
  );
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [comment, setComment] = useState("");

  console.log(company);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isAuth) {
      return toast.warning("Login to save company");
    }
    // Save & remove company
    try {
      isSave
        ? await saveCompany(true, company.id, user.id)
        : await saveCompany(false, company.id, user.id);
      toast.success(
        `${isSave ? "Unsaved successfully" : "Saved successfully"}`
      );
      isSave ? setIsSave(false) : setIsSave(true);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <TopBar />
      {/* Write comment dialogue */}
      {isDialogueOpen && (
        <CommentDialogue
          jobId={company.id}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          comment={comment}
          setComment={setComment}
          setIsDialogueOpen={setIsDialogueOpen}
        />
      )}
      {!company ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex h-72 w-72 items-center justify-center">
            <Lottie animationData={empty} autoPlay={true} loop={true} />
          </div>
          <span className="font-semibold tracking-widest text-slate-300">
            No company found
          </span>
        </div>
      ) : (
        <div className="sticky flex h-screen w-full flex-col gap-10 rounded-xl bg-white px-4 pt-20 md:px-16">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Image
                className="rounded-full"
                src={company.image}
                alt="Image of company"
                height={50}
                width={50}
              />
              <div className="flex flex-col gap-2">
                <span className="text-ellipsis text-xs font-semibold capitalize tracking-wider text-slate-500 line-clamp-2">
                  {company.name}
                </span>

                {/* Industry */}
                <div className="flex items-center gap-2">
                  <HiOfficeBuilding className="fill-purple-500" />
                  <span className="text-xs font-semibold capitalize tracking-wider text-slate-400">
                    {company.industry}
                  </span>
                </div>
                {/* Types */}
                <div className="flex items-center gap-2">
                  <MdOutlineWork className="fill-purple-500" />
                  <div className="mr-6 rounded-lg bg-purple-200 px-3 py-1 text-[0.6rem] font-semibold text-purple-700">
                    Size: {company.size}
                  </div>
                  <div className="mr-6 rounded-lg bg-green-200 px-2 py-1 text-[0.6rem] font-semibold text-green-700">
                    {company.website}
                  </div>
                </div>
                {/*Location */}
                <div className="flex items-center gap-2">
                  <TiLocation className="fill-purple-500" />
                  <span className="text-xs font-semibold tracking-wider text-slate-400">
                    {company.city}
                  </span>
                </div>
                {/* Created At */}
                <div className="flex items-center gap-2">
                  <AiFillClockCircle className="fill-purple-500" />
                  <span className="text-xs font-semibold capitalize tracking-wider text-slate-400">
                    {moment(company.createdAt).format("Do MMM YYYY")}
                  </span>
                </div>
              </div>
            </div>
            {/* Save */}
            <div className="flex items-center gap-4">
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
          </div>
          <div className="flex flex-col">
            <span className="mb-3 text-ellipsis text-xs font-semibold capitalize tracking-wider line-clamp-2">
              Description
            </span>
            <p className="text-ellipsis text-sm text-slate-400">
              {company.details} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Consequuntur repudiandae consequatur, assumenda
              necessitatibus voluptatum ex perferendis. Numquam corporis autem
              deleniti sit minima. Delectus, libero non accusamus autem ut
              officia ea? Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Ad impedit doloremque dicta dolor illo iusto qui earum
              dolore! Quaerat cum natus quisquam aspernatur, nihil consequatur
              ducimus debitis animi fuga eveniet? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Fuga molestiae adipisci voluptatibus
              eos vero facere unde error quod, minus sint possimus facilis eum
              esse cumque labore atque, officiis praesentium commodi.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {/* Contacts */}
            <div className="flex items-center gap-2">
              <MdEmail />
              <span className="text-xs font-semibold tracking-wider text-slate-400">
                {company.contact}
              </span>
            </div>
            {/* Rating */}
            <div className="flex items-center gap-2">
              <MdReviews />

              <span className=" text-xs font-semibold tracking-wider text-slate-400">
                {company.reviews.length}
              </span>
            </div>
          </div>
          {/* Comments */}
          <div className="flex flex-col ">
            <div className="flex items-center justify-between">
              <span className="mb-3 text-ellipsis text-sm font-semibold tracking-wider">
                Comments ({company.reviews.length})
              </span>
              <span
                onClick={() => {
                  if (!isAuth) {
                    toast.warning("Login to write a comment");
                  } else {
                    setIsDialogueOpen(true);
                  }
                }}
                className="mb-3 cursor-pointer text-ellipsis text-sm font-semibold tracking-wider text-green-400 hover:text-green-500"
              >
                Write a comment
              </span>
            </div>
            <CommentSection job={company} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          companyId: "1",
        },
      },
    ],
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const companyId = params.companyId;
  const { data } = await getCompany(companyId);
  return {
    props: {
      company: data.company,
    },
  };
}