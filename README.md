# Blogsmith: A Modern Full-Stack Blogging Platform

Blogsmith is a sleek, full-stack blogging application built with the MERN stack (MongoDB, Express, React, Node.js). It features a unified authentication system, personalized user dashboards, and a rich Markdown editor for creating beautiful blog posts.

## ✨ Core Features

*   **Unified Authentication**: A single, secure login for both regular users and administrators.
*   **Role-Based Dashboards**: Users get a personalized dashboard to manage their own content, while admins have a global view of all blogs and comments.
*   **Rich Text Editing**: Create and edit blog posts using a powerful built-in Markdown editor.
*   **Complete Blog Management**: Full CRUD (Create, Read, Update, Delete) functionality for blog posts.
*   **Image Uploads**: Seamlessly upload and manage blog images, optimized through ImageKit.
*   **Commenting System**: Engage with readers through a blog-specific commenting feature.

## 🛠️ Tech Stack

**Frontend:**
*   React 18 (with Vite)
*   Tailwind CSS
*   React Router
*   Axios

**Backend:**
*   Node.js & Express
*   MongoDB & Mongoose
*   JSON Web Tokens (JWT)
*   ImageKit for image hosting

## 🚀 Getting Started

Follow these steps to get the project running locally.

### Prerequisites

*   Node.js (v16 or higher)
*   MongoDB (local instance or a cloud service like MongoDB Atlas)
*   An ImageKit.io account for image uploads.

### Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Tirth-955/Blogsmith.git
    cd Blogsmith
    ```

2.  **Install Dependencies**
    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3.  **Configure Environment Variables**

    Create a `.env` file in the `backend` directory and add the following:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
    IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
    IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
    ```

    Create a `.env` file in the `frontend` directory:
    ```env
    VITE_BACKEND_URL=http://localhost:3000
    ```

4.  **Run the Application**

    You will need two separate terminals to run both the frontend and backend servers.

    *   **Terminal 1: Start the Backend**
        ```bash
        cd backend
        npm start
        ```

    *   **Terminal 2: Start the Frontend**
        ```bash
        cd frontend
        npm run dev
        ```

    The application will be available at `http://localhost:5173`.

## 🎯 API Endpoints

The application exposes the following REST API resources:

*   `POST /api/user/register` - Register a new user.
*   `POST /api/user/login` - Log in a user or admin.
*   `GET /api/blog/all` - Get all published blogs.
*   `GET /api/blog/:id` - Get a single blog by its ID.
*   `POST /api/blog/add` - Create a new blog (auth required).
*   `PUT /api/blog/update/:blogId` - Update an existing blog (auth required).
*   `POST /api/blog/delete` - Delete a blog (auth required).
*   `GET /api/admin/dashboard` - Get dashboard statistics (auth required).
*   `GET /api/admin/blogs` - Get all blogs for the logged-in user/admin (auth required).
*   `GET /api/admin/comments` - Get all comments for the logged-in user/admin (auth required).


<!-- ## 📄 License
This project is licensed under the MIT License. -->
