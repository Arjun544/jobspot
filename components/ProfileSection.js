import Image from "next/image";
import React, { useRef, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { MdPerson, MdWork, MdOutlineDoneAll } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useOnClickOutside } from "usehooks-ts";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { logout } from "../services/auth_services";
import { setAuth } from "../redux/reducers/authSlice";
import { HiOfficeBuilding } from "react-icons/hi";

const options = [
  {
    name: "Profile",
    icon: <MdPerson className="fill-slate-400" fontSize={25} />,
  },
  {
    name: "My Jobs",
    icon: <MdWork className="fill-slate-400" fontSize={23} />,
  },
  {
    name: "My Company",
    icon: <HiOfficeBuilding className="fill-slate-400" fontSize={23} />,
  },
  {
    name: "Applied Jobs",
    icon: <MdOutlineDoneAll className="fill-slate-400" fontSize={23} />,
  },
  {
    name: "Logout",
    icon: <RiLogoutCircleRFill className="fill-slate-400" fontSize={25} />,
  },
];

const ProfileSection = () => {
  const router = useRouter();
  const {user } = useSelector((state) => state.auth);
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
      router.push(`/profile/${user.id}`);
    } else if (index === 1) {
      router.push(`/profile/jobs/${user.id}`);
    } else if (index === 2) {
      router.push(`/profile/company/${user.id}`);
    } else if (index === 3) {
      router.push(`/profile/applied/${user.id}`);
    } else {
      const { data } = await logout(user.id);
      dispatch(setAuth(data));
    }
  };

  return (
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
      <div className="hidden md:flex flex-col">
        <span className="text-sm font-semibold capitalize">{user.name}</span>
        <span className="text-xs text-slate-400">
          Looking for {user.type === "employee" ? "job" : "employer"}
        </span>
      </div>
      <TiArrowSortedDown className="fill-slate-400" />
      {isOpen && (
        <div
          className={`absolute top-12 -right-2 z-50 flex max-h-96 w-52 flex-col rounded-2xl bg-white py-4 px-2 shadow`}
        >
          {options.map((option, index) => (
            <span onClick={(e) => handleItemClick(e, index)} key={index}>
              <div className="flex cursor-pointer items-center gap-4 rounded-xl py-2 pl-2 hover:bg-slate-200">
                <i> {option.icon}</i>
                <span className="text-xs font-semibold tracking-wider">
                  {option.name}
                </span>
              </div>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
