import { useState } from "react";
import "./App.css";
import AutomationBuilder from "./components/AutomationBuildder";
import MainDashboard from "./components/MainDashboard";
import Sidebar from "./components/Sidebar";

function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedAutomation, setSelectedAutomation] = useState(null);

  const handleViewChange = (view, automation = null) => {
    setCurrentView(view);
    setSelectedAutomation(automation);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Sidebar currentView={currentView} onViewChange={handleViewChange} />
        <div className="flex-1 overflow-hidden">
          {currentView === "dashboard" ? (
            <MainDashboard onViewChange={handleViewChange} />
          ) : (
            <AutomationBuilder
              automation={selectedAutomation}
              onViewChange={handleViewChange}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
