import React from "react";
import ProfileImage from "../../assets/ProfileImage.webp";
import MyProfile from "../../assets/MyProfile.jpg";
const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-gray-800 via-gray-700 to-gray-900 text-white p-4">
      {/* Profile */}
      <div className="flex flex-col items-center justify-center mt-4">
        <img src={MyProfile} alt="Profile" className="w-[100px] h-[100px] rounded-full object-cover" />
        <h1 className="text-3xl font-medium">Sithika Ravindith</h1>
      </div>

      <div className="flex flex-col mt-4 space-y-2">
        <button className="p-4 border-1 border-gray-500 rounded-lg hover:opacity-50">
          My Learnings
        </button>
        <button className="p-4 border-1 border-gray-500 rounded-lg hover:opacity-50">
          All Courses
        </button>
        <button className="p-4 border-1 border-gray-500 rounded-lg hover:opacity-50">
          Achievements
        </button>
        <button className="p-4 border-1 border-gray-500 rounded-lg hover:opacity-50">
          Spring Journy
        </button>
        <button className="p-4 border-1 border-gray-500 rounded-lg hover:opacity-50">
          Azure Journy
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
