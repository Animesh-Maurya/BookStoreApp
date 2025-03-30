import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleBookSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("title", data.title);
      formData.append("author", data.author);
      formData.append("image", data.image[0]);
      formData.append("file", data.file[0]);

      const res = await fetch("http://localhost:4000/book/create-book", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.message || "Failed to add book");

      toast.success("📚 Book added successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("⚠️ Error: " + error.message);
    }
  };

  return (
    <div style={{
      maxWidth: "500px",
      margin: "50px auto",
      padding: "25px",
      background: "#1e1e2f",
      borderRadius: "12px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
      color: "#fff",
    }}>
      <h2 style={{ textAlign: "center", fontSize: "22px", marginBottom: "20px", color: "#ffffff" }}>
        📖 Add a New Book
      </h2>
      <form onSubmit={handleSubmit(handleBookSubmit)}>
        {[
          { label: "Book Name", name: "name", required: "Book name is required" },
          { label: "Price", name: "price", required: "Price is required", type: "number" },
          { label: "Category", name: "category" },
          { label: "Title", name: "title", required: "Title is required" },
          { label: "Author", name: "author", required: "Author name is required" },
        ].map(({ label, name, required, type = "text" }) => (
          <div key={name} style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px", color: "#ddd", display: "block", marginBottom: "4px" }}>
              {label}
            </label>
            <input
              type={type}
              {...register(name, required ? { required } : {})}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #444",
                backgroundColor: "#2a2a3a",
                color: "#fff",
                fontSize: "16px",
                outline: "none",
              }}
            />
            {errors[name] && <p style={{ color: "#ff6b6b", fontSize: "12px" }}>{errors[name].message}</p>}
          </div>
        ))}

        {[
          { label: "Image Upload", name: "image", required: "Image is required" },
          { label: "Book File Upload", name: "file", required: "File is required" },
        ].map(({ label, name, required }) => (
          <div key={name} style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px", color: "#ddd", display: "block", marginBottom: "4px" }}>
              {label}
            </label>
            <input
              type="file"
              {...register(name, { required })}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #444",
                backgroundColor: "#2a2a3a",
                color: "#fff",
                fontSize: "16px",
                outline: "none",
              }}
            />
            {errors[name] && <p style={{ color: "#ff6b6b", fontSize: "12px" }}>{errors[name].message}</p>}
          </div>
        ))}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(135deg, #007bff, #6610f2)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px",
            transition: "opacity 0.3s ease",
          }}
        >
          📚 Submit
        </button>
      </form>
    </div>
  );
};

export default BookForm;