import fs from "fs";

import imagekit from "../config/imageKit.js";
import Blog  from "../models/blog.model.js";

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);

        const imageFile = req.file;

        if (!title || !subTitle || !description || !category || !isPublished) {
            return res.json({ success: false, message: "Missing Required Fields" });
        }

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
        res.json({
            success: false,
            message: error.message
        });
    }
}