import {  } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Signup , Signin, Blog, Blogs , Publish , MyBlogs, HomePage} from './pages/export.ts'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/blog/one/:id" element={<Blog/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/Publish" element={<Publish/>} />
          <Route path="/myblogs" element={<MyBlogs/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
