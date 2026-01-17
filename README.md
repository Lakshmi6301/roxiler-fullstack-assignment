FullStack Intern Coding Challenge

This project is a full-stack web application built as part of the Roxiler FullStack Intern Coding Challenge.  
The application allows users to submit ratings for stores and supports role-based access for System Administrators, Normal Users, and Store Owners.

---

## Tech Stack

Backend:
- Node.js
- Express.js
- SQLite
- JWT Authentication
- bcrypt

Frontend:
- React.js
- React Router
- Axios
- CSS (custom styling)

---


## User Roles and Features

### System Administrator
- Login using admin credentials
- Dashboard showing:
  - Total number of users
  - Total number of stores
  - Total number of submitted ratings
- Create new users (admin, normal user, store owner)
- Create new stores and assign store owners
- View list of users
- View list of stores with average ratings
- Logout

### Normal User
- Signup through registration page
- Login
- View list of all registered stores
- Search stores by name and address
- View overall store rating
- Submit ratings (1 to 5)
- Update previously submitted ratings
- Logout

### Store Owner
- Login
- Dashboard displaying:
  - Store name
  - Average store rating
  - List of users who submitted ratings
- Logout

---

## Database Design

The database is designed using SQLite and follows normalization best practices.

Tables:
- Users
- Stores
- Ratings

Key points:
- Passwords are securely hashed using bcrypt
- Ratings are unique per user per store
- Average ratings are calculated dynamically using SQL queries

---

## Project Setup Instructions

### Backend Setup

cd backend
npm install
npm run dev

Frontend runs on:
http://localhost:3000



## Credentials

Admin:
- Email: admin@roxiler.com
- Password: Admin@123

Normal User:
- Email: user1@test.com
- Password: User@1234

Store Owner:
- Email: owner1@test.com
- Password: Owner@1234

---

## API Endpoints Overview

Auth:
- POST /api/auth/login
- POST /api/auth/signup

Admin:
- GET /api/admin/dashboard
- POST /api/admin/users
- GET /api/admin/users
- POST /api/admin/stores
- GET /api/admin/stores

User:
- GET /api/user/stores
- POST /api/user/ratings

Store Owner:
- GET /api/owner/dashboard

---

## Notes

- JWT is used for authentication and role-based authorization
- Frontend and backend validations are implemented
- Clean and modular code structure is followed
- The project fully satisfies the assignment requirements

---

## Other

Author: Venkata Lakshmi Karri