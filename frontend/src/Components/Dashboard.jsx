import React from "react";
import { useState } from "react";
import Sidebar from "./dashboardComp/Sidebar";
import LearnedProgress from "./dashboardComp/LearnedProgress";
import Navbar from "./header/Navbar";

const Dashboard = () => {
  return (
    <div>
      {/* Header */}
      <div>
          <Navbar/>
        </div>
      <div className="flex">
        {/* Side bar */}
        <div className="w-[20%]">
          <Sidebar />
        </div>
        {/* Main content */}
        <div className="w-[80%]">
          <LearnedProgress />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
