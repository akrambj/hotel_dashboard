import React from "react";
import profile from "../../assets/profile.png";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-10">
      <div className="relative w-full">
        <input
          type="search"
          className="w-[70%] border-2 placeholder:text-black font-semibold border-[#E6E6E6] py-2 px-2"
          placeholder="search users, rooms"
        />
      </div>
      <div>
        <img className="w-80" src={profile} alt="" />
      </div>
    </div>
  );
};

export default Header;
