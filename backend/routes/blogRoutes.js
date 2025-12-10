import express from "express";
import { addBlog,getAllBlogs,getSingleBlog,updateBlog,deleteBlog } from "../controllers/blogControllers.js";
import {storage, uploadImage} from "../controllers/uploadController.js"
import sendEmail from "../configue/email.js";
import multer from 'multer';

const upload = multer({ storage });

const router = express.Router();
router.post("/blogs", addBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getSingleBlog);
router.put("/blogs/:id", updateBlog);
router.delete("/blogs/:id", deleteBlog);
router.post("/upload", upload.single('image'), uploadImage);
router.post("/sendEmail", sendEmail);


export default router;