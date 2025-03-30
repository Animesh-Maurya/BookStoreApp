// BoughtBooks.jsx
import { useEffect, useState } from "react";
import Card2 from "./Bought_card";

export default function BoughtBooks({ userId }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoughtBooks = async () => {
      try {
        const response = await fetch(`http://localhost:4000/user/${userId}/bought-books`);
        const data = await response.json();
        if (response.ok) {
          setBooks(data.boughtBooks);
        } else {
          console.error("Failed to fetch bought books:", data.message);
        }
      } catch (error) {
        console.error("Error fetching bought books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoughtBooks();
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
      {books.length > 0 ? (
        books.map((book) => <Card2 key={book._id} item={book} isBought={true} />)
      ) : (
        <p>No books bought yet.</p>
      )}
    </div>
  );
}
