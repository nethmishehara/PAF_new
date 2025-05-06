import React, { useEffect } from "react";
import ProfileImage from "../../../assets/ProfileImage.webp";
import axios from "axios";
import Python from "../../../assets/Python.jpg";

const MyProgress = () => {
  const [progress, setProgress] = React.useState([]);
  const [myProgress, setMyProgress] = React.useState(null);
  const [progressId, setProgressId] = React.useState("P0002");

  const userId = "USER03"; // Replace with the actual user ID you want to fetch progress for

  const handleProgress = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/progress/${userId}`);
      console.log("Response:", response.data);

      // Set the full response data to progress state
      setProgress(response.data);

    //   const userProgress = response.data.find((progress) => progress.progressId === progressId);
    //   if (userProgress) {
    //     setMyProgress(userProgress);
    //   } else {
    //     setMyProgress(null); // No progress found for the user
    //   }
    //   console.log("User Progress:", userProgress);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  // Fix: Use separate useEffect hooks for each dependency
  useEffect(() => {
    console.log("Progress updated:", progress);
  }, [progress]);

//   useEffect(() => {
//     console.log("My Progress updated:", myProgress);
//   }, [myProgress]);

  // Call handleProgress on component mount
  useEffect(() => {
    handleProgress();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-left w-[300px] shadow-lg rounded-2xl mt-5">
        <img
          src={Python}
          alt="Course"
          className="w-[300px] h-[300px] rounded-2xl object-contain"
        />
        <div className="w-full mt-4 p-4">
          {progress.map((item) => (
            <div key={item.progressId} className="flex flex-col items-start mb-4">
                <h2 className="text-2xl font-semibold">{item.courseName}</h2>
                <p className="text-gray-600">Progress: {item.progressId}</p>
                <p className="text-gray-600">Learner: {item.userName}</p>
                <p className="text-gray-600">Start Date: {item.createdAt}</p>
                <p className="text-gray-600">End Date: {item.updatedAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MyProgress;