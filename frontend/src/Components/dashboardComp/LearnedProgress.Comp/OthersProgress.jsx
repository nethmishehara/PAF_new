import { useState, useEffect } from "react";

const OthersProgress = () => {
  const [progress, setProgress] = useState([]); // Initialize progress state to an empty array
  const [isLoading, setIsLoading] = useState(false);

  const loadUserProgress = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/progress"); // get all user progresses
      console.log(response.data);
      setProgress(response.data.progress); // assuming the response contains a progress field
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  useEffect(() => {
    loadUserProgress();
  }, []);

  return (
    <div>
      <div className="flex gap-5 items-center justify-center">
        <div className="flex flex-col items-center justify-left w-[150px] shadow-lg rounded-2xl p-3">
          <img
            src="https://www.w3schools.com/w3images/lights.jpg"
            alt="Profile"
            className="w-[150px] h-[150px] rounded-2xl"
          />
          <div className="w-[100%] mt-4 p-4">
            <h1 className="text-xl">Sithika Ravindith</h1>
            <h1>R Deploma</h1>
            <h1>Progress: 80%</h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-left w-[150px] shadow-lg rounded-2xl p-3">
          <img
            src="https://www.w3schools.com/w3images/lights.jpg"
            alt="Profile"
            className="w-[150px] h-[150px] rounded-2xl"
          />
          <div className="w-[100%] mt-4 p-4">
            <h1 className="text-xl">Sithika Ravindith</h1>
            <h1>R Deploma</h1>
            <h1>Progress: 80%</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OthersProgress;
