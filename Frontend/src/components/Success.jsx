import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function Success() {
  const [authUser]= useContext(AuthContext)
  const userId = authUser._id;

  useEffect(() => {
    const completePayment = async () => {
      try {
        const response = await fetch("http://localhost:4000/user/complete-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Cart updated:", data);
        } else {
          console.error("Failed to update cart:", data.message);
        }
      } catch (err) {
        console.error("Error completing payment:", err);
      }
    };

    if (userId) {
      completePayment();
    }
  }, [userId]);

  return (
    <div style={{ color: "white", padding: "2rem", textAlign: "center" }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Your books have been moved to "Bought Books".</p>
    </div>
  );
}
