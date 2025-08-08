# MultiBlog - Unified Blog Platform

A modern, full-stack blog application with unified authentication system where each user gets their own personalized dashboard.

## 🚀 Features

### Unified Authentication System
- **Single Login**: One login form for both regular users and admins
- **Personal Dashboards**: Each user gets their own dashboard with their content
- **Role-Based Access**: Admins see all content, users see only their own
- **Secure Operations**: Users can only modify their own blogs

### Blog Management
- **Create & Edit**: Rich blog creation with image uploads
- **Publish/Draft**: Toggle blog publication status
- **Categories**: Organize blogs by categories
- **Image Optimization**: Automatic image optimization via ImageKit

### User Experience
- **Responsive Design**: Modern UI that works on all devices
- **Real-time Updates**: Instant feedback for all operations
- **User-Friendly**: Intuitive navigation and clear interfaces

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **React Hot Toast** for notifications
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Multer** for file uploads
- **ImageKit** for image optimization
- **bcryptjs** for password hashing

## 📁 Project Structure

```
Blog-App-git/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # App context
│   │   └── assets/         # Static assets
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Custom middlewares
│   │   └── config/         # Configuration files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- ImageKit account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Blog-App-git
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```

   Create `.env` file in the frontend directory:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```

5. **Start the application**

   Start backend:
   ```bash
   cd backend
   npm start
   ```

   Start frontend (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

## 👥 User Types & Access

### Regular Users
- Register at `/register`
- Access personal dashboard at `/admin`
- Can create, edit, and manage their own blogs
- See only their blogs and comments

### Admin Users
- Register at `/adminregister`
- Access admin dashboard at `/admin`
- Can see and manage all blogs across the platform
- Have full administrative privileges

## 🔐 Authentication Flow

1. **Registration**: Users choose between regular or admin registration
2. **Login**: Single login form authenticates both user types
3. **Dashboard Access**: All users get dashboard access with role-based content
4. **Security**: JWT tokens with role information for authorization

## 📱 Key Routes

- `/` - Home page with all published blogs
- `/login` - Unified login for all users
- `/register` - Regular user registration
- `/adminregister` - Admin user registration
- `/admin` - Personal/Admin dashboard
- `/blog/:id` - Individual blog view

## 🎯 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - Unified login
- `POST /api/admin/register` - Admin registration

### Blog Management
- `POST /api/blog/add` - Create new blog
- `GET /api/blog/all` - Get all published blogs
- `GET /api/blog/:id` - Get specific blog
- `POST /api/blog/delete` - Delete blog
- `POST /api/blog/toggle-publish` - Toggle blog status

### Dashboard
- `GET /api/admin/dashboard` - Get dashboard data
- `GET /api/admin/blogs` - Get user/admin blogs
- `GET /api/admin/comments` - Get comments

## 🔧 Development

### Adding New Features
1. Create controller functions in `backend/src/controllers/`
2. Add routes in `backend/src/routes/`
3. Create frontend components in `frontend/src/components/`
4. Update context if needed

### Database Schema
- **Users**: name, email, password, role
- **Blogs**: title, subTitle, description, category, image, isPublished, user
- **Comments**: blog, name, content, isApproved

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or Vercel

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React, Node.js, and MongoDB**
