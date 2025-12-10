#   📘 Blog Website – MERN Stack
    A full-stack blogging platform built using MongoDB, Express.js, React.js, and Node.js.
    Users can create, edit, delete, and view blog posts with rich-text editing and image uploads.

#   🚀 Features
    ✍️ Create, Edit, Delete blog posts
    📝 Rich Text Editor (Quill.js)
    🗂 Upload images (Multer + Node.js)
    📅 Store posts with title, content, author, and creation date
    🔐 User authentication (optional)
    ⚡ REST API backend
    🎨 Responsive React UI
    📡 Real-time loading spinner
    🌐 Fully functional CRUD system

# 📁 Project Structure
    blog-app/
    │
    ├── backend/
    |   ├── configue/
    |   |       └── connectDb.js
    |   |       └── email.js
    |   ├── controllers/
    |   |       └── blogControllers.js
    |   |       └── uploadController.js
    │   ├── server.js
    │   ├── routes/
    │   │   └── blogRoutes.js
    │   ├── models/
    │   │   └── blogModel.js
    │   ├── uploads/   // images stored here
    │   └── package.json
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── App.jsx
    │   │   ├── components/
    │   │   │   └── Editor.jsx
    │   │   │   └── Navbar.jsx
    │   │   │   └── BlogDetails.jsx
    │   │   │   └── BlogDetails.css
    │   │   │   └── UpdateBlog.jsx
    │   │   └── pages/
    │   │   │   └── Home/
    |   |   |   |   └── Home.jsx
    │   │   │   └── About/
    |   |   |   |   └── About.jsx
    │   │   │   └── Contact/
    |   |   |   |   └── Contact.jsx
    │   ├── public/ //tab icon
    │   └── package.json
    │
    └── README.md

#   🛠 Tech Stack
##      Frontend:
        React.js
        React Router
        Axios
        Quill.js (Rich Text Editor)
        Bootsrap
        React spinner
        React toastify
##      Backend:
        Node.js
        Express.js
        Multer (File Uploads)
        Nodemailer (Email Notifications)
        MongoDB + Mongoose

#   📦 Installation & Setup
    1️⃣ Clone the Repository
    git clone  https://github.com/Shamsherkhan7549/blog-app.git

    cd blog-app

#   2️⃣ Install Backend Dependencies
    cd backend
    npm install

#   3️⃣ Install Frontend Dependencies
    cd ../frontend
    npm install

#   ⚙️ Environment Variables

    Create a .env file in /backend:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_app_password

#   ▶️ Run the Project
    Start Backend
    cd backend
    npm run dev

#   Start Frontend
    cd frontend
    npm run dev

#   Your app will run on:
    Frontend: http://localhost:5173
    Backend: http://localhost:5000

#   🧪 API Endpoints
    Create a Blog
    POST /api/blogs

    Get All Blogs
    GET /api/blogs

    Get Single Blogs
    GET /api/blogs/:id

    Update a Blog
    PUT /api/blogs/:id

    Delete a Blog
    DELETE /api/blogs/:id

    Upload Image
    POST /api/upload

    Send Email
    POST /api/sendEmail

#   🤝 Contributing
    Pull requests are welcome.
    For major changes, open an issue first to discuss what you’d like to change.

#   ✨ Author
    Name: Shamsher Khan
    📧 Email: shamsher.khan7515@gmail.com
    