import fs from "fs";

import imagekit from "../config/imageKit.js";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);

        const imageFile = req.file;

        if (!imageFile) {
            return res.json({ success: false, message: "Image file is required" });
        }

        if (!title || !subTitle || !description || !category || isPublished === undefined) {
            return res.json({ success: false, message: "Missing Required Fields" });
        }

        console.log("imageFile:", imageFile);
        console.log("req.body.blog:", req.body.blog);

        const fileBuffer = fs.readFileSync(imageFile.path);

        // Upload Image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        // optimization through imagekit URL transformation
        const optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: "auto" },
                { format: "webp" },
                { width: "1280" },
            ]
        });

        const image = optimizedImageURL;

        await Blog.create({
            title, subTitle, description, category, image, isPublished
        });

        res.json({
            success: true,
            message: "Blog Added Successfully"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}

export const getAllBlogs = async (_, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true });

        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.json({ success: false, message: "Blog Not Found" });
        }

        res.json({ success: true, blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;

        await Blog.findByIdAndDelete(id);

        // delete all comments associated with the blog
        await Comment.deleteMany({blog: id});

        res.json({ success: true, message: "Blog Deleted Successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;

        const blog = await Blog.findById(id);

        blog.isPublished = !blog.isPublished;

        await blog.save();

        res.json({ success: true, message: "Blog Status Updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;

        await Comment.create({ blog, name, content });

        res.json({ success: true, message: "Comment Added for Review" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;

        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });

        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}