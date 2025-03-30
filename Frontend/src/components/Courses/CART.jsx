import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Cart from "../Pages/Add_to_cart";

export default ()=>{
    return(
        <>
        <Navbar/>
        <Cart className="min-h-screen" />
        <Footer/>
        </>
    )
}