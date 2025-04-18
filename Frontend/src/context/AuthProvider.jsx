import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(() => {
    try {
      const userData = localStorage.getItem("User");
      const adminData = localStorage.getItem("Admin");

      if (userData) return JSON.parse(userData);
      if (adminData) return JSON.parse(adminData);
      return null;
    } catch (error) {
      console.error("Error parsing auth user from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    if (authUser) {
      // Determine role by checking if it's an Admin (you can improve this check with a role field)
      const isAdmin = authUser?.role === "admin" || localStorage.getItem("Admin");
      if (isAdmin) {
        localStorage.setItem("Admin", JSON.stringify(authUser));
        localStorage.removeItem("User");
      } else {
        localStorage.setItem("User", JSON.stringify(authUser));
        localStorage.removeItem("Admin");
      }
    } else {
      localStorage.removeItem("User");
      localStorage.removeItem("Admin");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for safe usage
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
