
import { useState } from "react"
import { motion } from "framer-motion"

export default function Cards({ item, userId, onRemove }) {
  const [loading, setLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleApproveBook = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await fetch(`http://localhost:4000/admin/approve-book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, bookId: item._id }),
      })

      const data = await response.json()
      if (response.ok) {
        onRemove(item._id) // Remove book from UI
      } else {
        console.error("Failed to approve book:", data.message)
      }
    } catch (error) {
      console.error("Error approving book:", error)
    } finally {
      setLoading(false)
    }
  }

  // Card styles
  const cardStyle = {
    background: "linear-gradient(145deg, #1a2234, #0f172a)",
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: isHovered
      ? "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 15px rgba(99, 102, 241, 0.5)"
      : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: isHovered ? "1px solid rgba(99, 102, 241, 0.3)" : "1px solid rgba(255, 255, 255, 0.05)",
    transition: "all 0.3s ease",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  }

  const imageContainerStyle = {
    position: "relative",
    height: "180px",
    overflow: "hidden",
  }

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
  }

  const imageOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to top, rgba(15, 23, 42, 1), rgba(15, 23, 42, 0))",
  }

  const cardBodyStyle = {
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  }

  const cardTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }

  const badgeStyle = {
    background: "linear-gradient(to right, #8b5cf6, #d946ef)",
    color: "white",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "500",
  }

  const authorStyle = {
    fontSize: "0.875rem",
    color: "#94a3b8",
    marginBottom: "0.5rem",
  }

  const titleStyle = {
    fontSize: "0.875rem",
    color: "#cbd5e1",
    marginBottom: "1rem",
  }

  const cardActionsStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  }

  const priceStyle = {
    background: "rgba(15, 23, 42, 0.6)",
    color: "#f8fafc",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
  }

  const buttonStyle = {
    background: loading ? "linear-gradient(to right, #475569, #64748b)" : "linear-gradient(to right, #3b82f6, #8b5cf6)",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    fontWeight: "600",
    cursor: loading ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: loading ? 0.7 : 1,
  }

  return (
    <motion.div
      style={cardStyle}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={imageContainerStyle}>
        <img src={item.image?.url || "https://via.placeholder.com/150"} alt={item.name} style={imageStyle} />
        <div style={imageOverlayStyle}></div>
      </div>

      <div style={cardBodyStyle}>
        <div style={cardTitleStyle}>
          <span style={{ maxWidth: "70%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {item.name}
          </span>
          {item.category && <span style={badgeStyle}>{item.category}</span>}
        </div>

        <div style={authorStyle}>
          <span style={{ color: "#60a5fa", marginRight: "0.25rem" }}>By:</span> {item.author}
        </div>

        <div style={titleStyle}>{item.title}</div>

        <div style={cardActionsStyle}>
          <div style={priceStyle}>
            <span style={{ color: "#34d399", marginRight: "0.25rem" }}>$</span> {item.price}
          </div>

          <motion.button
            style={buttonStyle}
            onClick={handleApproveBook}
            disabled={loading}
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
          >
            {loading ? (
              <>
                <svg
                  style={{
                    width: "1rem",
                    height: "1rem",
                    marginRight: "0.5rem",
                    animation: "spin 1s linear infinite",
                  }}
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="30 30"
                    strokeDashoffset="0"
                    style={{ opacity: 0.3 }}
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="30 30"
                    strokeDashoffset="25"
                  />
                </svg>
                Approving...
              </>
            ) : (
              <>
                <span style={{ marginRight: "0.5rem" }}>✓</span>
                Approve
              </>
            )}
          </motion.button>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  )
}

