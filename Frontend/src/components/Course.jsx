import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import { AuthContext } from "../context/AuthProvider";
import Sidebar from "./home/Sidebar";

export default function Course() {
  const [authUser, setAuthUser] = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [userBoughtBooks, setUserBoughtBooks] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const userId = authUser._id; 

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await fetch("http://localhost:4000/book", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.log("Error in getting books:", error);
      }
    };

    const getUserBooks = async () => {
      try {
        const res = await fetch(`http://localhost:4000/book/user-books`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setUserBoughtBooks(data.boughtBooks);
        setUserCart(data.cartBooks);
      } catch (error) {
        console.log("Error fetching user books:", error);
      }
    };

    getBooks();
    getUserBooks();
  }, [userId]);

  // Function to remove a book from the displayed list
  const handleRemoveBook = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
  };

  // Filter out books in `bought_books` and `cart`
  const availableBooks = books.filter(
<<<<<<< HEAD
  (book) =>
    !(userBoughtBooks || []).some((boughtBook) => boughtBook._id === book._id) &&
    !(userCart || []).some((cartBook) => cartBook._id === book._id)
);

=======
    (book) =>
      !userBoughtBooks?.some((boughtBook) => boughtBook._id === book._id) &&
      !userCart?.some((cartBook) => cartBook._id === book._id)
  );
>>>>>>> f5ca7c79cddb36f7efc3c90ec8fc09d069499ed2

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-0 px-1">
        <Sidebar />
        <div className="mt-20 text-center">
          <h1 className="text-2xl font-semibold md:text-4xl">
            We are delighted to have you <span className="text-pink-500">Here! 😊</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            Explore our vast collection of books. Find what interests you the most and start learning today! 📖
          </p>
          <Link to="/">
            <button className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-all">
              🔙 Back
            </button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {availableBooks.length > 0 ? (
            availableBooks.map((item) => (
              <Cards userId={userId} item={item} key={item._id} onRemove={handleRemoveBook} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 text-lg">
              No books available at the moment. 📚
            </p>
          )}
        </div>
      </div>
    </>
  );
}
