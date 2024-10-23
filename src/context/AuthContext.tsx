import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_KEY; // Replace with your actual JWT secret

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if token is valid on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode the token and verify its validity
        const decoded = jwt.verify(token, JWT_SECRET); // You can use decode if you want to check just the payload
        setIsAuthenticated(!!decoded); // Set authenticated state based on token validity
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('token'); // Remove invalid token
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
