import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/sharedlayout/Header";
import SideBar from "../../components/sharedlayout/SideBar";

const SharedLayout = () => {
  return (
    <section className="min-h-[100vh]">
      <div className="flex">
        <div className="w-[20%] bg-[#F2F2F2] min-h-screen">
          <SideBar />
        </div>
        <div className="w-full bg-white min-h-screen">
          <Header />
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default SharedLayout;
