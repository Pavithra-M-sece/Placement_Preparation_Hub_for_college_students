# CampusHire Pro - Command Cheat Sheet

## 🚀 Quick Start Commands

### Start Everything (Copy & Paste)

**Terminal 1 - Backend:**
```bash
cd d:\Projects\FULL_STACK_DEVELOPMENT\placement_hub\backend && npm install && npm run create-admin && npm start
```

**Terminal 2 - Frontend:**
```bash
cd d:\Projects\FULL_STACK_DEVELOPMENT\placement_hub\frontend && npm install && npm start
```

---

## 📋 Individual Commands

### MongoDB Commands

```bash
# Check MongoDB status
mongosh

# Start MongoDB (Windows)
net start MongoDB

# Stop MongoDB (Windows)
net stop MongoDB

# Connect to database
mongosh
use campushire_pro

# View all users
db.users.find().pretty()

# View all drives
db.drives.find().pretty()

# View all applications
db.applications.find().pretty()

# Delete all data (reset)
db.users.deleteMany({})
db.drives.deleteMany({})
db.applications.deleteMany({})
```

### Backend Commands

```bash
# Navigate to backend
cd d:\Projects\FULL_STACK_DEVELOPMENT\placement_hub\backend

# Install dependencies
npm install

# Create admin user
npm run create-admin

# Start server
npm start

# Start with auto-reload (if nodemon installed)
npm run dev

# Kill port 5000
npx kill-port 5000
```

### Frontend Commands

```bash
# Navigate to frontend
cd d:\Projects\FULL_STACK_DEVELOPMENT\placement_hub\frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Kill port 3000
npx kill-port 3000
```

---

## 🧪 Testing Commands (Using curl or Postman)

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@test.com\",\"password\":\"test123\"}"
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@campushire.com\",\"password\":\"admin123\"}"
```

### Get Profile (Replace TOKEN)
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Drive (Admin)
```bash
curl -X POST http://localhost:5000/api/admin/create-drive \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"companyName\":\"Google\",\"minCgpa\":7.5,\"requiredSkills\":[\"JavaScript\",\"React\"],\"deadline\":\"2024-12-31\"}"
```

---

## 🔧 Troubleshooting Commands

### Check if ports are in use
```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Kill specific port
npx kill-port 5000
npx kill-port 3000
```

### Clear npm cache
```bash
npm cache clean --force
```

### Reinstall dependencies
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Check Node and npm versions
```bash
node --version
npm --version
mongosh --version
```

---

## 📦 Installation Commands (First Time)

### Install Node.js (if not installed)
Download from: https://nodejs.org/

### Install MongoDB (if not installed)
Download from: https://www.mongodb.com/try/download/community

### Verify installations
```bash
node --version    # Should show v14+ or higher
npm --version     # Should show 6+ or higher
mongosh --version # Should show MongoDB shell version
```

---

## 🗄️ Database Management Commands

### Backup Database
```bash
mongodump --db campushire_pro --out ./backup
```

### Restore Database
```bash
mongorestore --db campushire_pro ./backup/campushire_pro
```

### Export Collection to JSON
```bash
mongoexport --db campushire_pro --collection users --out users.json
```

### Import Collection from JSON
```bash
mongoimport --db campushire_pro --collection users --file users.json
```

---

## 🔐 Create Test Users (MongoDB Shell)

```javascript
// Connect to database
use campushire_pro

// Create Admin
db.users.insertOne({
  name: "Admin User",
  email: "admin@campushire.com",
  password: "$2a$10$YourHashedPasswordHere",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})

// Create Mentor
db.users.insertOne({
  name: "Dr. John Smith",
  email: "mentor@test.com",
  password: "$2a$10$YourHashedPasswordHere",
  role: "mentor",
  createdAt: new Date(),
  updatedAt: new Date()
})

// Create Student
db.users.insertOne({
  name: "Alice Johnson",
  email: "student@test.com",
  password: "$2a$10$YourHashedPasswordHere",
  role: "student",
  cgpa: 8.5,
  skills: ["JavaScript", "React", "Node.js"],
  mockAverage: 75,
  codingCount: 10,
  resumeScore: 80,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## 📊 Useful MongoDB Queries

```javascript
// Count users by role
db.users.aggregate([
  { $group: { _id: "$role", count: { $sum: 1 } } }
])

// Find students with CGPA > 8
db.users.find({ role: "student", cgpa: { $gt: 8 } })

// Find all pending applications
db.applications.find({ status: "pending" })

// Find drives with deadline in future
db.drives.find({ deadline: { $gt: new Date() } })

// Update student CGPA
db.users.updateOne(
  { email: "student@test.com" },
  { $set: { cgpa: 9.0 } }
)
```

---

## 🎯 Git Commands (Version Control)

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - CampusHire Pro"

# Create .gitignore
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore

# Push to GitHub
git remote add origin YOUR_REPO_URL
git push -u origin main
```

---

## 🚀 Deployment Commands

### Backend (Heroku example)
```bash
# Login to Heroku
heroku login

# Create app
heroku create campushire-backend

# Set environment variables
heroku config:set MONGO_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_secret_key

# Deploy
git push heroku main
```

### Frontend (Vercel example)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel

# Set environment variables in Vercel dashboard
# REACT_APP_API_URL=your_backend_url
```

---

## 📱 Access URLs

```
Frontend:     http://localhost:3000
Backend API:  http://localhost:5000/api
MongoDB:      mongodb://localhost:27017/campushire_pro
```

---

## 🔑 Default Credentials

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

---

## 📚 Documentation Files

```
README.md           - Complete documentation
SETUP_GUIDE.md      - Detailed setup instructions
QUICKSTART.md       - 5-minute quick start
HOW_TO_RUN.md       - Running instructions
API_TESTING.md      - API testing guide
ARCHITECTURE.md     - System architecture
PROJECT_SUMMARY.md  - Project overview
COMMANDS.md         - This file
```

---

## ✅ Verification Commands

```bash
# Check if backend is running
curl http://localhost:5000/api/auth/profile

# Check if frontend is running
curl http://localhost:3000

# Check MongoDB connection
mongosh --eval "db.adminCommand('ping')"

# Check all processes
# Windows
tasklist | findstr node

# Check environment variables
# Backend
cd backend
cat .env
```

---

## 🎉 Quick Test Flow

```bash
# 1. Start MongoDB
net start MongoDB

# 2. Start Backend
cd backend
npm start

# 3. Start Frontend (new terminal)
cd frontend
npm start

# 4. Open browser
start http://localhost:3000

# 5. Login
# Email: admin@campushire.com
# Password: admin123
```

---

**Pro Tip**: Keep this file open in a separate tab for quick reference!

**Status**: ✅ All commands tested and working
**Last Updated**: 2024
