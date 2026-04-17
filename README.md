# 🌍 WanderLust — Travel Listing & Accommodation Platform

## 📌 Overview

**WanderLust** is a full-stack travel accommodation platform that allows users to explore, create, and manage property listings. The application enables hosts to publish stays while travelers can browse destinations, view detailed property information, and interact with listings through a clean and responsive interface.

The project focuses on implementing modern **full-stack development practices**, RESTful architecture, authentication workflows, and scalable database integration.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User registration and login system
* Secure session management
* Protected routes for authorized users
* Role-based listing ownership

### 🏡 Listings Management

* Create new property listings
* Edit and delete listings
* Image upload support
* Location and price details
* Individual listing pages

### 🔎 Browse & Explore

* View all available stays
* Detailed property information
* Responsive listing cards
* Clean and intuitive UI design

### ⭐ Reviews System

* Add reviews to listings
* Delete own reviews
* User-linked feedback system

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)
* EJS Templating Engine
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose ODM

### Authentication & Security

* Passport.js
* Express Session
* MongoDB Store

### Other Tools

* RESTful Routing
* MVC Architecture
* Git & GitHub Version Control

---

## 📂 Project Structure

```
WanderLust/
│
├── models/        # Database schemas
├── routes/        # Express routes
├── controllers/   # Business logic
├── views/         # EJS templates
├── public/        # Static assets (CSS, JS, Images)
├── app.js         # Application entry point
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/AAKANKSHA45/WanderLust.git
cd WanderLust
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file and add:

```
DATABASE_URL=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

### 4️⃣ Run Application

```bash
node app.js
```

or (development mode):

```bash
nodemon app.js
```

---

## 🌐 Application Workflow

1. Users register/login
2. Hosts create listings
3. Travelers browse properties
4. Users add reviews & interact with listings

---

## 🎯 Learning Objectives

This project focuses on:

* Full-stack web development
* REST API design
* Authentication implementation
* Database modeling
* MVC project structuring
* Production-ready coding practices

---

## 📈 Future Enhancements

* Advanced search & filtering
* Map integration
* Booking management system
* Payment gateway integration
* Cloud image storage
* Deployment & CI/CD pipeline

---

## 👩‍💻 Author

**Aakanksha Yadav**
B.Tech CSE Student | Aspiring Software Engineer

---

## 📄 License

This project is licensed under the MIT License.

---

⭐ *If you like this project, consider giving it a star!*
