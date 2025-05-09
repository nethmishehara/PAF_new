import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Progress from "./Components/Dashboard";
import ProgressForm from "./Components/ProgressForm";
import Sidebar from "../src/Components/dashboardComp/Sidebar"
import MyProgress from "./Components/dashboardComp/LearnedProgress.Comp/MyProgress";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/*<Route path="/" element={ <Dashboard />} />
          <Route path="/plans" element={ <Plans />} />*/}
          <Route path="/" element={ <Progress />} />
          <Route path="/sidebar" element={ <Sidebar />} />
          <Route path="/progressForm" element={ <ProgressForm />} />
          <Route path="/myprogress" element={ <MyProgress />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
