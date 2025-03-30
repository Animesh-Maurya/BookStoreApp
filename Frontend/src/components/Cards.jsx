import React, { useState } from "react";

export default function Cards({ item, userId, onRemove }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:4000/user/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, bookId: item._id }),
      });

      const data = await response.json();
      if (response.ok) {
        onRemove(item._id); // Remove card from UI
      } else {
        console.error("Failed to add to cart:", data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 w-92 shadow-xl mt-4 md-3 p-3 hover:scale-105 duration-200">
      <figure>
        <img
          src={item.image.url}
          alt={item.name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">
          {item.name}
          {item.category && (
            <div className="badge badge-secondary ml-2">{item.category}</div>
          )}
        </h2>
        <p className="text-sm text-gray-600">By: {item.author}</p>
        <p className="text-gray-500">{item.title}</p>

        <div className="card-actions justify-between mt-4">
          <div className="badge badge-outline text-lg font-medium">
            $ {item.price}
          </div>
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
