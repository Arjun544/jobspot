import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const CommentSection = ({ job }) => {
  const { isAuth, user } = useSelector((state) => state.auth);

  return (
    <div className=" w-full">
      {job.reviews.map((review, index) => (
        <div
          key={review.id}
          className="mb-4 flex flex-col gap-6 rounded-xl bg-slate-100 py-4 px-4 hover:shadow-sm"
        >
          <div className="flex h-full w-full items-center gap-6">
            <Image
              className="rounded-full shadow-sm"
              src={review.user.profile}
              alt="user profile"
              layout="fixed"
              height={50}
              width={50}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-20">
                <span className="text-sm capitalize">{review.user.name}</span>
                {isAuth && (
                  <span className="rounded-md bg-green-200 py-1 px-4 text-xs tracking-widest text-black shadow-sm">
                    {review.user.name === user.name && "Creator"}
                  </span>
                )}
              </div>
              <span className="text-xs capitalize text-slate-500">
                {review.user.email}
              </span>
            </div>
          </div>
          <p className="text-sm tracking-wider text-slate-500">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
