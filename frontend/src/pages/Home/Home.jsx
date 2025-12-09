import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL

const Home = () => {
  const [blogs, setBlogs] = useState([])

  const apiCall = async () => {
    try {
      const { data } = await axios.get(`${url}/api/blogs`);
      if (data.success) {
        setBlogs(data.data)
      } else {
        console.log("data not fetched");

      }
    } catch (error) {
      console.log("Error fetching blogs:", error);
    }
  }

  useEffect(() => {
    apiCall();
  }, []);

  const getPreviewText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const h2 = tempDiv.querySelector('h2');
    if(h2) h2.remove();       
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return text.substring(0, 80) + "...";
  };

  return (
    <div className='container py-5'>
      <div className="row">
        {

          blogs &&
          blogs.map((blog) => (

            <div key={blog._id} className="card col-lg-3 col-md-4 col-sm-6 col-12 my-3" style={{ width: "18rem" }}>
              <img src={blog.image} className="card-img-top" alt="topic_image" />
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">
                  {getPreviewText(blog.content)}
                </p>

                <Link className="btn btn-primary" to={`/blog/${blog._id}`}>View</Link>
              </div>
            </div>
          ))
        }

      </div>

    </div>
  )
}

export default Home