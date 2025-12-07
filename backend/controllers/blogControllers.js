import BLOG from "../models/blogModel.js";

const addBlog = async (req, res) => {
    try {
       
        const { title, content, image } = req.body;
        const blog = new BLOG({ title, content, image });        
        await blog.save();
        res.status(201).json({success:true, data: blog });
    } catch (error) {
        res.status(500).json({success:false,  message:error.message });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BLOG.find();
        res.status(200).json({sucess:true, data: blogs });
    } catch (error) {
        res.status(500).json({success:false,  message:error.message });
    }
};

const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await BLOG.findById(id);
        if (!blog) {
            return res.status(404).json({success:false, message: "Blog not found" });
        }
        res.status(200).json({sucess:true, data: blog });
    } catch (error) {
        res.status(500).json({success:false,  message:error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, image } = req.body;
        const blog = await BLOG.findByIdAndUpdate(id, { title, content, image }, { new: true });
        if (!blog) {
            return res.status(404).json({success:false, message: "Blog not found" });
        }
        res.status(200).json({sucess:true, data: blog });
    } catch (error) {
        res.status(500).json({success:false,  message:error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await BLOG.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({success:false, message: "Blog not found" });
        }
        res.status(200).json({sucess:true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({success:false,  message:error.message });
    }
};
















export { addBlog, getAllBlogs, getSingleBlog , updateBlog, deleteBlog};
