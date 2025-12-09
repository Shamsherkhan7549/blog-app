import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import '../components/BlogDetails.css'

const url = import.meta.env.VITE_BACKEND_URL;

export default function UpdateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();
  const quillRef = useRef(null);

  const { id } = useParams();

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

      const { data } = await axios.post(`${url}/api/upload`, formData);
      console.log(data);
            
      if (data.success) {
        const imageUrl = data.imageUrl;
        setImgUrl(imageUrl);

        // Insert into editor
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", imageUrl);

      } else {
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

      const { data } = await axios.put(`${url}/api/blogs/${id}`, blogPost);
      if (data.success) {
        navigate(`/blog/${data.data._id}`);

      } else {
        alert("Blog Not saved!");

      }
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert("Failed to save blog. Check console for details.");

    }
  };

  const callingBlogData = async () => {
    try {
      const { data } = await axios.get(`${url}/api/blogs/${id}`);
      if (data.success) {
        setTitle(data.data.title);
        setContent(data.data.content);
        setImgUrl(data.data.image);
      }

    } catch (error) {
      console.log("Update page error: ", error.message);

    }
  };

  useEffect(() => {
    callingBlogData();
  }, []);


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
