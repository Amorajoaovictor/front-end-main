import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Students from "./components/Students";
import Teachers from "./components/Teachers";
import Attendance from "./components/Attendance";
import Grades from "./components/Grades";
import Reports from "./components/Reports";
import ParentsPortal from "./components/ParentsPortal";

export default function App() {
  const [view, setView] = useState("dashboard");

  function renderView() {
    switch(view) {
      case "dashboard": return <Dashboard />;
      case "students": return <Students />;
      case "teachers": return <Teachers />;
      case "attendance": return <Attendance />;
      case "grades": return <Grades />;
      case "reports": return <Reports />;
      case "parents": return <ParentsPortal />;
      default: return <Dashboard />;
    }
  }

  return (
    <div className="app">
      <Navbar current={view} setCurrent={setView} />
      <div className="main">
        {renderView()}
      </div>
    </div>
  );
}