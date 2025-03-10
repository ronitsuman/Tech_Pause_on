# TechPause

TechPause ek **digital detox aur mindful living** platform hai jahan users **signup, login, aur email verification** ke zariye apni journey shuru karte hain. Users ek **engaging landing page** ke through curated content dekh sakte hain jo unki technology usage ko balance karne me madad karta hai.

## 🚀 Tech Stack

### Frontend:
- **React.js**
- **Vite** (Fast build tool for React)
- **Tailwind CSS**
- **Framer Motion** (Smooth animations)
- **React Router v6** (Modern Routing)
- **React Icons**
- **Axios** (HTTP Requests)
- **React Toastify** (Notifications)

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB** (Database)
- **JWT (JSON Web Token)** (Authentication)
- **Cookie-based Authentication**
- **CORS** (Cross-Origin Resource Sharing)
- **Bcrypt.js** (Password Hashing)
- **Nodemailer** (Email sending for OTP verification)

### Responsive Design:
- Fully responsive for **mobile, tablet, and desktop devices**

## 🚀 Landing Page UI Development

Is project me ek **modern aur interactive landing page** develop kiya gaya hai jo **React** aur **Tailwind CSS** ka use karta hai. Isme **smooth animations aur structured components** hain.

### 📌 Steps to Create the UI

#### 1️⃣ Install Dependencies
Run the following command to install necessary packages:
```sh
npm install react tailwindcss axios react-toastify react-router-dom framer-motion lucide-react react-icons
```

#### 2️⃣ Set Up Modern Routing (React Router v6+)
- **Implemented createBrowserRouter & RouterProvider for better routing**

#### 3️⃣ Component-Based Structure
Created reusable components:
- **Cards.jsx** → For displaying various info cards.
- **TestimonialCard.jsx** → To showcase user testimonials.
- **JourneyCard.jsx** → For visualizing user journey.

#### 4️⃣ Pages Directory
All pages are structured inside the **pages/** directory:
- `LandingPage.jsx`
- `LoginPage.jsx`
- `SignupPage.jsx`

#### 5️⃣ Landing Page Animations
Applied **Framer Motion** for smooth animations:
- **Hero section animation**
- **Testimonial Card transitions**
- **Journey Card motion effects**

## 🔑 Authentication & Authorization

### ✨ Signup API
- Saves password **after hashing** using bcrypt.
- Sends **email verification token** using crypto.
- Sends verification mail using **Nodemailer**.

### ✉️ Verify Email API
- Uses **token and user ID** as URL parameters for verification.

### 🔓 Login API
- JWT Token **is sent as a cookie** when a user logs in.
- Before login, **hashed password** is verified using `bcrypt.compare`.

### 🔄 Password Reset Flow
#### ✅ Verify Email & Send OTP
- Checks in the database if the user exists.
- Sends OTP via email using **Nodemailer**.

#### 🔢 Verify OTP
- **Verifies email first**.
- Matches user-entered OTP with the one stored in the database.

#### 🔒 Reset Password
- Uses **email to identify the user**.
- Hashes the **new password** using `bcrypt` before saving it.
- After encryption, the **new password is stored securely**.

## 📂 Folder Structure

```
TechPause/
│── client/
│   │── src/
│   │   ├── PAges/  # React Pages
│   │   │   ├── Landing.jsx  # Homepage
│   │   │   ├── Login.jsx  # User Login
│   │   │   ├── Signup.jsx  # User Registration
│   │   │   ├── DashBoard.jsx  # User Dashboard
│   │   │   ├── ForgotPassword.jsx  # Password Reset
│   │   ├── Components/  # UI Components
│   │   │   ├── Navbar.jsx, Header.jsx, SideBar.jsx  # Navigation Elements
│   │   │   ├── BlogCard.jsx, TestimonialCard.jsx, JorneyCard.jsx  # Content Blocks
│   │   │   ├── Buttons.jsx, Card.jsx  # Reusable UI Elements
│   │   ├── assets/  # Images & Icons
│   │   ├── App.jsx  # Main App Component
│   │── public/  # Static Assets (Background images, logos)
│   │── vite.config.js  # Vite Configuration
│
│── server/
│   │── config/
│   │   ├── dbConnection.js  # MongoDB connection setup
│   │── controllers/
│   │   ├── User.controller.js  # Handles user-related logic
│   │── middleware/
│   │   ├── authchecker.js  # JWT authentication middleware
│   │── models/
│   │   ├── User.model.js  # User schema
│   │── routes/
│   │   ├── User.route.js  # User authentication routes
│   │── services/
│   │   ├── generateOtp.js  # OTP generation logic
│   │   ├── nodemailer.js  # Email sending logic
│   │── utils/
│   │   ├── asyncHandler.js  # Async error handling
│   │   ├── Error.js  # Custom error handler
│── package.json  # Project dependencies
```

## 📂 Installation & Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/ronitsuman/Tech_Pause_on.git
   cd Tech_Pause_on
   ```

2. **Install dependencies**
   ```sh
   # Install frontend dependencies
   cd client
   npm install
   
   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Setup environment variables (.env)**
   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. **Run the development server**
   ```sh
   # Start backend
   cd server
   npm start
   
   # Start frontend
   cd client
   npm run dev
   ```


currently in process which includes here later whrn i update the function they will be added here

