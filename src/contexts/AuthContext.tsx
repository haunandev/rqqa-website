"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "student" | "teacher" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  class?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("admin_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulasi login - dalam real implementation, ini akan call API
    setIsLoading(true);
    try {
      // Delay untuk simulasi network
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock credentials
      const mockUsers: Record<string, User> = {
        "student@example.com": {
          id: "STU001",
          name: "Ahmad Rizki",
          email: "student@example.com",
          role: "student",
          class: "Tahfidz Pemula",
        },
        "teacher@example.com": {
          id: "TEA001",
          name: "Ustadz Muhammad",
          email: "teacher@example.com",
          role: "teacher",
          department: "Tahfidz",
        },
        "admin@example.com": {
          id: "ADM001",
          name: "Super Admin",
          email: "admin@example.com",
          role: "admin",
        },
      };

      // Simple validation (password hardcoded untuk demo)
      if (email in mockUsers && password === "password123") {
        const loggedInUser = mockUsers[email];
        setUser(loggedInUser);
        localStorage.setItem("admin_user", JSON.stringify(loggedInUser));
      } else {
        throw new Error("Email atau password salah");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
