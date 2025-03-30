import React from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const [authUser, setAuthUser] = useAuth();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/user/logout", {
        method: "POST",
        credentials: "include", // ✅ Ensures cookies are sent with request
      });

      const data = await response.json();
      
      if (response.ok) {
        setAuthUser(null); // ✅ Remove user from context
        localStorage.removeItem("Users"); // ✅ Clear local storage
        toast.success(data.message || "Logout successful");
        window.location.reload(); // ✅ Refresh page after logout
        <Navigate to={'/'}/>
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
