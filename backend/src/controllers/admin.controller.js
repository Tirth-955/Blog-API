import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";


export const getAllBlogsAdmin = async (req, res) => {
    try {
        let blogs;
        
        // If user is admin, show all blogs. If user, show only their blogs
        if (req.userRole === 'admin') {
            blogs = await Blog.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        } else {
            blogs = await Blog.find({ user: req.userId }).populate('user', 'name email').sort({ createdAt: -1 });
        }

        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getAllCommentsAdmin = async (req, res) => {
    try {
        let comments;
        
        // If user is admin, show all comments. If user, show comments on their blogs
        if (req.userRole === 'admin') {
            comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 });
        } else {
            const userBlogs = await Blog.find({ user: req.userId }).select('_id');
            const blogIds = userBlogs.map(blog => blog._id);
            comments = await Comment.find({ blog: { $in: blogIds } }).populate("blog").sort({ createdAt: -1 });
        }

        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;

        await Comment.findByIdAndDelete(id);

        res.json({ success: true, message: "Comment Deleted Successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export const getDashboard = async (req, res) => {
    try {
        let recentBlogs, blogs, comments, drafts;
        
        if (req.userRole === 'admin') {
            // Admin sees all data
            recentBlogs = await Blog.find({}).populate('user', 'name').sort({ createdAt: -1 }).limit(5);
            blogs = await Blog.countDocuments();
            comments = await Comment.countDocuments();
            drafts = await Blog.countDocuments({ isPublished: false });
        } else {
            // User sees only their data
            recentBlogs = await Blog.find({ user: req.userId }).populate('user', 'name').sort({ createdAt: -1 }).limit(5);
            blogs = await Blog.countDocuments({ user: req.userId });
            const userBlogs = await Blog.find({ user: req.userId }).select('_id');
            const blogIds = userBlogs.map(blog => blog._id);
            comments = await Comment.countDocuments({ blog: { $in: blogIds } });
            drafts = await Blog.countDocuments({ user: req.userId, isPublished: false });
        }

        const dashboardData = {
            recentBlogs, blogs, comments, drafts
        }

        res.json({ success: true, dashboardData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
