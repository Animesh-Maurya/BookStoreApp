import React from 'react'
import Navbar from "../Navbar.jsx"

import Banner from "../Banner.jsx"
import Footer from "../Footer.jsx"
import FreeBook from '../FreeBook'
import Sidebar from './Sidebar.jsx'
export default function Home() {
  return (
    <>
        <Navbar />
        <Banner />
        <Sidebar/>
        <FreeBook />
        <Footer />
    </>
  )
}
