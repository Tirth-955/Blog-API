import express from "express";

import {
    getAllBlogsAdmin,
    getDashboard,
    getAllCommentsAdmin,
    deleteCommentById,
} from "../controllers/admin.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const adminRouter = express.Router();

adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.get("/comments", auth, getAllCommentsAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.get("/dashboard", auth, getDashboard);

export default adminRouter;