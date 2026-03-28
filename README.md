# Multimedia-Upload-Search
Manish123567/Multimedia-Upload-and-Search
# 🚀 File Upload & Search System (MERN Stack)

A full-stack web application where users can register, login, upload files, search files, and track file views.

---

## 🔥 Features

- 🔐 User Authentication (Register/Login with JWT)
- 📤 File Upload (Image, Video, Audio, PDF)
- ☁️ Cloudinary Integration for file storage
- 🔍 Search Files by Title & Tags
- 👀 File View Counter (increments on detail page)
- 🏷️ Tagging System
- 🎯 Sorting (Views + Latest)
- ⚡ Responsive UI
- 🔔 Toast Notifications (Success/Error)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Other Tools
- Cloudinary (File Storage)
- JWT (Authentication)
- Multer (File Upload)

---

## 📂 Project Structure
/backend
  ├─ models
  ├─ routes
  ├─ controllers
  ├─ middleware
  ├─ config
  ├─ uploads
  └─ index.js
/frontend/assesment
  ├─ src
  │   ├─ components
  │   ├─ features
  │   ├─ pages
  │   ├─ app
  │   └─ App.js

  ---
  
### Backend Setup
- cd backend
- npm install

---

### Create a .env file in backend folder with these variables:
- MONGO_URI=your_mongodb_connection_string
- CLOUDINARY_CLOUD_NAME=your_cloud_name
- CLOUDINARY_API_KEY=your_api_key
- CLOUDINARY_API_SECRET=your_api_secret
- JWT_SECRET=your_jwt_secret
- PORT=5000

---

### Start the backend server
- npm run dev

---

### Frontend Setup
- cd frontend
- cd assesment
- npm install

---

### Start the frontend server
- npm run dev

---

## File APIs
### Upload
- POST   /api/files/upload

### Search
- GET    /api/files/search

### Increment
- PATCH   /api/files/:id/view
  
---

## User APIs
### Register
- POST   /api/auth/register

### Login
- POST    /api/auth/login

---

## 🌐 Live Demo & API

You can try the working application online and test the backend APIs here:

### 🔗 Frontend Demo (Netlify)
You can try the working application online here: 
https://app.netlify.com/projects/peppy-dieffenbachia-f3349d/overview

### 🔗 Backend API (Render)
Interact with the deployed backend:  
https://multimedia-upload-search.onrender.com
  
