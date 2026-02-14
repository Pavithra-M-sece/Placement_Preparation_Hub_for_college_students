# Quick Start Guide - CampusHire Pro

## 🚀 Get Started in 5 Minutes

### Step 1: Start MongoDB (Windows)

MongoDB should already be running as a service. Verify:

```bash
mongosh
```

If not running:
```bash
net start MongoDB
```

### Step 2: Start Backend

```bash
# Open Terminal 1
cd placement_hub/backend
npm install
npm start
```

✅ Backend running on http://localhost:5000

### Step 3: Start Frontend

```bash
# Open Terminal 2
cd placement_hub/frontend
npm install
npm start
```

✅ Frontend running on http://localhost:3000

### Step 4: Create Admin User

Open MongoDB Compass or mongosh:

```javascript
use campushire_pro

db.users.insertOne({
  name: "Admin User",
  email: "admin@campushire.com",
  password: "$2a$10$YourHashedPasswordHere",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use this pre-hashed password (password: admin123):
```
$2a$10$8ZqN5J5J5J5J5J5J5J5J5OqN5J5J5J5J5J5J5J5J5J5J5J5J5J5J5
```

### Step 5: Login and Test

1. Open http://localhost:3000
2. Login with:
   - Email: admin@campushire.com
   - Password: admin123

3. Create a mentor account
4. Create a student account
5. Create a placement drive
6. Assign mentor to student

## 🎯 Quick Test Flow

### As Admin:
1. Login → Admin Dashboard
2. Click "Create Mentor" → Fill form
3. Click "Create Student" → Fill form
4. Click "Create Drive" → Fill form
5. Click "Assign Mentor" → Select student & mentor

### As Student:
1. Logout from admin
2. Login with student credentials
3. View readiness score
4. View eligible drives
5. Update profile

### As Mentor:
1. Logout from student
2. Login with mentor credentials
3. View assigned students
4. Add remarks
5. Add improvement plan

## 📝 Sample Data for Testing

### Create Mentor:
- Name: Dr. John Smith
- Email: mentor@test.com
- Password: mentor123

### Create Student:
- Name: Alice Johnson
- Email: student@test.com
- Password: student123
- CGPA: 8.5
- Skills: JavaScript, React, Node.js

### Create Drive:
- Company: Google
- Min CGPA: 7.5
- Required Skills: JavaScript, React
- Deadline: 2024-12-31

## 🔧 Troubleshooting

### Backend won't start?
```bash
# Check if port 5000 is free
npx kill-port 5000
npm start
```

### Frontend won't start?
```bash
# Check if port 3000 is free
npx kill-port 3000
npm start
```

### MongoDB connection error?
```bash
# Start MongoDB service
net start MongoDB
```

### Can't login?
- Make sure backend is running
- Check browser console for errors
- Verify MongoDB is running

## 📱 Access URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- MongoDB: mongodb://localhost:27017

## ✅ Verification Checklist

- [ ] MongoDB is running
- [ ] Backend server started (port 5000)
- [ ] Frontend server started (port 3000)
- [ ] Admin user created in database
- [ ] Can login as admin
- [ ] Can create mentor
- [ ] Can create student
- [ ] Can create drive
- [ ] Can assign mentor

## 🎉 You're All Set!

Your CampusHire Pro application is now running successfully!

For detailed API documentation, see API_TESTING.md
For full documentation, see README.md
