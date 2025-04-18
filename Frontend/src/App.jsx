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
import BookForm from './components/Pages/Create_Book.jsx';
import CART from './components/Courses/CART.jsx';
import CART1 from './components/Admin/CART1.jsx';
import BOUGHT from './components/Pages/Bought_book/BOUGHT.JSX';
import PDFReader from './components/Pages/Bought_book/PDFReader.jsx';
import Success from './components/Success.jsx';
import Cancel from './components/Cancel.jsx';
import ProfilePage from './components/Pages/Profile.jsx';
import Profile from './components/PROFILE.JSX';
import Favorites from './components/Favorites.jsx';
import BookDetails from './components/Pages/Book_id.jsx';
import Connect from "./components/Connects/Connect.jsx";
import Sidebar from './components/Connects/Sidebar.jsx';
function App() {
  const [authUser, setAuthUser] = useAuth();
  // console.log("auth User at app.jsx ", authUser);
  
  return (
    <GoogleOAuthProvider clientId="576465356327-501k2vs4bv48ibc54f4c4519j8gitj9g.apps.googleusercontent.com">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={authUser ? <Courses /> : <Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-book" element={<BookForm/>}/>
        <Route path="/add-to-cart" element={<CART/>}/>
        <Route path="/admin-cart" element={<CART1/>}/>
        <Route path="/bought-book" element={<BOUGHT/>}/>
        <Route path="/read-book" element={<PDFReader />} />
        <Route path="/success" element={<Success/>} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/orders" element={<Profile />} />
        <Route path="/settings" element={<Profile />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/connect" element={authUser ? <Connect /> : <Navigate to="/signup"/>} />
      </Routes>
      <Toaster />
    </GoogleOAuthProvider>
  );
}

export default App;
