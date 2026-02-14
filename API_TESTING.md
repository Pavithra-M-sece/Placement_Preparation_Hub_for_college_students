# API Testing Guide - CampusHire Pro

## Testing with Postman or Thunder Client

### Base URL
```
http://localhost:5000/api
```

## 1. Authentication APIs

### Register Student
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### Get Profile
```
GET /auth/profile
Authorization: Bearer <token>

Response:
{
  "id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student",
  "cgpa": 8.5,
  "skills": ["JavaScript", "React"]
}
```

## 2. Admin APIs

### Create Mentor
```
POST /admin/create-mentor
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Dr. Smith",
  "email": "smith@example.com",
  "password": "mentor123"
}
```

### Create Student
```
POST /admin/create-student
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "student123",
  "cgpa": 8.5,
  "skills": ["Java", "Python"]
}
```

### Create Drive
```
POST /admin/create-drive
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "companyName": "Google",
  "minCgpa": 7.5,
  "requiredSkills": ["JavaScript", "React"],
  "deadline": "2024-12-31"
}
```

### Assign Mentor
```
POST /admin/assign-mentor
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "studentId": "student_id_here",
  "mentorId": "mentor_id_here"
}
```

### Get All Students
```
GET /admin/students
Authorization: Bearer <admin_token>
```

### Get All Mentors
```
GET /admin/mentors
Authorization: Bearer <admin_token>
```

### Get Analytics
```
GET /admin/analytics
Authorization: Bearer <admin_token>

Response:
{
  "totalStudents": 50,
  "totalMentors": 10,
  "totalDrives": 15,
  "totalApplications": 120,
  "applicationsByStatus": [
    { "_id": "pending", "count": 50 },
    { "_id": "shortlisted", "count": 30 }
  ]
}
```

## 3. Mentor APIs

### Get Assigned Students
```
GET /mentor/assigned-students
Authorization: Bearer <mentor_token>
```

### Get Student Readiness
```
GET /mentor/student/:studentId/readiness
Authorization: Bearer <mentor_token>

Response:
{
  "studentId": "...",
  "name": "John Doe",
  "cgpa": 8.5,
  "mockAverage": 75,
  "codingCount": 10,
  "resumeScore": 80,
  "readinessScore": 78
}
```

### Add Remarks
```
POST /mentor/student/:studentId/remarks
Authorization: Bearer <mentor_token>
Content-Type: application/json

{
  "remarks": "Good progress. Focus on data structures."
}
```

### Add Improvement Plan
```
POST /mentor/student/:studentId/improvement-plan
Authorization: Bearer <mentor_token>
Content-Type: application/json

{
  "improvementPlan": "Complete 50 coding problems in next 2 weeks"
}
```

## 4. Student APIs

### Update Profile
```
PUT /student/profile
Authorization: Bearer <student_token>
Content-Type: application/json

{
  "cgpa": 8.5,
  "skills": ["JavaScript", "React", "Node.js"],
  "mockAverage": 75,
  "codingCount": 10,
  "resumeScore": 80
}
```

### Get Readiness Score
```
GET /student/readiness
Authorization: Bearer <student_token>

Response:
{
  "cgpa": 8.5,
  "mockAverage": 75,
  "codingCount": 10,
  "resumeScore": 80,
  "readinessScore": 78
}
```

### Get Eligible Drives
```
GET /student/eligible-drives
Authorization: Bearer <student_token>

Response:
[
  {
    "_id": "...",
    "companyName": "Google",
    "minCgpa": 7.5,
    "requiredSkills": ["JavaScript", "React"],
    "deadline": "2024-12-31"
  }
]
```

### Apply for Drive
```
POST /student/apply
Authorization: Bearer <student_token>
Content-Type: application/json

{
  "driveId": "drive_id_here"
}
```

### Get My Applications
```
GET /student/applications
Authorization: Bearer <student_token>

Response:
[
  {
    "_id": "...",
    "drive": {
      "companyName": "Google",
      "minCgpa": 7.5
    },
    "status": "pending",
    "appliedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Get Assigned Mentor
```
GET /student/mentor
Authorization: Bearer <student_token>

Response:
{
  "_id": "...",
  "name": "Dr. Smith",
  "email": "smith@example.com"
}
```

## 5. Drive APIs

### Get All Drives
```
GET /drives
Authorization: Bearer <token>
```

### Get Drive by ID
```
GET /drives/:id
Authorization: Bearer <token>
```

## Testing Flow

### 1. Setup Admin
```bash
# Use MongoDB to create admin user first
# Then login as admin
POST /auth/login
{
  "email": "admin@campushire.com",
  "password": "admin123"
}
```

### 2. Create Mentor (as Admin)
```bash
POST /admin/create-mentor
Authorization: Bearer <admin_token>
{
  "name": "Dr. Smith",
  "email": "mentor@example.com",
  "password": "mentor123"
}
```

### 3. Create Student (as Admin)
```bash
POST /admin/create-student
Authorization: Bearer <admin_token>
{
  "name": "John Doe",
  "email": "student@example.com",
  "password": "student123",
  "cgpa": 8.5,
  "skills": ["JavaScript", "React"]
}
```

### 4. Create Drive (as Admin)
```bash
POST /admin/create-drive
Authorization: Bearer <admin_token>
{
  "companyName": "Google",
  "minCgpa": 7.5,
  "requiredSkills": ["JavaScript", "React"],
  "deadline": "2024-12-31"
}
```

### 5. Assign Mentor (as Admin)
```bash
POST /admin/assign-mentor
Authorization: Bearer <admin_token>
{
  "studentId": "<student_id>",
  "mentorId": "<mentor_id>"
}
```

### 6. Update Student Profile (as Student)
```bash
POST /auth/login
{
  "email": "student@example.com",
  "password": "student123"
}

PUT /student/profile
Authorization: Bearer <student_token>
{
  "cgpa": 8.5,
  "skills": ["JavaScript", "React"],
  "mockAverage": 75,
  "codingCount": 10,
  "resumeScore": 80
}
```

### 7. Check Eligible Drives (as Student)
```bash
GET /student/eligible-drives
Authorization: Bearer <student_token>
```

### 8. Apply for Drive (as Student)
```bash
POST /student/apply
Authorization: Bearer <student_token>
{
  "driveId": "<drive_id>"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "User already exists"
}
```

### 401 Unauthorized
```json
{
  "message": "No token"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "message": "Student not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Error message here"
}
```

## Notes

- All protected routes require `Authorization: Bearer <token>` header
- Tokens are valid for 7 days
- Role-based access is enforced on all protected routes
- CGPA should be between 0-10
- Skills should be comma-separated strings
- Dates should be in ISO format (YYYY-MM-DD)
