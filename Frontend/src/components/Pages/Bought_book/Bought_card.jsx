export default function Card2({ item, isBought }) {
    return (
      <div style={{ position: "relative", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
        {isBought && (
          <div style={{
            position: "absolute", top: "10px", right: "10px", color: "green", fontSize: "1.5rem"
          }}>
            ✓
          </div>
        )}
        <img src={item.image?.url || "https://via.placeholder.com/150"} alt={item.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
        <h3>{item.name}</h3>
        <p>{item.author}</p>
        <p>${item.price}</p>
      </div>
    );
  }
  