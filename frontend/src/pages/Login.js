import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login as loginAPI } from "../services/api";
import "./Auth.css";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Read ?role=student|mentor|admin from URL and set role label
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlRole = params.get("role");
    if (urlRole === "student" || urlRole === "mentor" || urlRole === "admin") {
      setRole(urlRole);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginAPI(formData);
      // Check role match
      if (role && res.data.user.role !== role) {
        setError(`You cannot login as ${role}. Please use the correct credentials for ${role === "admin" ? "Admin" : role === "mentor" ? "Faculty/Staff" : "Student"}.`);
        return;
      }
      login(res.data.token, res.data.user);
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (res.data.user.role === "mentor") {
        navigate("/mentor/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>CampusHire - Login</h2>
        {role && (
          <div className="role-indicator" style={{ marginBottom: 8, color: '#007bff', fontWeight: 500 }}>
            Login as {role === "admin" ? "Admin" : role === "mentor" ? "Faculty/Staff" : "Student"}
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-label">Email</div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <div className="input-label">Password</div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
