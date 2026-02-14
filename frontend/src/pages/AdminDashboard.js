import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getAnalytics,
  getAllStudents,
  getAllMentors,
  createMentor,
  createStudent,
  createDrive,
  assignMentor,
  broadcastNotification,
  getSystemLogs,
  getDepartmentAnalytics,
  removeUser,
  changeUserRole
} from "../services/api";
import "./Dashboard.css";


const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState(null);
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [formData, setFormData] = useState({});
  const [broadcastForm, setBroadcastForm] = useState({ message: "", type: "info", role: "", department: "" });
  const [systemLogs, setSystemLogs] = useState([]);
  const [deptAnalytics, setDeptAnalytics] = useState({ students: [], mentors: [] });

  useEffect(() => {
    fetchData();
    fetchLogsAndAnalytics();
  }, []);

  const fetchData = async () => {
    try {
      const [analyticsRes, studentsRes, mentorsRes] = await Promise.all([
        getAnalytics(),
        getAllStudents(),
        getAllMentors()
      ]);
      setAnalytics(analyticsRes.data);
      setStudents(studentsRes.data);
      setMentors(mentorsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLogsAndAnalytics = async () => {
    try {
      const [logsRes, deptRes] = await Promise.all([
        getSystemLogs(),
        getDepartmentAnalytics()
      ]);
      setSystemLogs(logsRes.data);
      setDeptAnalytics(deptRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBroadcast = async (e) => {
    e.preventDefault();
    try {
      await broadcastNotification(broadcastForm);
      setBroadcastForm({ message: "", type: "info", role: "", department: "" });
      fetchLogsAndAnalytics();
      alert("Broadcast sent");
    } catch (error) {
      alert("Broadcast failed");
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await removeUser({ userId });
      fetchData();
    } catch (error) {
      alert("Remove user failed");
    }
  };

  const handleChangeRole = async (userId, role) => {
    try {
      await changeUserRole({ userId, role });
      fetchData();
    } catch (error) {
      alert("Change role failed");
    }
  };

  const handleCreateMentor = async (e) => {
    e.preventDefault();
    try {
      await createMentor(formData);
      alert("Mentor created successfully");
      setShowModal(null);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating mentor");
    }
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      await createStudent({
        ...formData,
        skills: formData.skills?.split(",").map(s => s.trim())
      });
      alert("Student created successfully");
      setShowModal(null);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating student");
    }
  };

  const handleCreateDrive = async (e) => {
    e.preventDefault();
    try {
      await createDrive({
        ...formData,
        requiredSkills: formData.requiredSkills?.split(",").map(s => s.trim())
      });
      alert("Drive created successfully");
      setShowModal(null);
    } catch (error) {
      alert(error.response?.data?.message || "Error creating drive");
    }
  };

  const handleAssignMentor = async (e) => {
    e.preventDefault();
    try {
      await assignMentor(formData);
      alert("Mentor assigned successfully");
      setShowModal(null);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Error assigning mentor");
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>CampusHire - Admin</h1>
        <div>
          <span>Welcome, {user?.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        {/* Top summary cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Students</h3>
            <div className="stat-value">{analytics?.totalStudents || 0}</div>
          </div>
          <div className="stat-card">
            <h3>Total Mentors</h3>
            <div className="stat-value">{analytics?.totalMentors || 0}</div>
          </div>
          <div className="stat-card">
            <h3>Total Drives</h3>
            <div className="stat-value">{analytics?.totalDrives || 0}</div>
          </div>
          <div className="stat-card">
            <h3>Applications</h3>
            <div className="stat-value">{analytics?.totalApplications || 0}</div>
          </div>
        </div>

        {/* Broadcast Notification */}
        <div className="section">
          <h2>Broadcast Notification</h2>
          <form onSubmit={handleBroadcast} style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              placeholder="Message"
              value={broadcastForm.message}
              onChange={e => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
              required
            />
            <select
              value={broadcastForm.type}
              onChange={e => setBroadcastForm({ ...broadcastForm, type: e.target.value })}
            >
              <option value="info">Info</option>
              <option value="alert">Alert</option>
              <option value="warning">Warning</option>
            </select>
            <input
              type="text"
              placeholder="Role (optional)"
              value={broadcastForm.role}
              onChange={e => setBroadcastForm({ ...broadcastForm, role: e.target.value })}
            />
            <input
              type="text"
              placeholder="Department (optional)"
              value={broadcastForm.department}
              onChange={e => setBroadcastForm({ ...broadcastForm, department: e.target.value })}
            />
            <button type="submit">Send</button>
          </form>
        </div>

        {/* Department Analytics */}
        <div className="section">
          <h2>Department Analytics</h2>
          <div>
            <b>Students by Department:</b>
            <ul>
              {deptAnalytics.students.map((d) => (
                <li key={d._id}>{d._id || "(None)"}: {d.count}</li>
              ))}
            </ul>
            <b>Mentors by Department:</b>
            <ul>
              {deptAnalytics.mentors.map((d) => (
                <li key={d._id}>{d._id || "(None)"}: {d.count}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* User Management */}
        <div className="section">
          <h2>User Management</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.concat(mentors).map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>{u.department || "-"}</td>
                    <td>
                      <button onClick={() => handleRemoveUser(u._id)}>Remove</button>
                      <select
                        value={u.role}
                        onChange={e => handleChangeRole(u._id, e.target.value)}
                      >
                        <option value="student">Student</option>
                        <option value="mentor">Mentor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Logs */}
        <div className="section">
          <h2>System Logs</h2>
          <ul>
            {systemLogs.length === 0 && <li>No logs yet.</li>}
            {systemLogs.map((log) => (
              <li key={log._id}>{log.user?.name || "(system)"}: {log.action} - {log.details} ({new Date(log.createdAt).toLocaleString()})</li>
            ))}
          </ul>
        </div>

        {/* Existing actions and modals */}
        <div className="actions">
          <button onClick={() => setShowModal("mentor")}>Create Mentor</button>
          <button onClick={() => setShowModal("student")}>Create Student</button>
          <button onClick={() => setShowModal("drive")}>Create Drive</button>
          <button onClick={() => setShowModal("assign")}>Assign Mentor</button>
        </div>

        <div className="section">
          <h2>All Students</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>CGPA</th>
                  <th>Mentor</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.cgpa || "N/A"}</td>
                    <td>{student.mentor?.name || "Not Assigned"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal === "mentor" && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create Mentor</h2>
            <form onSubmit={handleCreateMentor}>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button type="submit">Create</button>
              <button type="button" onClick={() => setShowModal(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showModal === "student" && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create Student</h2>
            <form onSubmit={handleCreateStudent}>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="CGPA"
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
              />
              <input
                type="text"
                placeholder="Skills (comma separated)"
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
              <button type="submit">Create</button>
              <button type="button" onClick={() => setShowModal(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showModal === "drive" && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create Drive</h2>
            <form onSubmit={handleCreateDrive}>
              <input
                type="text"
                placeholder="Company Name"
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Min CGPA"
                onChange={(e) => setFormData({ ...formData, minCgpa: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Required Skills (comma separated)"
                onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
              />
              <input
                type="date"
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                required
              />
              <button type="submit">Create</button>
              <button type="button" onClick={() => setShowModal(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showModal === "assign" && (
        <div className="modal">
          <div className="modal-content">
            <h2>Assign Mentor</h2>
            <form onSubmit={handleAssignMentor}>
              <select
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                required
              >
                <option value="">Select Student</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>{s.name}</option>
                ))}
              </select>
              <select
                onChange={(e) => setFormData({ ...formData, mentorId: e.target.value })}
                required
              >
                <option value="">Select Mentor</option>
                {mentors.map((m) => (
                  <option key={m._id} value={m._id}>{m.name}</option>
                ))}
              </select>
              <button type="submit">Assign</button>
              <button type="button" onClick={() => setShowModal(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
