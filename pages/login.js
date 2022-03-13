import React, { useState } from "react";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import interview from "../public/interview.json";
import Link from "next/link";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { gmailLogin, login } from "../services/auth_services";
import { setAuth } from "../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isPassHidden, setIspasshidden] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(email, pass);
      if (data.success === false) {
        return toast.error(data.message);
      }
      // Add user to redux
      if (data.success === true) {
        dispatch(
          setAuth({
            auth: data.auth,
            user: data.user,
          })
        );
        router.push("/addDetails", { query: true });
        setEmail("");
        setPass("");
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-grow">
      {/* Left Container Starts */}
      <div className="flex w-2/5 flex-col items-center justify-evenly bg-white">
        <div className="flex items-center gap-1">
          <span className="text-3xl font-semibold">Get Your</span>
          <span className="text-3xl font-semibold text-sky-500">Dream Job</span>
          <span className="text-3xl font-semibold">Here</span>
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
            Signin to get access to thousands of jobs
          </span>
        </div>
        <form
          onSubmit={(e) => handleLogin(e)}
          action="submit"
          className="flex flex-col items-center gap-4"
        >
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
          <button
            type="submit"
            className="mt-6 rounded-xl bg-sky-500 px-16 py-2 font-semibold tracking-wider hover:bg-sky-600"
          >
            Log in
          </button>
        </form>
        {/* Social logins */}
        <div className="flex items-center justify-center gap-4">
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            buttonText="Continue with Google"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <div className="flex cursor-pointer items-center gap-2 rounded-xl bg-sky-100 py-2 px-6 hover:bg-sky-200">
                  <FcGoogle fontSize={25} />
                  <span className="text-sm font-semibold tracking-wider text-sky-500">
                    Login with Google
                  </span>
                </div>
              </button>
            )}
            onSuccess={async (response) => {
              try {
                const { data } = await gmailLogin(response.profileObj.email);
                if (data.success === false) {
                  return toast.error(data.message);
                }
                // Add user to redux
                if (data.success === true) {
                  dispatch(
                    setAuth({
                      auth: data.auth,
                      user: data.user,
                    })
                  );
                  router.push("/addDetails", { query: true });
                }
              } catch (error) {
                console.log(error);
                return toast.error(error.message);
              }
            }}
            onFailure={(response) => toast.error("Something went wrong")}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-sm font-medium tracking-wider text-black">
            Dont have an account?
          </span>
          <Link href="/register" passHref={true}>
            <span className="cursor-pointer text-sm font-medium tracking-wider text-green-500 hover:underline">
              Create an account
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
