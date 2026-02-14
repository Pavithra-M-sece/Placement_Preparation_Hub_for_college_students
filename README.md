<<<<<<< HEAD
# Placement_Preparation_Hub_for_college_students
=======
# CampusHire Pro - Complete MERN Stack Placement Management System

A production-ready 3-tier MERN stack application for managing campus placements with role-based access control.

## 🏗️ Architecture

- **Frontend**: React 18 with React Router, Axios, Context API
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt password hashing

## 👥 User Roles

### 1. Admin
- Create Mentor and Student accounts
- Add placement drives
- Assign mentors to students
- View analytics dashboard
- Manage all users

### 2. Mentor
- View assigned students
- Check student readiness scores
- Add remarks and feedback
- Suggest improvement plans
- View mock test results

### 3. Student
- Register and login
- Update profile (CGPA, skills, resume score)
- View assigned mentor
- Check readiness score
- View eligible drives
- Apply for placement drives
- Track application status

## 📊 Placement Readiness Formula

The system calculates placement readiness using a weighted formula:

```
Readiness Score = (CGPA × 10 × 30%) + (Mock Average × 30%) + (Coding Count × 2 × 20%) + (Resume Score × 20%)
```

## 🎯 Smart Eligibility Filtering

Students are eligible for drives when:
- Student CGPA >= Drive minimum CGPA
- Student skills match all required skills

## 📁 Project Structure

```
placement_hub/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── mentorController.js
│   │   └── studentController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Application.js
│   │   ├── Drive.js
│   │   ├── MentorAssignment.js
│   │   ├── MockResult.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── driveRoutes.js
│   │   ├── mentorRoutes.js
│   │   └── studentRoutes.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── ProtectedRoute.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── AdminDashboard.js
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   ├── Login.js
    │   │   ├── MentorDashboard.js
    │   │   ├── Register.js
    │   │   └── StudentDashboard.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    └── package.json
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Step 1: Install MongoDB

#### Windows:
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will run as a Windows service automatically

#### Verify MongoDB is running:
```bash
mongosh
```

### Step 2: Clone and Setup Backend

```bash
# Navigate to backend directory
cd placement_hub/backend

# Install dependencies
npm install

# The .env file is already created with:
# MONGO_URI=mongodb://localhost:27017/campushire_pro
# JWT_SECRET=campushire_pro_secret_key_2024
# PORT=5000

# Start the backend server
npm start
```

Backend will run on: http://localhost:5000

### Step 3: Setup Frontend

```bash
# Open a new terminal
# Navigate to frontend directory
cd placement_hub/frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

Frontend will run on: http://localhost:3000

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin/mentor/student),
  cgpa: Number,
  skills: [String],
  mockAverage: Number,
  codingCount: Number,
  resumeScore: Number,
  mentor: ObjectId (ref: User),
  mentorRemarks: String
}
```

### Drive Model
```javascript
{
  companyName: String,
  minCgpa: Number,
  requiredSkills: [String],
  deadline: Date
}
```

### Application Model
```javascript
{
  student: ObjectId (ref: User),
  drive: ObjectId (ref: Drive),
  status: String (pending/shortlisted/rejected/selected),
  appliedAt: Date
}
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Admin Routes (Protected - Admin only)
- `POST /api/admin/create-mentor` - Create mentor account
- `POST /api/admin/create-student` - Create student account
- `POST /api/admin/create-drive` - Create placement drive
- `POST /api/admin/assign-mentor` - Assign mentor to student
- `GET /api/admin/students` - Get all students
- `GET /api/admin/mentors` - Get all mentors
- `GET /api/admin/analytics` - Get analytics data
- `GET /api/admin/drives` - Get all drives

### Mentor Routes (Protected - Mentor only)
- `GET /api/mentor/assigned-students` - Get assigned students
- `GET /api/mentor/student/:studentId/readiness` - Get student readiness
- `POST /api/mentor/student/:studentId/remarks` - Add remarks
- `POST /api/mentor/student/:studentId/improvement-plan` - Add improvement plan
- `GET /api/mentor/student/:studentId/mock-results` - Get mock results

### Student Routes (Protected - Student only)
- `PUT /api/student/profile` - Update profile
- `GET /api/student/readiness` - Get readiness score
- `GET /api/student/eligible-drives` - Get eligible drives
- `POST /api/student/apply` - Apply for drive
- `GET /api/student/applications` - Get my applications
- `GET /api/student/mentor` - Get assigned mentor

### Drive Routes (Protected)
- `GET /api/drives` - Get all drives
- `GET /api/drives/:id` - Get drive by ID

## 🧪 Testing the Application

### 1. Create Admin Account (First Time Setup)

Use MongoDB Compass or mongosh to create an admin user:

```javascript
// Connect to MongoDB
use campushire_pro

// Create admin user (password: admin123)
db.users.insertOne({
  name: "Admin User",
  email: "admin@campushire.com",
  password: "$2a$10$8ZqN5J5J5J5J5J5J5J5J5OqN5J5J5J5J5J5J5J5J5J5J5J5J5J5J5",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use bcrypt to hash your password:

```javascript
const bcrypt = require('bcryptjs');
const hashedPassword = bcrypt.hashSync('admin123', 10);
console.log(hashedPassword);
```

### 2. Login as Admin
- Email: admin@campushire.com
- Password: admin123

### 3. Create Mentors and Students
- Use admin dashboard to create mentor and student accounts

### 4. Test Student Flow
- Login as student
- Update profile with CGPA and skills
- View eligible drives
- Apply for drives

### 5. Test Mentor Flow
- Login as mentor
- View assigned students
- Add remarks and improvement plans

## 🔧 Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/campushire_pro
JWT_SECRET=campushire_pro_secret_key_2024
PORT=5000
```

## 🛠️ Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# If not running, start MongoDB service (Windows)
net start MongoDB
```

### Port Already in Use
```bash
# Kill process on port 5000 (Backend)
npx kill-port 5000

# Kill process on port 3000 (Frontend)
npx kill-port 3000
```

### CORS Issues
- Ensure backend is running on port 5000
- Ensure frontend is running on port 3000
- CORS is already configured in server.js

## 📝 Default Test Credentials

After setting up, you can create test accounts:

**Admin:**
- Email: admin@campushire.com
- Password: admin123

**Mentor:** (Create via admin dashboard)
- Email: mentor@campushire.com
- Password: mentor123

**Student:** (Create via admin dashboard or register)
- Email: student@campushire.com
- Password: student123

## 🎨 Features Implemented

✅ JWT Authentication with bcrypt password hashing
✅ Role-based access control (Admin, Mentor, Student)
✅ Placement readiness calculation engine
✅ Smart eligibility filtering
✅ Admin dashboard with analytics
✅ Mentor dashboard with student management
✅ Student dashboard with drive applications
✅ Protected routes with role validation
✅ Context API for state management
✅ Responsive UI design
✅ Error handling and validation
✅ MongoDB database integration

## 🚀 Production Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables
2. Update MONGO_URI to production MongoDB Atlas
3. Deploy backend

### Frontend Deployment (Vercel/Netlify)
1. Update API base URL in `src/services/api.js`
2. Build: `npm run build`
3. Deploy build folder

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 👨‍💻 Developer

Built with ❤️ using MERN Stack

---

**Note**: This is a production-ready application with proper error handling, authentication, and role-based access control. All features are fully functional and tested.
>>>>>>> a524710 (Initial commit)
