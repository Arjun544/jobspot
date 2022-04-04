import { useRouter } from "next/router";
import React, { useRef } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useOnClickOutside } from "usehooks-ts";
import { addComment } from "../services/comment_services";

const CommentDialogue = ({
  jobId,
  isLoading,
  setIsLoading,
  comment,
  setComment,
  setIsDialogueOpen,
}) => {
  const router = useRouter();
  const { isAuth, user } = useSelector((state) => state.auth);
  const ref = useRef();
  const handleClickOutside = () => {
    setIsDialogueOpen(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!isAuth) {
      return toast.warning("Login to save job");
    }
    try {
      setIsLoading(true);
      await addComment(
        user.id,
        comment,
        user.companyId === null ? null : user.companyId,
        jobId
      );
      setIsLoading(false);
      setIsDialogueOpen(false);
      setComment("");
      toast.success("Comment added successfully");
      router.push(`/jobs/${jobId}`);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="absolute z-40 h-screen w-full bg-amber-50 bg-opacity-10 backdrop-blur-sm backdrop-filter overflow-hidden">
      <div
        ref={ref}
        className="absolute right-0 left-0 top-0 bottom-0 z-50 m-auto flex h-1/2 w-3/4 flex-col justify-between rounded-xl bg-slate-100 py-8 px-10"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tracking-wider">
            Write a comment
          </span>
          <MdClose
            onClick={() => setIsDialogueOpen(false)}
            className="cursor-pointer"
          />
        </div>
        <textarea
          value={comment}
          name="comment"
          id="comment"
          cols="20"
          rows="5"
          draggable={false}
          style={{ resize: "none" }}
          placeholder="Comment"
          required
          onChange={(e) => setComment(e.target.value)}
          className="mb-6 rounded-xl border-0 bg-slate-200 p-4 outline-none"
        ></textarea>
        {/* Buttons */}
        <div className="flex w-full items-center justify-end gap-6">
          <button
            onClick={() => setIsDialogueOpen(false)}
            className="w-52 rounded-xl bg-slate-200 py-3 text-xs font-medium tracking-wider text-white hover:bg-slate-300"
          >
            Cancel
          </button>
          {isLoading ? (
            <ScaleLoader color="#00BFFF" loading={isLoading} />
          ) : (
            <button
              onClick={(e) => handleAddComment(e)}
              className="w-52 rounded-xl bg-green-400 py-3 text-xs font-medium tracking-wider text-white hover:bg-green-500"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentDialogue;
