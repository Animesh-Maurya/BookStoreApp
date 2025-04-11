import React from 'react'
import Navbar from './Navbar.jsx'
import Banner from './Banner.jsx'
import Sidebar from './home/Sidebar.jsx'
import ProfilePage from './Pages/Profile.jsx'
import Footer from './Footer.jsx'

export default function Profile() {
  return (
    <>
        <Navbar />
        <div>THIS IS YOUR PROFILE</div>
        <div>THIS IS YOUR PROFILE</div>
        <Sidebar/>
        <ProfilePage />
        <Footer />
    </>
  )
}
