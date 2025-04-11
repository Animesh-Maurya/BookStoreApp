import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const apiURL = "http://localhost:4000";

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${apiURL}/book/${id}`);
        const data = await response.json();
        if (response.ok) {
          setBook(data.book);
        } else {
          console.error("Error fetching book:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <p>Loading book details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-gray-800 p-6 rounded-xl shadow-xl">
        <img
          src={book.image?.url}
          alt={book.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{book.name}</h1>
        <p className="text-gray-400 mb-4">{book.description || "No description provided."}</p>
        <p className="text-xl text-green-400 font-semibold">${book.price}</p>
      </div>
    </div>
  );
}
