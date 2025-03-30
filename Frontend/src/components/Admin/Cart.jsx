
import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../home/Sidebar"
import Card from "./Card1"
import { AuthContext } from "../../context/AuthProvider"
import { motion } from "framer-motion"

export default function Cart() {
  const [authUser] = useContext(AuthContext)
  const [pendingBooks, setPendingBooks] = useState([])
  const userId = authUser._id

  useEffect(() => {
    const fetchPendingBooks = async () => {
      try {
        const res = await fetch("http://localhost:4000/admin/pending-books", {
          method: "GET",
          credentials: "include",
        })
        const data = await res.json()
        setPendingBooks(data.pendingBooksData)
      } catch (error) {
        console.error("Error fetching pending books:", error)
      }
    }

    fetchPendingBooks()
  }, [userId])

  // Function to remove a book from the displayed list
  const handleRemoveBook = (bookId, userIndex) => {
    setPendingBooks((prevPendingBooks) => {
      const updatedUsers = [...prevPendingBooks]
      updatedUsers[userIndex].pending_books = updatedUsers[userIndex].pending_books.filter(
        (book) => book._id !== bookId,
      )
      return updatedUsers
    })
  }

  // Container styles
  const containerStyle = {
    background: "linear-gradient(to bottom, #0f172a, #1e293b)",
    minHeight: "100vh",
    color: "#e2e8f0",
    padding: "2rem",
    fontFamily: "'Inter', sans-serif",
  }

  // Header styles
  const headerStyle = {
    textAlign: "center",
    marginTop: "2rem",
    marginBottom: "3rem",
  }

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "700",
    background: "linear-gradient(to right, #60a5fa, #a78bfa, #f472b6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "1rem",
  }

  const subtitleStyle = {
    fontSize: "1.2rem",
    color: "#94a3b8",
    marginBottom: "1.5rem",
  }

  const backButtonStyle = {
    padding: "0.75rem 1.5rem",
    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }

  // User card styles
  const userCardStyle = {
    background: "linear-gradient(145deg, #1e293b, #1a2234)",
    borderRadius: "1rem",
    padding: "1.5rem",
    marginBottom: "2rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  }

  const userNameStyle = {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#f8fafc",
    display: "flex",
    alignItems: "center",
  }

  const userEmailStyle = {
    fontSize: "0.95rem",
    color: "#94a3b8",
    marginBottom: "1.5rem",
  }

  const booksContainerStyle = {
    display: "flex",
    overflowX: "auto",
    gap: "1.5rem",
    padding: "0.5rem 0",
    scrollbarWidth: "thin",
    scrollbarColor: "#4b5563 #1e293b",
  }

  const emptyStateStyle = {
    textAlign: "center",
    padding: "3rem",
    fontSize: "1.25rem",
    color: "#94a3b8",
    background: "rgba(30, 41, 59, 0.5)",
    borderRadius: "0.75rem",
    border: "1px dashed rgba(148, 163, 184, 0.2)",
  }

  return (
    <div style={containerStyle}>
      <Sidebar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={headerStyle}
      >
        <h1 style={titleStyle}>Admin Dashboard - Pending Books</h1>
        <p style={subtitleStyle}>View all users and their pending book requests.</p>
        <Link to="/">
          <motion.button
            style={backButtonStyle}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            🔙 Back to Home
          </motion.button>
        </Link>
      </motion.div>

      {pendingBooks.length > 0 ? (
        <div>
          {pendingBooks.map((user, index) => (
            <motion.div
              key={user.userId}
              style={userCardStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div style={userNameStyle}>
                <span
                  style={{
                    background: "#3b82f6",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "0.75rem",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  {user.fullname.charAt(0).toUpperCase()}
                </span>
                {user.fullname}
              </div>
              <div style={userEmailStyle}>
                <span style={{ marginRight: "0.5rem", color: "#60a5fa" }}>✉</span>
                {user.email}
              </div>

              {user.pending_books.length > 0 ? (
                <div style={booksContainerStyle}>
                  {user.pending_books.map((book, bookIndex) => (
                    <motion.div
                      key={book._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: bookIndex * 0.05 + 0.2 }}
                      style={{ minWidth: "280px", maxWidth: "280px" }}
                    >
                      <Card item={book} userId={user.userId} onRemove={(bookId) => handleRemoveBook(bookId, index)} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    color: "#94a3b8",
                    background: "rgba(15, 23, 42, 0.3)",
                    borderRadius: "0.5rem",
                  }}
                >
                  No pending books for this user.
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          style={emptyStateStyle}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>📚</span>
          No pending books found. All caught up!
        </motion.div>
      )}
    </div>
  )
}

