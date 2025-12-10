import React, { useState } from 'react'
import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL;
const Contact = () => {
  const [contactInfo, setContactInfo] = useState({});

  const handlingContact = (e) => {
    setContactInfo(prev=> ({...prev, [e.target.name]:e.target.value}))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/sendEmail`, {contactInfo});
      console.log(res);
      setContactInfo({});
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className='container py-5'>
      <div className="row">
        <div className="col-10">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you! Whether you have questions, feedback, suggestions, or collaboration ideas — feel free to reach out anytime.</p>

          <h2>📩 Get in Touch</h2>
          <p>Have something to share? Send us a message and we’ll get back to you as soon as possible.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
              <input onChange={handlingContact} type="email" name='email' className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
              <textarea onChange={handlingContact} name='message' className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Contact