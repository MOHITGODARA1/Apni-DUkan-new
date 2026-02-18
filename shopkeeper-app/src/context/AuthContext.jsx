import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    // Configure axios defaults
    axios.defaults.baseURL = "http://localhost:5001/api";

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await axios.post("/auth/login", { email, password });
            const { token, ...userData } = res.data.data; // Adapting to backend response structure

            setToken(token);
            setUser(userData);

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userData));
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            return true;
        } catch (error) {
            console.error("Login needed", error);
            throw error;
        }
    };

    const signup = async (userData) => {
        try {
            const res = await axios.post("/auth/signup", userData);
            const { token, ...user } = res.data.data;

            setToken(token);
            setUser(user);

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            return true;
        } catch (error) {
            console.error("Signup failed", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
    };

    const value = {
        user,
        token,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
