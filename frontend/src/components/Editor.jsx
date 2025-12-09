import React, { useState, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL;
export default function Editor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();
  const quillRef = useRef(null);

  // Image Upload Handler
  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      const {data} = await axios.post(`${url}/api/upload`, formData);
      
      if(data.success){
        const imageUrl = data.imageUrl;
        setImgUrl(imageUrl);

        // Insert into editor
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", imageUrl);
        
      }else{
        console.log("problem in uploading image");
        
      }    
    };
  };

  // Toolbar modules
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
  };

  // Save Post Handler
  const handleSave = async () => {
    try {
      const blogPost = {
      title,
      content,
      image: imgUrl
    };    

    const {data} = await axios.post(`${url}/api/blogs`, blogPost);    
    if(data.success){
      navigate(`/blog/${data.data._id}`);
    }else{
      alert("Blog Not saved!");

    }
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert("Failed to save blog. Check console for details.");
      
    }
  };

  return (
    <div className="container py-5">
      <div className="row py-5">
        <div className="col-1"></div>
        <div className="col-12 col-sm-10">
          <h2>Write a New Blog</h2>

          {/* Title */}
          <input
            type="text"
            className="form-control my-3"
            placeholder="Blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Editor */}
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="Start writing your blog..."
            style={{ height: "300px", marginBottom: "50px" }}
          />

          {/* Buttons */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="btn btn-success" onClick={handleSave}>
              Save Blog
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setPreview(!preview)}
            >
              {preview ? "Hide Preview" : "Show Preview"}
            </button>
          </div>

          {/* Preview */}
          {preview && (
            <div
              className="mt-4 p-3 border rounded"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}
