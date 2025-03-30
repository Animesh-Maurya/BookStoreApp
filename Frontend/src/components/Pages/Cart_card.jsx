import React, { useState } from "react";

export default function Cards({ item, userId, onBuy, isPending, markAsPending }) {
  const [loading, setLoading] = useState(false);

  const handleBuyNow = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:4000/cart/add-pending-book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, bookId: item._id }),
      });

      const data = await response.json();
      if (response.ok) {
        markAsPending(item._id); // Update UI immediately
      } else {
        console.error("Failed to buy book:", data.message);
      }
    } catch (error) {
      console.error("Error buying book:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#1E1E1E",
        color: "#FFFFFF",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(255,255,255,0.2)",
        marginBottom: "10px",
      }}
    >
      <figure>
        <img
          src={item.image.url}
          alt={item.name}
          style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }}
        />
      </figure>
      <div>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "10px" }}>{item.name}</h2>
        <p style={{ fontSize: "14px", color: "#AAAAAA" }}>By: {item.author}</p>
        <p style={{ color: "#CCCCCC" }}>{item.title}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
          <span style={{ fontSize: "16px", fontWeight: "bold", color: "#FFD700" }}>$ {item.price}</span>
          <button
            style={{
              background: isPending ? "#FFA500" : "#28A745",
              color: "white",
              padding: "8px 12px",
              borderRadius: "5px",
              border: "none",
              cursor: isPending ? "not-allowed" : "pointer",
            }}
            onClick={!isPending ? handleBuyNow : null}
            disabled={isPending || loading}
          >
            {isPending ? "Pending" : loading ? "Processing..." : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
