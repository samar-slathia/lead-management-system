Lead Management System

A full-stack Lead Management System built using the MERN stack. It allows teams to capture, manage, assign, track, and update leads through different stages of the sales process.

🚀 Features

- User authentication with JWT
- Role-based access control for Admin and Member
- Create and manage leads
- Public lead capture form
- Lead status management
- Assign leads to team members
- Add notes to leads
- Lead activity tracking
- Search, filtering, and pagination
- Protected API routes
- Server-side validation
- Password hashing using bcrypt
- RESTful API
- Responsive React frontend
- MongoDB database

👥 User Roles

Admin

- Create, view, update, and delete leads
- Assign leads to members
- Change lead status
- Add notes
- View and manage the complete lead pipeline

Member

- View assigned leads
- Update lead information
- Change lead status
- Add notes
- Track lead activity

🛠️ Tech Stack

Frontend

- React.js
- Vite
- JavaScript
- CSS

Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt
- REST API

Database

- MongoDB
- MongoDB Atlas

Tools

- Git & GitHub
- Postman
- Vercel / Free-tier deployment services

📂 Project Structure

lead-management-system/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── README.md

🔐 Authentication

The application uses JWT-based authentication.

After successful login, the server returns a JWT token that is used to authenticate protected API requests.

Passwords are securely hashed using bcrypt before being stored in the database.

📊 Lead Pipeline

Leads can move through different stages such as:

New → Contacted → Qualified → Converted
                    ↓
                  Lost

The status can be updated according to the user's role and permissions.

🔌 API

The backend provides RESTful APIs for:

- Authentication
- Lead creation
- Lead retrieval
- Lead updates
- Lead deletion
- Lead status updates
- Lead assignment
- Lead notes
- Lead activity tracking

API requests and responses were tested using Postman.

⚙️ Environment Variables

Create a ".env" file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Do not commit your ".env" file to GitHub.

💻 Installation

1. Clone the repository

git clone https://github.com/your-username/lead-management-system.git
cd lead-management-system

2. Install backend dependencies

cd backend
npm install

3. Configure environment variables

Create a ".env" file and add your MongoDB connection string and JWT secret.

4. Start the backend

npm run dev

The backend will run on:

http://localhost:5000

5. Install frontend dependencies

Open another terminal:

cd frontend
npm install

6. Start the frontend

npm run dev

The frontend will run on the Vite development server, usually:

http://localhost:5173

🧪 Testing

The API was tested using Postman, including:

- User registration
- Login
- Protected routes
- Lead creation
- Lead retrieval
- Lead status updates
- Lead assignment
- Notes
- Role-based authorization
- Validation and error responses

🔒 Security

The project includes:

- JWT authentication
- Password hashing with bcrypt
- Protected backend routes
- Role-based authorization
- Environment variables for sensitive configuration
- Server-side validation
- Permission checks on protected operations

🎯 What I Learned

While building this project, I worked with:

- MERN stack development
- REST API development
- JWT authentication
- Role-based authorization
- MongoDB data modeling
- Express middleware
- React component-based development
- API integration
- Error handling and validation
- Git and GitHub
- Deployment and testing

🚀 Future Improvements

Some improvements that can be added in the future:

- Email notifications
- Advanced analytics and dashboards
- Real-time lead updates
- Automated lead assignment
- File attachments
- Detailed sales reports
- Advanced search and filtering
- Docker support
- Automated CI/CD pipeline

📌 Project Purpose

This project was developed as a practical full-stack application to demonstrate my understanding of the MERN stack, backend API development, authentication, authorization, database management, and frontend-backend integration.

---

Built with the MERN Stack

Built for Digital Heroes Training Task
