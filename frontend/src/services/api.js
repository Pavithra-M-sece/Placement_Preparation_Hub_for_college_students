import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const getProfile = () => API.get("/auth/profile");

// Admin APIs
export const createMentor = (data) => API.post("/admin/create-mentor", data);
export const createStudent = (data) => API.post("/admin/create-student", data);
export const createDrive = (data) => API.post("/admin/create-drive", data);
export const assignMentor = (data) => API.post("/admin/assign-mentor", data);
export const getAllStudents = () => API.get("/admin/students");
export const getAllMentors = () => API.get("/admin/mentors");
export const getAnalytics = () => API.get("/admin/analytics");
export const getAdminDrives = () => API.get("/admin/drives");

// Mentor APIs
export const getAssignedStudents = () => API.get("/mentor/assigned-students");
export const getStudentReadiness = (studentId) => API.get(`/mentor/student/${studentId}/readiness`);
export const addRemarks = (studentId, data) => API.post(`/mentor/student/${studentId}/remarks`, data);
export const addImprovementPlan = (studentId, data) => API.post(`/mentor/student/${studentId}/improvement-plan`, data);
export const getStudentMockResults = (studentId) => API.get(`/mentor/student/${studentId}/mock-results`);

// Student APIs
export const updateProfile = (data) => API.put("/student/profile", data);
export const getReadinessScore = () => API.get("/student/readiness");
export const getEligibleDrives = () => API.get("/student/eligible-drives");
export const applyForDrive = (data) => API.post("/student/apply", data);
export const getMyApplications = () => API.get("/student/applications");
export const getMentor = () => API.get("/student/mentor");

// Drive APIs
export const getAllDrives = () => API.get("/drives");
export const getDrive = (id) => API.get(`/drives/${id}`);


// --- Student Feature APIs ---
export const uploadProject = (data) => API.post("/student-features/project", data);
export const getProjects = () => API.get("/student-features/projects");
export const uploadResume = (data) => API.post("/student-features/resume", data);
export const updateAttendance = (data) => API.post("/student-features/attendance", data);
export const getNotifications = () => API.get("/student-features/notifications");
export const markNotificationRead = (data) => API.post("/student-features/notification/read", data);
export const getStudentTasks = () => API.get("/student-features/tasks");
export const updateTaskStatus = (data) => API.post("/student-features/task/status", data);
export const getStudentActivityLogs = () => API.get("/student-features/activity-logs");

// --- Mentor Feature APIs ---
export const assignTask = (data) => API.post("/mentor-features/assign-task", data);
export const sendNotification = (data) => API.post("/mentor-features/send-notification", data);
export const getAssignedTasks = () => API.get("/mentor-features/assigned-tasks");
export const getSentNotifications = () => API.get("/mentor-features/sent-notifications");
export const getMentorActivityLogs = () => API.get("/mentor-features/activity-logs");

// --- Admin Feature APIs ---
export const broadcastNotification = (data) => API.post("/admin-features/broadcast", data);
export const getSystemLogs = () => API.get("/admin-features/system-logs");
export const getDepartmentAnalytics = () => API.get("/admin-features/department-analytics");
export const removeUser = (data) => API.post("/admin-features/remove-user", data);
export const changeUserRole = (data) => API.post("/admin-features/change-role", data);

export default API;
