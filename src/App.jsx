import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./components/Profile";
import CommentsDashboard from "./components/CommentsDashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/comments" element={<CommentsDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
