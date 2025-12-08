import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import './BlogDetails.css'


const url = import.meta.env.VITE_BACKEND_URL;
const BlogDetails = () => {

    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [blogInfo, setBlogInfo] = useState("");


    const extractContent = (html) => {
        const contentDiv = document.createElement("div");
        contentDiv.innerHTML = html;
        const image = contentDiv.querySelector('img');
        if (image) image.remove();

        return contentDiv.innerHTML
    }

    const fetchById = async (blogId) => {
        try {
            const { data } = await axios.get(`${url}/api/blogs/${blogId}`)
            if (data.success) {
                setBlogInfo(data.data)
                const result = extractContent(data.data.content);
                setBlog(result);
            }
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    };

    const getPreviewText = (html) => {
        const htmlDiv = document.createElement("div");
        htmlDiv.innerHTML = html;
        const text = htmlDiv.textContent || htmlDiv.innerText || ""
        return text
    }

    useEffect(() => {
        fetchById(id)
    }, [id]);

    return (
        <div className='contaner py-3'>
            <div className="row">
                <div className="col-1"></div>
                {
                    blog ?
                        (
                            <div className="col-10">
                                <div className='py-4'>
                                <h2 >{blogInfo.title}</h2>
                                <strong>By: **{blogInfo.author}**</strong>
                                </div>
                               
                                <img className='blog-img' src={blogInfo.image} alt="blog_img" />
                                <div
                                    className="blog-content py-5 my-5"
                                    dangerouslySetInnerHTML={{ __html: blog }}
                                ></div>
                                
                                
                            </div>
                        )

                        : <p>Loading</p>
                }
            </div>
        </div >
    )
}




export default BlogDetails