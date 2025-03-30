import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Cart from './Cart'

export default function CART1() {

  return (
    <>
        <Navbar />
        <div className='min-h-screen'>
            <Cart />
        </div>
        <Footer />
    </>
  )
}
