import React, { useState } from "react";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import { RiEyeOffFill, RiEyeFill } from "react-icons/ri";
import interview from "../public/interview.json";
import Link from "next/link";
import "toastify-js/src/toastify.css";
import { useRouter } from "next/router";
import { register } from "../services/auth_services";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/reducers/authSlice";
import { showToast } from "../helpers/showToast";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isPassHidden, setIspasshidden] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmpass] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (pass !== confirmPass) {
      showToast("Confirm Password does not match", "#ff5656");
    } else {
      try {
        const { data } = await register(name, email, pass);
        if (data.success === false) {
          return showToast(data.message, "#ff5656");
        }
        // Add user to redux
        if (data.success === true) {
          dispatch(
            setAuth({
              auth: data.auth,
              user: data.user,
            })
          );
          // router.push("/addDetails", { query: true });
          router.push("/");
          setName("");
          setEmail("");
          setPass("");
          setConfirmpass("");
        }
      } catch (error) {
        console.log(error);
        showToast(error.message, "#ff5656");
      }
    }
  };

  return (
    <div className="flex h-screen w-screen flex-grow">
      {/* Left Container Starts */}
      <div className="flex w-2/5 flex-col items-center justify-evenly bg-white">
        <div className="flex items-center gap-1">
          <span className="text-3xl font-semibold">Get Your</span>
          <span className="text-3xl font-semibold text-sky-500">Dream Job</span>
        </div>
        <div>
          <Lottie animationData={interview} autoPlay={true} loop={true} />
        </div>
      </div>
      {/* Left Container Ends */}
      <div className="relative flex flex-1 flex-col justify-evenly bg-slate-200">
        <Link href="/" passHref={true}>
          <span className="absolute top-5 right-10 cursor-pointer font-semibold tracking-widest text-slate-500 hover:text-black">
            Close
          </span>
        </Link>
        <div className="flex flex-col items-center gap-3">
          <div className="m-auto flex items-center">
            <span className="text-2xl font-semibold tracking-wider text-black">
              Job
            </span>
            <span className="text-2xl font-semibold tracking-wider text-sky-500">
              spot
            </span>
          </div>

          <span className="text-sm font-semibold tracking-wider text-black">
            Signup absolutely free to get access to thousands of jobs
          </span>
        </div>
        <form
          onSubmit={(e) => handleRegister(e)}
          action="submit"
          className="flex flex-col items-center gap-4"
        >
          <input
            value={name}
            type="text"
            placeholder="Enter your username"
            required
            minLength={3}
            className="w-1/2 rounded-xl bg-white py-4 pl-4"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            value={email}
            type="email"
            placeholder="Enter your email"
            required
            className="w-1/2 rounded-xl bg-white py-4 pl-4"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex w-1/2 items-center">
            <input
              value={pass}
              type={isPassHidden ? "password" : "text"}
              placeholder="Enter your password"
              required
              minLength={6}
              className={`w-full bg-white py-4 pl-4 ${
                pass ? "rounded-l-xl" : "rounded-xl"
              } `}
              onChange={(e) => setPass(e.target.value)}
            />
            {pass && (
              <div className="flex h-full items-center rounded-r-xl bg-white px-6">
                {isPassHidden ? (
                  <RiEyeOffFill
                    className="cursor-pointer fill-slate-400"
                    fontSize={22}
                    onClick={() => setIspasshidden(!isPassHidden)}
                  />
                ) : (
                  <RiEyeFill
                    className="cursor-pointer fill-slate-400"
                    fontSize={22}
                    onClick={() => setIspasshidden(!isPassHidden)}
                  />
                )}
              </div>
            )}
          </div>
          <input
            value={confirmPass}
            type="password"
            placeholder="Confirm your password"
            required
            className="w-1/2 rounded-xl bg-white py-4 pl-4"
            onChange={(e) => setConfirmpass(e.target.value)}
          />
          <button
            type="submit"
            className="mt-6 rounded-xl bg-sky-500 px-16 py-2 font-semibold tracking-wider hover:bg-sky-600"
          >
            Get Started
          </button>
        </form>
        {/* Social logins */}
        <div className="flex items-center justify-center gap-4">
          <div className="cursor-pointer rounded-xl bg-sky-200 p-2">
            <FcGoogle fontSize="30px" />
          </div>
          <div className="cursor-pointer rounded-xl bg-sky-200 p-2">
            <FcGoogle fontSize="30px" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-sm font-medium tracking-wider text-black">
            Already have an account?
          </span>
          <Link href="/login" passHref={true}>
            <span className="cursor-pointer text-sm font-medium tracking-wider text-green-500 hover:underline">
              Login now
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
