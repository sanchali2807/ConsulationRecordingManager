# Consultation Recording Manager

## Overview

Consultation Recording Manager is a full-stack web application that allows consultants to securely upload, manage, organize, and review consultation recordings.

The application supports authentication, audio uploads, recording management, search and filtering, note-taking, tagging, archiving, and audio playback.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Persistent Login using Local Storage
* Logout Functionality

### Recording Management

* Upload MP3 recordings
* Store audio files in Cloudinary
* Save metadata in MongoDB
* View recording details
* Edit recording title
* Add/Edit notes
* Add/Edit tags
* Archive recordings
* Delete recordings

### Dashboard

* List all recordings
* Search by title
* Search by client name
* Filter by status
* Filter by date range
* Pagination
* Statistics Cards

### User Experience

* Responsive UI
* Dark Theme
* Royal Blue Gradient Design
* Modern Cards
* Audio Playback
* Empty State Screens
* Error Handling
* Form Validation

---

## Tech Stack

### Frontend

* React (Vite)
* React Router v6
* Axios
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT
* bcryptjs

### File Uploads

* Multer
* Cloudinary

### Security

* Helmet
* CORS
* Rate Limiting
* Morgan Logging

---

## Project Structure

src/
├── components/
├── context/
├── pages/
├── services/
├── assets/

server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/

---

## Installation

### Clone Repository

git clone https://github.com/sanchali2807/ConsulationRecordingManager.git

cd consultation-recording-manager

---

### Backend Setup

cd backend

npm install

Create a .env file:

PORT=8081

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

Run Backend:

npm run dev

---

### Frontend Setup

cd frontend

npm install

npm run dev

---

## Available Commands

### Backend

npm install

npm run dev

npm start

### Frontend

npm install

npm run dev

npm run build

npm run preview

---

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### Recordings

GET /api/recordings

GET /api/recordings/:id

POST /api/recordings

PUT /api/recordings/:id

DELETE /api/recordings/:id

---

## Future Improvements

* Role-Based Access Control
* Dashboard Analytics
* Recording Duration Statistics
* Multiple Notes Support
* Multiple Tags Management UI
* Advanced Search Filters
* Cloudinary Folder Management
* Export Functionality

---

## Author

Developed as part of a Full Stack Development Assessment Project.
