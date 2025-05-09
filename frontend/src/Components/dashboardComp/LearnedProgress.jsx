import React from "react";
import { useState } from "react";
import MyProgress from "./LearnedProgress.Comp/MyProgress";
import OthersProgress from "./LearnedProgress.Comp/OthersProgress";

const LearnedProgress = () => {
  return (
    <div className="p-4 bg-gray-100 h-screen">
      <div className="mb-6 border-b-2 border-gray-300 pb-4">
        <h2 className="text-3xl font-medium">Progress Overview</h2>
        <p className="text-gray-600">
          Here you can track your learning progress.
        </p>
      </div>

      <div className="p-2 flex ">
        <div className="w-[30%] flex flex-col items-center justify-center">
          <MyProgress />
        </div>

        <div className="w-[70%] flex flex-col items-center justify-center">
          {/*<OthersProgress />*/}
        </div>
      </div>
    </div>
  );
};
export default LearnedProgress;
