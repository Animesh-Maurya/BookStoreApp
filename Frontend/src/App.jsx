import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthProvider, { useAuth } from './context/AuthProvider.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Home from './components/home/Home.jsx';
import Courses from './components/Courses/Courses.jsx';
import Signup from './components/Signup.jsx';
import Contact from './components/Contact.jsx';
import Login from './components/Login.jsx';

function App() {
  const [authUser] = useAuth();

  return (
    <AuthProvider>
    <GoogleOAuthProvider clientId="576465356327-501k2vs4bv48ibc54f4c4519j8gitj9g.apps.googleusercontent.com">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={authUser ? <Courses /> : <Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
