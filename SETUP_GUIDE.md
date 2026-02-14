# Complete Setup Instructions - CampusHire Pro

## 📋 Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js installed (v14+): Run `node --version`
- ✅ npm installed: Run `npm --version`
- ✅ MongoDB installed and running

## 🔧 Step-by-Step Setup

### Step 1: Verify MongoDB Installation

#### Check if MongoDB is installed:
```bash
mongosh --version
```

#### Check if MongoDB is running:
```bash
mongosh
```

If you see MongoDB shell, you're good! Type `exit` to quit.

#### If MongoDB is not running (Windows):
```bash
net start MongoDB
```

### Step 2: Setup Backend

Open **Terminal 1** (Command Prompt or PowerShell):

```bash
# Navigate to backend directory
cd d:\Projects\FULL_STACK_DEVELOPMENT\placement_hub\backend

# Install all dependencies
npm install

# This will install:
# - express (web framework)
# - mongoose (MongoDB ODM)
# - bcryptjs (password hashing)
# - jsonwebtoken (JWT authentication)
# - cors (cross-origin requests)
# - dotenv (environment variables)
```

### Step 3: Create Admin User

Still in Terminal 1:

```bash
# Run the admin creation script
npm run create-admin
```

You should see:
```
✅ Admin user created successfully!
Email: admin@campushire.com
Password: admin123
```

### Step 4: Start Backend Server

Still in Terminal 1:

```bash
# Start the backend server
npm start
```

You should see:
```
MongoDB Connected
Server running on port 5000
```

✅ **Backend is now running!** Keep this terminal open.

### Step 5: Setup Frontend

Open **Terminal 2** (New Command Prompt or PowerShell):

```bash
# Navigate to frontend directory
cd d:\Projects\FULL_STACK_DEVELOPMENT\placement_hub\frontend

# Install all dependencies
npm install

# This will install:
# - react (UI library)
# - react-dom (React DOM renderer)
# - react-router-dom (routing)
# - axios (HTTP client)
# - react-scripts (build tools)
```

### Step 6: Start Frontend Server

Still in Terminal 2:

```bash
# Start the frontend development server
npm start
```

Browser will automatically open at http://localhost:3000

You should see the CampusHire Pro login page!

✅ **Frontend is now running!** Keep this terminal open.

## 🎯 First Time Login

### Login as Admin:
1. Go to http://localhost:3000
2. Enter credentials:
   - **Email**: admin@campushire.com
   - **Password**: admin123
3. Click Login

You'll be redirected to the Admin Dashboard!

## 📝 Create Test Data

### Create a Mentor:
1. In Admin Dashboard, click **"Create Mentor"**
2. Fill in:
   - Name: Dr. John Smith
   - Email: mentor@test.com
   - Password: mentor123
3. Click **"Create"**

### Create a Student:
1. Click **"Create Student"**
2. Fill in:
   - Name: Alice Johnson
   - Email: student@test.com
   - Password: student123
   - CGPA: 8.5
   - Skills: JavaScript, React, Node.js
3. Click **"Create"**

### Create a Placement Drive:
1. Click **"Create Drive"**
2. Fill in:
   - Company Name: Google
   - Min CGPA: 7.5
   - Required Skills: JavaScript, React
   - Deadline: Select a future date
3. Click **"Create"**

### Assign Mentor to Student:
1. Click **"Assign Mentor"**
2. Select:
   - Student: Alice Johnson
   - Mentor: Dr. John Smith
3. Click **"Assign"**

## 🧪 Test Different Roles

### Test as Student:
1. Logout from admin
2. Login with:
   - Email: student@test.com
   - Password: student123
3. You'll see Student Dashboard with:
   - Readiness Score
   - CGPA
   - Eligible Drives
   - Assigned Mentor

### Test as Mentor:
1. Logout from student
2. Login with:
   - Email: mentor@test.com
   - Password: mentor123
3. You'll see Mentor Dashboard with:
   - Assigned Students
   - Student Details
   - Add Remarks option
   - Add Improvement Plan option

## 🔍 Verify Everything Works

### Check Backend:
- Open http://localhost:5000/api/auth/profile in browser
- You should see: `{"message":"No token"}` (This is correct!)

### Check Frontend:
- Open http://localhost:3000
- You should see the login page

### Check MongoDB:
```bash
# Open MongoDB shell
mongosh

# Switch to database
use campushire_pro

# Check users
db.users.find().pretty()

# You should see admin, mentor, and student users
```

## 📊 Understanding the Application

### Readiness Score Calculation:
The system calculates student placement readiness:
- CGPA (30%): (CGPA × 10) × 0.3
- Mock Average (30%): Mock Average × 0.3
- Coding Count (20%): (Coding Count × 2) × 0.2
- Resume Score (20%): Resume Score × 0.2

Example:
- CGPA: 8.5 → (8.5 × 10) × 0.3 = 25.5
- Mock Average: 75 → 75 × 0.3 = 22.5
- Coding Count: 10 → (10 × 2) × 0.2 = 4
- Resume Score: 80 → 80 × 0.2 = 16
- **Total Readiness: 68%**

### Eligibility Filtering:
Students see drives only if:
1. Their CGPA >= Drive's minimum CGPA
2. They have ALL required skills

## 🛠️ Common Issues & Solutions

### Issue 1: "Cannot connect to MongoDB"
**Solution:**
```bash
# Start MongoDB service
net start MongoDB

# Verify it's running
mongosh
```

### Issue 2: "Port 5000 already in use"
**Solution:**
```bash
# Kill the process on port 5000
npx kill-port 5000

# Then restart backend
npm start
```

### Issue 3: "Port 3000 already in use"
**Solution:**
```bash
# Kill the process on port 3000
npx kill-port 3000

# Then restart frontend
npm start
```

### Issue 4: "Module not found"
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue 5: "CORS error in browser"
**Solution:**
- Make sure backend is running on port 5000
- Make sure frontend is running on port 3000
- CORS is already configured in backend

### Issue 6: "Cannot login"
**Solution:**
- Check browser console for errors (F12)
- Verify backend is running
- Check MongoDB is running
- Verify admin user exists: `npm run create-admin`

## 📱 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **MongoDB**: mongodb://localhost:27017/campushire_pro

## 🎓 Learning Resources

### Understanding the Code:

**Backend:**
- `server.js` - Main server file
- `config/db.js` - Database connection
- `models/` - MongoDB schemas
- `controllers/` - Business logic
- `routes/` - API endpoints
- `middleware/auth.js` - JWT authentication

**Frontend:**
- `App.js` - Main app with routing
- `context/AuthContext.js` - Global auth state
- `services/api.js` - API calls
- `pages/` - All page components
- `components/` - Reusable components

## 🚀 Next Steps

1. ✅ Setup complete
2. ✅ Admin user created
3. ✅ Test data created
4. ✅ All roles tested

Now you can:
- Explore the code
- Add more features
- Customize the UI
- Deploy to production

## 📞 Need Help?

Check these files:
- `README.md` - Full documentation
- `API_TESTING.md` - API testing guide
- `QUICKSTART.md` - Quick start guide

## 🎉 Congratulations!

Your CampusHire Pro application is fully set up and running!

You now have a complete MERN stack placement management system with:
- ✅ JWT Authentication
- ✅ Role-based Access Control
- ✅ Placement Readiness Engine
- ✅ Smart Eligibility Filtering
- ✅ Admin, Mentor, and Student Dashboards
- ✅ MongoDB Database
- ✅ RESTful API
- ✅ React Frontend

Happy Coding! 🚀
