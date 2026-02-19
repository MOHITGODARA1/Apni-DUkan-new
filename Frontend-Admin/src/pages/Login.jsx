import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (login(username, password)) {
            navigate("/");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-4">
            <div className="bg-[#111827] p-8 rounded-lg border border-[#1f2937] w-full max-w-md shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
                    <p className="text-gray-400">Sign in to access the dashboard</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-[#1f2937] border border-[#374151] rounded-lg pl-10 pr-4 py-2.5 text-white outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]"
                                placeholder="Enter username"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#1f2937] border border-[#374151] rounded-lg pl-10 pr-4 py-2.5 text-white outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#3b82f6] text-white py-2.5 rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-lg shadow-blue-500/20"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-500">
                    <p>Protected System. Authorized Access Only.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
