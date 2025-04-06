import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";

export default function Card2({ item, isBought, isFavorited }) {
  const [authUser] = useContext(AuthContext);
  const [isFavourite, setIsFavourite] = useState(isFavorited);

  const handleAddToFavourites = async () => {
    try {
      const res = await fetch(`http://localhost:4000/user/favourites/${authUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId: item._id }),
      });

      if (res.ok) {
        setIsFavourite(true);
        alert("Added to favourites!");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to add to favourites");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-blue-900 text-white shadow-md rounded-2xl overflow-hidden p-4 flex flex-col justify-between transition-transform hover:scale-105 duration-300 h-full">
      <img 
        src={item.image?.url || "/fallback.jpg"} 
        alt={item.title || "Book Cover"} 
        className="h-48 w-full object-cover rounded-xl mb-4"
      />

      <div className="flex flex-col gap-2 flex-grow">
        <h2 className="text-lg font-bold">{item.title}</h2>
        <p className="text-sm">👤 Author: {item.author}</p>
        <p className="text-sm">📚 Category: {item.category}</p>
        <p className="text-sm font-semibold">💰 ₹{item.price}</p>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {item.File?.url && (
          <a 
            href={item.File.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-green-600 text-white py-2 px-4 rounded-xl text-center hover:bg-green-700 transition-colors"
          >
            📖 Read Now
          </a>
        )}

        {!isFavourite && (
          <button 
            onClick={handleAddToFavourites} 
            className="bg-pink-600 py-2 px-4 rounded-xl hover:bg-pink-700 transition-colors"
          >
            ❤️ Add to Favourites
          </button>
        )}

        {isFavourite && (
          <div className="bg-pink-800 text-white py-2 px-4 rounded-xl text-center">
            ❤️ Added to Favourites
          </div>
        )}
      </div>

      {isBought && (
        <div className="mt-2 text-sm text-green-400 font-medium text-center">
          ✅ Already bought
        </div>
      )}
    </div>
  );
}
