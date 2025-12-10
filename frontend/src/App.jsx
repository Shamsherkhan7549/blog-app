import React from 'react'
import Navbar from './components/Navbar.jsx'
import {BrowserRouter as Router,  Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import About from './pages/About/About.jsx'
import Contact from './pages/Contact/Contact.jsx'
import Editor from './components/Editor.jsx'
import BlogDetails from './components/BlogDetails.jsx'
import UpdateBlog from './components/UpdateBlog.jsx'
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <Router>  
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/blog' element={<Editor />} />
        <Route path='/blog/:id' element={<BlogDetails />} />
        <Route path='/update-blog/:id' element={<UpdateBlog />} />
      </Routes>
    </Router>

  )
}

export default App