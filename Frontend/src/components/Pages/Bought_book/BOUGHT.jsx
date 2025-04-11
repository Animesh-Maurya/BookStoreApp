import React from 'react'
import BoughtBooks from './Bought_book.jsx'
import Navbar from '../../Navbar.jsx'
import Footer from '../../Footer.jsx'

export default function BOUGHT() {

  return (
    <>
        <Navbar />
        <div className="bg-blue-950 min-h-screen text-white">
            < BoughtBooks/>
        </div>
        <Footer />
    </>
  )
}