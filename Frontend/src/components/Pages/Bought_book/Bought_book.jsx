import { useContext, useEffect, useState } from "react";
import Card2 from "./Bought_card";
import { AuthContext } from "../../../context/AuthProvider";
import Sidebar from "../../home/Sidebar";

export default function BoughtBooks({ userId }) {
  const [authUser] = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boughtRes = await fetch(`http://localhost:4000/user/bought-books/${authUser._id}`);
        const boughtData = await boughtRes.json();

        const favRes = await fetch(`http://localhost:4000/user/favourites/${authUser._id}`);
        const favData = await favRes.json();

        if (boughtRes.ok && favRes.ok) {
          setBooks(boughtData.books);
          setFavourites(favData.favourites.map(book => book._id));
        } else {
          console.error("Error fetching data");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;

  return (
    <div className="bg-blue-950 text-white min-h-screen p-6">
      <Sidebar />
      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {books.map((book) => (
            <Card2
              key={book._id}
              item={book}
              isBought={true}
              isFavorited={favourites.includes(book._id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-300 text-xl mt-10">No books bought yet.</p>
      )}
    </div>
  );
}
