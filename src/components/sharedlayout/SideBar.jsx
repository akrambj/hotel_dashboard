import {
  Business,
  EventNote,
  Group,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const activeLinkStyle = {
    backgroundColor: "#6656E1",
    color: "white",
  };

  return (
    <div className="bg-[#F2F2F2] flex flex-col items-center justify-center gap-20 py-14">
      <h2 className="text-3xl font-bold">LOGO</h2>
      <div className="flex flex-col justify-center gap-2">
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeLinkStyle : {})}
          className="flex items-center gap-2 text-[#8E8E8E] text-lg font-semibold py-2 px-6 rounded-lg"
        >
          <MenuIcon />
          <h3>Dashboard</h3>
        </NavLink>
        <NavLink
          to="/booking"
          style={({ isActive }) => (isActive ? activeLinkStyle : {})}
          className="flex items-center gap-2 text-[#8E8E8E] text-lg font-semibold py-2 px-6 rounded-lg"
        >
          <EventNote />
          <h3>Booking</h3>
        </NavLink>
        <NavLink
          to="/users"
          style={({ isActive }) => (isActive ? activeLinkStyle : {})}
          className="flex items-center gap-2 text-[#8E8E8E] text-lg font-semibold py-2 px-6 rounded-lg"
        >
          <Group />
          <h3>Users</h3>
        </NavLink>
        <NavLink
          to="/rooms"
          style={({ isActive }) => (isActive ? activeLinkStyle : {})}
          className="flex items-center gap-2 text-[#8E8E8E] text-lg font-semibold py-2 px-6 rounded-lg"
        >
          <Business />
          <h3>Rooms</h3>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
