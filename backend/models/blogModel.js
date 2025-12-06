import mongoose from "mongoose";    
import { Schema } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  author: {
    type: String,
    default: "Admin",
  },
});

const   BLOG = mongoose.model("BLOG", blogSchema);

export default BLOG;