import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getAssignedStudents,
  getStudentReadiness,
  addRemarks,
  addImprovementPlan,
  assignTask,
  sendNotification,
  getAssignedTasks,
  getSentNotifications,
  getMentorActivityLogs
} from "../services/api";
import "./Dashboard.css";


const MentorDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [readiness, setReadiness] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [improvementPlan, setImprovementPlan] = useState("");
  const [taskForm, setTaskForm] = useState({ studentId: "", title: "", description: "", dueDate: "" });
  const [notifForm, setNotifForm] = useState({ studentId: "", message: "", type: "info" });
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [sentNotifications, setSentNotifications] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [studentsRes, tasksRes, notifsRes, logsRes] = await Promise.all([
        getAssignedStudents(),
        getAssignedTasks(),
        getSentNotifications(),
        getMentorActivityLogs()
      ]);
      setStudents(studentsRes.data);
      setAssignedTasks(tasksRes.data);
      setSentNotifications(notifsRes.data);
      setActivityLogs(logsRes.data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleSelectStudent = async (student) => {
    setSelectedStudent(student);
    try {
      const res = await getStudentReadiness(student._id);
      setReadiness(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    try {
      await assignTask(taskForm);
      setTaskForm({ studentId: "", title: "", description: "", dueDate: "" });
      fetchAll();
    } catch (error) {
      alert("Task assignment failed");
    }
  };

  const handleSendNotification = async (e) => {
    e.preventDefault();
    try {
      await sendNotification(notifForm);
      setNotifForm({ studentId: "", message: "", type: "info" });
      fetchAll();
    } catch (error) {
      alert("Notification send failed");
    }
  };

  const handleAddRemarks = async () => {
    try {
      await addRemarks(selectedStudent._id, { remarks });
      alert("Remarks added successfully");
      setRemarks("");
    } catch (error) {
      alert("Error adding remarks");
    }
  };

  const handleAddImprovementPlan = async () => {
    try {
      await addImprovementPlan(selectedStudent._id, { improvementPlan });
      alert("Improvement plan added successfully");
      setImprovementPlan("");
    } catch (error) {
      alert("Error adding improvement plan");
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>CampusHire - Mentor</h1>
        <div>
          <span>Welcome, {user?.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        {/* Assign Task */}
        <div className="section">
          <h2>Assign Task to Student</h2>
          <form onSubmit={handleAssignTask} style={{ display: "flex", gap: 8 }}>
            <select
              value={taskForm.studentId}
              onChange={e => setTaskForm({ ...taskForm, studentId: e.target.value })}
              required
            >
              <option value="">Select Student</option>
              {students.map(s => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Title"
              value={taskForm.title}
              onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={taskForm.description}
              onChange={e => setTaskForm({ ...taskForm, description: e.target.value })}
            />
            <input
              type="date"
              value={taskForm.dueDate}
              onChange={e => setTaskForm({ ...taskForm, dueDate: e.target.value })}
            />
            <button type="submit">Assign</button>
          </form>
        </div>

        {/* Send Notification */}
        <div className="section">
          <h2>Send Notification to Student</h2>
          <form onSubmit={handleSendNotification} style={{ display: "flex", gap: 8 }}>
            <select
              value={notifForm.studentId}
              onChange={e => setNotifForm({ ...notifForm, studentId: e.target.value })}
              required
            >
              <option value="">Select Student</option>
              {students.map(s => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Message"
              value={notifForm.message}
              onChange={e => setNotifForm({ ...notifForm, message: e.target.value })}
              required
            />
            <select
              value={notifForm.type}
              onChange={e => setNotifForm({ ...notifForm, type: e.target.value })}
            >
              <option value="info">Info</option>
              <option value="alert">Alert</option>
              <option value="warning">Warning</option>
            </select>
            <button type="submit">Send</button>
          </form>
        </div>

        {/* Assigned Tasks */}
        <div className="section">
          <h2>Tasks Assigned by You</h2>
          <ul>
            {assignedTasks.length === 0 && <li>No tasks assigned.</li>}
            {assignedTasks.map((task) => (
              <li key={task._id}><b>{task.title}</b> for {task.assignedTo?.name} - {task.status} (Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"})</li>
            ))}
          </ul>
        </div>

        {/* Sent Notifications */}
        <div className="section">
          <h2>Notifications Sent</h2>
          <ul>
            {sentNotifications.length === 0 && <li>No notifications sent.</li>}
            {sentNotifications.map((notif) => (
              <li key={notif._id}>{notif.message} ({notif.type})</li>
            ))}
          </ul>
        </div>

        {/* Activity Logs */}
        <div className="section">
          <h2>Your Activity Logs</h2>
          <ul>
            {activityLogs.length === 0 && <li>No activity yet.</li>}
            {activityLogs.map((log) => (
              <li key={log._id}>{log.action} - {log.details} ({new Date(log.createdAt).toLocaleString()})</li>
            ))}
          </ul>
        </div>

        {/* Assigned Students Table and Student Details */}
        <div className="section">
          <h2>Assigned Students</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>CGPA</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.cgpa || "N/A"}</td>
                    <td>
                      <button onClick={() => handleSelectStudent(student)}>View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedStudent && (
          <div className="section">
            <h2>Student Details: {selectedStudent.name}</h2>
            {readiness && (
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Readiness Score</h3>
                  <div className="stat-value">{readiness.readinessScore}%</div>
                </div>
                <div className="stat-card">
                  <h3>CGPA</h3>
                  <div className="stat-value">{readiness.cgpa}</div>
                </div>
                <div className="stat-card">
                  <h3>Mock Average</h3>
                  <div className="stat-value">{readiness.mockAverage}</div>
                </div>
                <div className="stat-card">
                  <h3>Coding Count</h3>
                  <div className="stat-value">{readiness.codingCount}</div>
                </div>
              </div>
            )}

            <div className="form-section">
              <h3>Add Remarks</h3>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter remarks for student"
                rows="4"
              />
              <button onClick={handleAddRemarks}>Submit Remarks</button>
            </div>

            <div className="form-section">
              <h3>Add Improvement Plan</h3>
              <textarea
                value={improvementPlan}
                onChange={(e) => setImprovementPlan(e.target.value)}
                placeholder="Enter improvement plan"
                rows="4"
              />
              <button onClick={handleAddImprovementPlan}>Submit Plan</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorDashboard;
