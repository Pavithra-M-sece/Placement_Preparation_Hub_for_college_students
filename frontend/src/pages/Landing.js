import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1>Welcome to CampusHire</h1>
        <p className="landing-subtitle">Student Mentorship and Placement Management System</p>
        <div className="role-buttons">
          <button className="role-btn student" onClick={() => navigate("/login?role=student")}>Login as Student</button>
          <button className="role-btn mentor" onClick={() => navigate("/login?role=mentor")}>Login as Faculty/Staff</button>
          <button className="role-btn admin" onClick={() => navigate("/login?role=admin")}>Login as Admin</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
