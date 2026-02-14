# 🚀 HOW TO RUN - CampusHire Pro

## ⚡ Quick Run (3 Commands)

### Terminal 1 - Backend:
```bash
cd d:\Projects\FULL_STACK_DEVELOPMENT\placement_hub\backend
npm install
npm run create-admin
npm start
```

### Terminal 2 - Frontend:
```bash
cd d:\Projects\FULL_STACK_DEVELOPMENT\placement_hub\frontend
npm install
npm start
```

### Browser:
```
http://localhost:3000
Login: admin@campushire.com / admin123
```

---

## 📋 Detailed Instructions

### Step 1: Check MongoDB

```bash
# Check if MongoDB is running
mongosh

# If not running (Windows):
net start MongoDB
```

### Step 2: Backend Setup

Open **Command Prompt** or **PowerShell** (Terminal 1):

```bash
# Navigate to backend
cd d:\Projects\FULL_STACK_DEVELOPMENT\placement_hub\backend

# Install dependencies (first time only)
npm install

# Create admin user (first time only)
npm run create-admin

# Start backend server
npm start
```

**Expected Output:**
```
MongoDB Connected
Server running on port 5000
```

✅ Backend is running on http://localhost:5000

### Step 3: Frontend Setup

Open **New Command Prompt** or **PowerShell** (Terminal 2):

```bash
# Navigate to frontend
cd d:\Projects\FULL_STACK_DEVELOPMENT\placement_hub\frontend

# Install dependencies (first time only)
npm install

# Start frontend server
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view campushire-frontend in the browser.
Local: http://localhost:3000
```

✅ Frontend is running on http://localhost:3000

Browser will automatically open!

---

## 🎯 First Login

### Admin Login:
- **URL**: http://localhost:3000
- **Email**: admin@campushire.com
- **Password**: admin123

---

## 🧪 Create Test Data

### 1. Create Mentor:
- Click "Create Mentor"
- Name: Dr. John Smith
- Email: mentor@test.com
- Password: mentor123
- Click "Create"

### 2. Create Student:
- Click "Create Student"
- Name: Alice Johnson
- Email: student@test.com
- Password: student123
- CGPA: 8.5
- Skills: JavaScript, React, Node.js
- Click "Create"

### 3. Create Drive:
- Click "Create Drive"
- Company: Google
- Min CGPA: 7.5
- Required Skills: JavaScript, React
- Deadline: 2024-12-31
- Click "Create"

### 4. Assign Mentor:
- Click "Assign Mentor"
- Select Student: Alice Johnson
- Select Mentor: Dr. John Smith
- Click "Assign"

---

## 🔄 Test All Roles

### Test Student:
1. Logout
2. Login: student@test.com / student123
3. View dashboard with readiness score
4. See eligible drives

### Test Mentor:
1. Logout
2. Login: mentor@test.com / mentor123
3. View assigned students
4. Add remarks

---

## 🛑 Stop Servers

### Stop Backend:
- Go to Terminal 1
- Press `Ctrl + C`

### Stop Frontend:
- Go to Terminal 2
- Press `Ctrl + C`

---

## 🔧 Troubleshooting

### MongoDB not running?
```bash
net start MongoDB
```

### Port 5000 busy?
```bash
npx kill-port 5000
npm start
```

### Port 3000 busy?
```bash
npx kill-port 3000
npm start
```

### Can't login?
```bash
# Recreate admin user
cd backend
npm run create-admin
```

### Dependencies error?
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

---

## 📱 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **MongoDB**: mongodb://localhost:27017/campushire_pro

---

## ✅ Verification Checklist

- [ ] MongoDB is running
- [ ] Backend started (port 5000)
- [ ] Frontend started (port 3000)
- [ ] Can access http://localhost:3000
- [ ] Can login as admin
- [ ] Can create mentor
- [ ] Can create student
- [ ] Can create drive

---

## 🎉 You're Ready!

Your CampusHire Pro application is now running!

**Next Steps:**
- Explore the admin dashboard
- Create test users
- Test different roles
- Check API documentation in API_TESTING.md

**Need Help?**
- SETUP_GUIDE.md - Detailed setup
- README.md - Full documentation
- API_TESTING.md - API testing guide

---

## 📞 Quick Reference

### Default Credentials:
```
Admin:
Email: admin@campushire.com
Password: admin123

Test Mentor:
Email: mentor@test.com
Password: mentor123

Test Student:
Email: student@test.com
Password: student123
```

### Important Commands:
```bash
# Backend
cd backend
npm install          # Install dependencies
npm run create-admin # Create admin user
npm start           # Start server

# Frontend
cd frontend
npm install         # Install dependencies
npm start          # Start server

# MongoDB
net start MongoDB  # Start MongoDB (Windows)
mongosh           # Open MongoDB shell
```

---

**Status**: ✅ Production Ready
**Version**: 1.0.0
**Last Updated**: 2024

Happy Coding! 🚀
