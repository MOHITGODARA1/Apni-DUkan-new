import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem("adminToken");
        if (token) {
            setUser({ name: "Admin User", role: "admin" });
        }
        setLoading(false);
    }, []);

    const login = (username, password) => {
        // Use environment variables for authentication
        const adminUser = import.meta.env.VITE_ADMIN_USERNAME;
        const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;

        if (username === adminUser && password === adminPass) {
            const token = "mock-jwt-token"; // Valid session marker
            localStorage.setItem("adminToken", token);
            setUser({ name: "Admin User", role: "admin" });
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
