import React, { useState, useEffect, useContext } from "react";
import Cards from "./Cart_card.jsx";
import { AuthContext } from "../../context/AuthProvider.jsx";
import Sidebar from "../home/Sidebar.jsx";

// ...imports
import { loadStripe } from "@stripe/stripe-js";

export default function Cart() {
  const [authUser] = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const userId = authUser._id;
  const apiURL = "http://localhost:4000";

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${apiURL}/cart/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setCartItems(data.cart);
        } else {
          console.error("Failed to fetch cart:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [userId]);

  const tAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51RAt7GH9TSzSmX1tmnaF5JRcbJ2pgMFFWaQ2VZHpyPNitX96jJO0nqtzpM8b010dm1MZrvjMjbvg5yjYhBgzOpPI00iRunFLQx");

    const body = { products: cartItems };
    const headers = { "Content-Type": "application/json" };

    const response = await fetch(`${apiURL}/create-checkout-session`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      // After success, call the endpoint to update user
      await fetch(`${apiURL}/user/complete-payment`, {
        method: "POST",
        headers,
        body: JSON.stringify({ userId, bookIds: cartItems.map(item => item._id) }),
      });

      setCartItems([]); // Clear cart
    }
  };

  const removeFromCart = (bookId) => {
    setCartItems(cartItems.filter((item) => item._id !== bookId));
  };

  return (
    <div style={{ background: "#121212", minHeight: "100vh", padding: "20px", color: "white" }}>
      <Sidebar />
      <h1 style={{ textAlign: "center", fontSize: "28px", marginBottom: "20px" }}>Your Cart</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Cards key={item._id} item={item} userId={userId} onRemove={removeFromCart} />
          ))
        ) : (
          <p style={{ textAlign: "center", fontSize: "18px", color: "#AAAAAA" }}>Your cart is empty.</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <button
          onClick={makePayment}
          className={`text-white ${tAmount === 0 ? "bg-gray-400" : "bg-primary"} p-2 rounded-sm w-full`}
        >
          Pay ${tAmount.toFixed(2)}
        </button>
      )}
    </div>
  );
}
