import React, { useState, useEffect, useContext } from "react";
import Cards from "./Cart_card.jsx";
import { AuthContext } from "../../context/AuthProvider.jsx";
import Sidebar from "../home/Sidebar.jsx";

export default function Cart() {
  const [authUser] = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [pendingBooks, setPendingBooks] = useState([]);
  const userId = authUser._id;

  useEffect(() => {
    const fetchCartAndPendingBooks = async () => {
      try {
        const response = await fetch(`http://localhost:4000/cart/${userId}`);
        const data = await response.json();
        
        if (response.ok) {
          setCartItems(data.cart);
          setPendingBooks(data.pending_books);
        } else {
          console.error("Failed to fetch cart and pending books:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cart and pending books:", error);
      }
    };

    fetchCartAndPendingBooks();
  }, [userId]);

  const removeFromCart = (bookId) => {
    setCartItems(cartItems.filter(item => item._id !== bookId));
  };

  // Mark a book as pending locally
  const markAsPending = (bookId) => {
    setPendingBooks((prevPending) => [...prevPending, { _id: bookId }]);
  };

  return (
    <div style={{ background: "#121212", minHeight: "100vh", padding: "20px", color: "white" }}>
      <Sidebar />
      <h1 style={{ textAlign: "center", fontSize: "28px", marginBottom: "20px" }}>Your Cart</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Cards 
              key={item._id} 
              item={item} 
              userId={userId} 
              onRemove={removeFromCart} 
              isPending={pendingBooks.some(book => book._id === item._id)} 
              markAsPending={markAsPending} // Pass function to mark as pending
            />
          ))
        ) : (
          <p style={{ textAlign: "center", fontSize: "18px", color: "#AAAAAA" }}>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}
