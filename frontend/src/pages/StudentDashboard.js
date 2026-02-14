import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getReadinessScore,
  getEligibleDrives,
  getMentor,
  getProjects,
  uploadProject,
  uploadResume,
  updateAttendance,
  getNotifications,
  markNotificationRead,
  getStudentTasks,
  updateTaskStatus,
  getStudentActivityLogs
} from "../services/api";
import "./Dashboard.css";


const StudentDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [readiness, setReadiness] = useState(null);
  const [drives, setDrives] = useState([]);
  const [mentor, setMentor] = useState(null);
  const [projects, setProjects] = useState([]);
  const [resumeUrl, setResumeUrl] = useState("");
  const [attendance, setAttendance] = useState(user?.attendance || 0);
  const [notifications, setNotifications] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [projectForm, setProjectForm] = useState({ title: "", description: "", fileUrl: "" });
  const [resumeInput, setResumeInput] = useState("");
  const [attendanceInput, setAttendanceInput] = useState(attendance);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [readinessRes, drivesRes, mentorRes, projectsRes, notifRes, tasksRes, logsRes] = await Promise.all([
        getReadinessScore(),
        getEligibleDrives(),
        getMentor().catch(() => ({ data: null })),
        getProjects(),
        getNotifications(),
        getStudentTasks(),
        getStudentActivityLogs()
      ]);
      setReadiness(readinessRes.data);
      setDrives(drivesRes.data);
      setMentor(mentorRes.data);
      setProjects(projectsRes.data);
      setNotifications(notifRes.data);
      setTasks(tasksRes.data);
      setActivityLogs(logsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProjectUpload = async (e) => {
    e.preventDefault();
    try {
      await uploadProject(projectForm);
      setProjectForm({ title: "", description: "", fileUrl: "" });
      fetchData();
    } catch (error) {
      alert("Project upload failed");
    }
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    try {
      await uploadResume({ resumeUrl: resumeInput });
      setResumeUrl(resumeInput);
      setResumeInput("");
      fetchData();
    } catch (error) {
      alert("Resume upload failed");
    }
  };

  const handleAttendanceUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateAttendance({ attendance: attendanceInput });
      setAttendance(attendanceInput);
      fetchData();
    } catch (error) {
      alert("Attendance update failed");
    }
  };

  const handleTaskStatus = async (taskId, status) => {
    try {
      await updateTaskStatus({ taskId, status });
      fetchData();
    } catch (error) {
      alert("Task update failed");
    }
  };

  const handleMarkNotificationRead = async (notificationId) => {
    try {
      await markNotificationRead({ notificationId });
      fetchData();
    } catch (error) {
      alert("Failed to mark notification as read");
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>CampusHire - Student</h1>
        <div>
          <span>Welcome, {user?.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        {/* Top summary cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Readiness Score</h3>
            <div className="stat-value">{readiness?.readinessScore || 0}%</div>
          </div>
          <div className="stat-card">
            <h3>CGPA</h3>
            <div className="stat-value">{user?.cgpa || 0}</div>
          </div>
          <div className="stat-card">
            <h3>Attendance</h3>
            <div className="stat-value">{attendance}%</div>
          </div>
          <div className="stat-card">
            <h3>Mentor</h3>
            <div className="stat-value">{mentor?.name || "Not Assigned"}</div>
          </div>
        </div>

        {/* Pending tasks and notifications */}
        <div className="section">
          <h2>Pending Tasks</h2>
          <ul>
            {tasks.length === 0 && <li>No tasks assigned.</li>}
            {tasks.map((task) => (
              <li key={task._id}>
                <b>{task.title}</b> - {task.status}
                {task.status !== "completed" && (
                  <button onClick={() => handleTaskStatus(task._id, "completed")}>Mark Completed</button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Notifications</h2>
          <ul>
            {notifications.length === 0 && <li>No notifications.</li>}
            {notifications.map((notif) => (
              <li key={notif._id} style={{ fontWeight: notif.read ? "normal" : "bold" }}>
                {notif.message} ({notif.type})
                {!notif.read && (
                  <button onClick={() => handleMarkNotificationRead(notif._id)}>Mark Read</button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Project upload and list */}
        <div className="section">
          <h2>Project Upload</h2>
          <form onSubmit={handleProjectUpload} style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              placeholder="Title"
              value={projectForm.title}
              onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={projectForm.description}
              onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="File URL"
              value={projectForm.fileUrl}
              onChange={e => setProjectForm({ ...projectForm, fileUrl: e.target.value })}
              required
            />
            <button type="submit">Upload</button>
          </form>
          <ul>
            {projects.length === 0 && <li>No projects uploaded.</li>}
            {projects.map((proj) => (
              <li key={proj._id}><b>{proj.title}</b> - {proj.description} (<a href={proj.fileUrl} target="_blank" rel="noopener noreferrer">View</a>)</li>
            ))}
          </ul>
        </div>

        {/* Resume upload */}
        <div className="section">
          <h2>Resume Upload</h2>
          <form onSubmit={handleResumeUpload} style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              placeholder="Resume URL"
              value={resumeInput}
              onChange={e => setResumeInput(e.target.value)}
              required
            />
            <button type="submit">Upload</button>
          </form>
          {resumeUrl && <div>Current Resume: <a href={resumeUrl} target="_blank" rel="noopener noreferrer">View</a></div>}
        </div>

        {/* Attendance update */}
        <div className="section">
          <h2>Update Attendance</h2>
          <form onSubmit={handleAttendanceUpdate} style={{ display: "flex", gap: 8 }}>
            <input
              type="number"
              min={0}
              max={100}
              value={attendanceInput}
              onChange={e => setAttendanceInput(Number(e.target.value))}
              required
            />
            <button type="submit">Update</button>
          </form>
        </div>

        {/* Activity timeline */}
        <div className="section">
          <h2>Activity Timeline</h2>
          <ul>
            {activityLogs.length === 0 && <li>No activity yet.</li>}
            {activityLogs.map((log) => (
              <li key={log._id}>{log.action} - {log.details} ({new Date(log.createdAt).toLocaleString()})</li>
            ))}
          </ul>
        </div>

        {/* Eligible Placement Drives */}
        <div className="section">
          <h2>Eligible Placement Drives</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Min CGPA</th>
                  <th>Required Skills</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {drives.map((drive) => (
                  <tr key={drive._id}>
                    <td>{drive.companyName}</td>
                    <td>{drive.minCgpa}</td>
                    <td>{drive.requiredSkills.join(", ")}</td>
                    <td>{new Date(drive.deadline).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
