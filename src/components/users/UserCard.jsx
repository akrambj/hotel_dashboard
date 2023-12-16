import { ArrowRightAlt } from "@mui/icons-material";
import React from "react";

const UserCard = ({ user }) => {
  const formatDate = (dateString) => {
    const options = { month: "numeric", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="">
      {user && (
        <div className="flex items-center gap-2">
          <div className="w-[20%] ">
            <img
              className="w-[35px] h-[35px] rounded-full"
              src={user.image}
              alt=""
            />
          </div>
          <div className="w-[20%]">
            <h2 className="text-[#808080] font-semibold">{user.username}</h2>
          </div>
          {/* <div className="flex items-center text-[#8E8E8E] font-medium w-[20%]">
            <h5>{formatDate(user.debutDate)}</h5>
            <ArrowRightAlt />
            <h5>{formatDate(user.endDate)}</h5>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default UserCard;
