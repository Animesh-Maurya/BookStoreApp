import React from 'react';
import Home from './components/home/Home.jsx';
import Courses from './components/Courses/Courses.jsx';
import {Route,Routes} from 'react-router-dom';//we are using it for different-2 routes
import Signup from './components/Signup.jsx'
import Contact from './components/Contact.jsx';
import { Toaster } from 'react-hot-toast';

// (.) lgane se hum perticuler older se bahar chale jate hai
// and for going to the perticuler file i have ti use (./FileName)

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Toaster />
    </>
    
  )
}
export default App;

