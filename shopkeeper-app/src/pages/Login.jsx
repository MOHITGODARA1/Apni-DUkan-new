import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Store, AlertCircle, Eye, EyeOff, ShoppingBag, TrendingUp, Package } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to login. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F7F8FA]">

            {/* ── Left Panel (hidden on mobile) ── */}
            <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between bg-[#1B2A4A] overflow-hidden px-14 py-12">

                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                        backgroundSize: "36px 36px"
                    }}
                />

                {/* Decorative circles */}
                <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#E8722A] opacity-[0.08]" />
                <div className="absolute bottom-0 -left-20 w-[300px] h-[300px] rounded-full bg-[#E8722A] opacity-[0.06]" />

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8722A]">
                        <Store className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-wide">Apni Dukan</span>
                </div>

                {/* Hero Text */}
                <div className="relative z-10 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-white leading-tight">
                            Manage your shop<br />
                            <span className="text-[#E8722A]">smarter, faster.</span>
                        </h1>
                        <p className="text-[#8FA3C0] text-base leading-relaxed max-w-sm">
                            Track inventory, manage orders, and grow your business — all from one simple dashboard.
                        </p>
                    </div>

                    {/* Feature Pills */}
                    <div className="space-y-3">
                        {[
                            { icon: Package, text: "Real-time inventory tracking" },
                            { icon: TrendingUp, text: "Sales & revenue analytics" },
                            { icon: ShoppingBag, text: "Order management made easy" },
                        ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                                    <Icon className="h-4 w-4 text-[#E8722A]" />
                                </div>
                                <span className="text-sm text-[#A8BDD4]">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer note */}
                <p className="relative z-10 text-xs text-[#4A6180]">
                    © 2025 Apni Dukan · Built for shopkeepers
                </p>
            </div>

            {/* ── Right Panel ── */}
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">

                {/* Mobile logo */}
                <div className="flex lg:hidden items-center gap-2 mb-10">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1B2A4A]">
                        <Store className="h-5 w-5 text-[#E8722A]" />
                    </div>
                    <span className="text-lg font-bold text-[#1B2A4A]">Apni Dukan</span>
                </div>

                <div className="w-full max-w-[400px] space-y-6">

                    {/* Heading */}
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-[#1B2A4A]">Welcome back</h2>
                        <p className="text-sm text-gray-500">Sign in to your shopkeeper account</p>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-8 space-y-5">

                        {/* Error Banner */}
                        {error && (
                            <div className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-100 p-3.5 text-sm text-red-700">
                                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label htmlFor="email" className="text-sm font-medium text-[#1B2A4A]">
                                    Email address
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-11 rounded-xl border-gray-200 bg-[#F7F8FA] focus:border-[#E8722A] focus:ring-[#E8722A]/20 text-sm placeholder:text-gray-400"
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-sm font-medium text-[#1B2A4A]">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        className="text-xs text-[#E8722A] hover:underline font-medium"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-11 rounded-xl border-gray-200 bg-[#F7F8FA] focus:border-[#E8722A] focus:ring-[#E8722A]/20 text-sm placeholder:text-gray-400 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword
                                            ? <EyeOff className="h-4 w-4" />
                                            : <Eye className="h-4 w-4" />
                                        }
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-11 rounded-xl bg-[#E8722A] hover:bg-[#D4651F] active:bg-[#C05A1A] text-white font-semibold text-sm transition-colors duration-150 shadow-sm mt-1"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : "Sign in"}
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white px-3 text-xs text-gray-400">New to Apni Dukan?</span>
                            </div>
                        </div>

                        {/* Sign up */}
                        <div className="text-center">
                            <Link
                                to="/signup"
                                className="inline-flex items-center justify-center w-full h-10 rounded-xl border border-gray-200 text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 transition-colors"
                            >
                                Create an account
                            </Link>
                            <p className="text-xs text-gray-400 mt-2">Coming Soon</p>
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-xs text-gray-400">
                        By signing in, you agree to our{" "}
                        <span className="underline cursor-pointer hover:text-gray-600">Terms</span>{" "}
                        &{" "}
                        <span className="underline cursor-pointer hover:text-gray-600">Privacy Policy</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;