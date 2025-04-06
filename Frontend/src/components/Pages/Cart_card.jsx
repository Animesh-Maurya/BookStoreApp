import React, { useState } from "react";

export default function Cards({ item, userId, onRemove }) {
  const [removing, setRemoving] = useState(false);

  const handleRemoveFromCart = async () => {
    setRemoving(true);
    try {
      const res = await fetch(`http://localhost:4000/user/remove/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId: item._id }),
      });

      const data = await res.json();
      if (res.ok) {
        onRemove(item._id); // update UI
        alert("Book removed from cart!");
      } else {
        alert(data.message || "Failed to remove book from cart.");
      }
    } catch (err) {
      console.error("Error removing from cart:", err);
      alert("Something went wrong.");
    } finally {
      setRemoving(false);
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
          src={item.image?.url}
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
        </div>
        <button
          onClick={handleRemoveFromCart}
          disabled={removing}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#FF5555",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%",
            opacity: removing ? 0.6 : 1,
          }}
        >
          {removing ? "Removing..." : "Remove from Cart"}
        </button>
      </div>
    </div>
  );
}
