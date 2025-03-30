import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // Safe initialization of authUser
  const initialAuthUser = typeof window !== "undefined" ? localStorage.getItem("Users") : null;
  const [authUser, setAuthUser] = useState(() => {
    try {
      return initialAuthUser ? JSON.parse(initialAuthUser) : null;
    } catch (error) {
      console.error("Error parsing auth user from localStorage:", error);
      return null;
    }
  });

  // Update localStorage whenever authUser changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("Users", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("Users");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using Auth context safely
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
