# Pages Created:
- Landing Page: Hero section, animations, journey cards,testimonial card .
-  Signup Page: Form, category selection, password toggle, .
## API Functionality:
# Database & Server Setup:
- Database Connection: Function to connect to the database.
- Route Handling: Separate section for routing.
- Server Initialization: Server runs through an eifi function.
- Async Handler: Handles asynchronous operations.
- Custom Error Handling: Manages errors effectively.
# Authentication & Authorization:
# Signup API
- Saves password after hashing using bcrypt.
- Sends email verification token using crypto.
- Sends verification mail using nodemailer.
# Verify Email API
- Uses token and ID as URL parameters for verification.
# Login API
- JWT Token is sent as a cookie when a user logs in.
- Before login, hashed password is verified using bcrypt.compare.

##  Password Reset Flow:

# Verify Email & Send OTP

- Checks in the database if the user exists.
- Sends OTP via email using nodemailer.
# Verify OTP

- Verifies email first.
- Matches user-entered OTP with the one stored in the database.
# Reset Password

- Uses email to identify the user.
- Hashes the new password using bcrypt before saving it to the database.
- After encryption, the new password is stored securely.
