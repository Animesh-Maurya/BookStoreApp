import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Sidebar from "./home/Sidebar";

export default function Favorites() {
  const [authUser] = useContext(AuthContext);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const apiURL = "http://localhost:4000";

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`${apiURL}/user/favorites/${authUser._id}`);
        const data = await response.json();
        if (response.ok) {
          setFavoriteBooks(data.favourites);
        } else {
          console.error("Failed to load favorites:", data.message);
        }
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };

    fetchFavorites();
  }, [authUser._id]);

  const removeFromFavorites = async (bookId) => {
    try {
      const response = await fetch(`${apiURL}/user/remove-favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: authUser._id, bookId }),
      });

      const data = await response.json();
      if (response.ok) {
        setFavoriteBooks((prev) => prev.filter((book) => book._id !== bookId));
      } else {
        console.error("Failed to remove favorite:", data.message);
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1c1c1c] text-white p-6">
      <Sidebar />
      <h1 className="text-4xl font-bold mb-10 text-center text-white">💖 Your Favorite Books</h1>

      {favoriteBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {favoriteBooks.map((book) => (
            <div
              key={book._id}
              className="bg-[#1e1e1e] p-5 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={book.image?.url}
                alt={book.name}
                className="w-full h-56 object-cover rounded-xl mb-5 border border-gray-700"
              />
              <h2 className="text-2xl font-semibold text-white mb-2">{book.name}</h2>
              <p className="text-gray-400 mb-5 text-lg">${book.price}</p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/book/${book._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  View Details
                </Link>
                <button
                  onClick={() => removeFromFavorites(book._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg mt-12">You haven't added any books to favorites yet 🥹</p>
      )}
    </div>
  );
}
