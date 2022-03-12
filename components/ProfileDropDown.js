import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { MdPerson } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useOnClickOutside } from "usehooks-ts";
import { RiChat3Fill, RiLogoutCircleRFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { logout } from "../services/auth_services";
import { setAuth } from "../redux/reducers/authSlice";

const options = [
  {
    name: "Profile",
    icon: <MdPerson fontSize={25} />,
  },
  {
    name: "My reviews",
    icon: <RiChat3Fill fontSize={23} />,
  },
  {
    name: "Logout",
    icon: <RiLogoutCircleRFill fontSize={25} />,
  },
];

const ProfileSection = () => {
  const router = useRouter();
  const { isAuth, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const handleClickOutside = () => {
    setIsOpen(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsOpen((value) => !value);
  };

  const handleItemClick = async (e, index) => {
    e.preventDefault();
    console.log(index);
    if (index === 0) {
      router.push("/profile");
    } else if (index === 1) {
      router.push("/reviews");
    } else {
      const { data } = await logout(user.id);
      dispatch(setAuth(data));
    }
  };

  return isAuth ? (
    <div
      ref={ref}
      onClick={toggleMenu}
      className="relative flex cursor-pointer items-center gap-4"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
        {user.profile === "" ? (
          <div>
            <Image
              className="rounded-full"
              src="/profile.png"
              alt=""
              height={30}
              width={50}
              layout="fixed"
              priority="high"
            ></Image>
          </div>
        ) : (
          <Image
            className="rounded-full"
            src={user.profile}
            alt=""
            height={40}
            width={70}
            layout="fixed"
          ></Image>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold capitalize">{user.name}</span>
        <span className="text-xs text-slate-400">
          Looking for {user.type === "employee" ? "job" : "employer"}
        </span>
      </div>
      <TiArrowSortedDown className="fill-slate-400" />
      {isOpen && (
        <div
          className={`absolute top-12 -right-2 z-50 flex max-h-96 w-52 flex-col overflow-y-scroll rounded-2xl bg-white py-4 px-2 shadow`}
        >
          {options.map((option, index) => (
            <span onClick={(e) => handleItemClick(e, index)} key={index}>
              <div className="flex cursor-pointer items-center gap-4 rounded-xl py-2 pl-2 hover:bg-slate-200">
                <i> {option.icon}</i>
                <span className="text-sm font-semibold tracking-wider">
                  {option.name}
                </span>
              </div>
            </span>
          ))}
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-center gap-6">
      <Link href="/login" passHref>
        <span className="cursor-pointer text-sm font-semibold tracking-wider text-green-500 hover:text-green-400">
          Login
        </span>
      </Link>
      <Link href="/register" passHref>
        <button className="rounded-xl bg-sky-400 py-2 px-4 text-sm font-semibold tracking-wider text-white hover:bg-sky-300">
          Signup
        </button>
      </Link>
    </div>
  );
};

export default ProfileSection;
