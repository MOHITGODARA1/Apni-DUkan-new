import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
    Store, AlertCircle, Eye, EyeOff,
    User, Mail, Lock, Phone, Briefcase, MapPin, CheckCircle
} from "lucide-react";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        businessName: "",
        address: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [step, setStep] = useState(1); // Step 1: Account Info | Step 2: Business Info

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            return setError("Please fill in all required fields.");
        }
        if (formData.password.length < 6) {
            return setError("Password must be at least 6 characters.");
        }
        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match.");
        }
        setError("");
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                businessName: formData.businessName,
                address: formData.address,
            };
            await signup(payload);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F7F8FA]">

            {/* ── Left Panel ── */}
            <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between bg-[#1B2A4A] overflow-hidden px-14 py-12">

                {/* Background dot pattern */}
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                        backgroundSize: "36px 36px"
                    }}
                />
                <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#E8722A] opacity-[0.08]" />
                <div className="absolute bottom-0 -left-20 w-[300px] h-[300px] rounded-full bg-[#E8722A] opacity-[0.06]" />

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8722A]">
                        <Store className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-wide">Apni Dukan</span>
                </div>

                {/* Hero */}
                <div className="relative z-10 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-white leading-tight">
                            Start your journey<br />
                            <span className="text-[#E8722A]">in 2 simple steps.</span>
                        </h1>
                        <p className="text-[#8FA3C0] text-base leading-relaxed max-w-sm">
                            Join thousands of shopkeepers who manage their business smarter with Apni Dukan.
                        </p>
                    </div>

                    {/* Step indicators */}
                    <div className="space-y-4">
                        {[
                            { num: 1, title: "Account Details", desc: "Name, email & password" },
                            { num: 2, title: "Business Info", desc: "Shop name, phone & address" },
                        ].map(({ num, title, desc }) => (
                            <div key={num} className="flex items-center gap-4">
                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors
                                    ${step >= num
                                        ? "bg-[#E8722A] text-white"
                                        : "bg-white/10 text-[#4A6180]"
                                    }`}>
                                    {step > num ? <CheckCircle className="h-4 w-4" /> : num}
                                </div>
                                <div>
                                    <p className={`text-sm font-semibold ${step >= num ? "text-white" : "text-[#4A6180]"}`}>{title}</p>
                                    <p className="text-xs text-[#4A6180]">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="relative z-10 text-xs text-[#4A6180]">
                    © 2025 Apni Dukan · Built for shopkeepers
                </p>
            </div>

            {/* ── Right Panel ── */}
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">

                {/* Mobile logo */}
                <div className="flex lg:hidden items-center gap-2 mb-8">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1B2A4A]">
                        <Store className="h-5 w-5 text-[#E8722A]" />
                    </div>
                    <span className="text-lg font-bold text-[#1B2A4A]">Apni Dukan</span>
                </div>

                <div className="w-full max-w-[420px] space-y-5">

                    {/* Heading */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold text-[#1B2A4A]">
                                {step === 1 ? "Create your account" : "Tell us about your business"}
                            </h2>
                        </div>
                        <p className="text-sm text-gray-500">
                            {step === 1
                                ? "Step 1 of 2 — Account details"
                                : "Step 2 of 2 — Business information (optional)"}
                        </p>
                    </div>

                    {/* Mobile step bar */}
                    <div className="flex lg:hidden gap-2">
                        <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-[#E8722A]" : "bg-gray-200"}`} />
                        <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-[#E8722A]" : "bg-gray-200"}`} />
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-8 space-y-5">

                        {/* Error */}
                        {error && (
                            <div className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-100 p-3.5 text-sm text-red-700">
                                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* ── STEP 1 ── */}
                        {step === 1 && (
                            <form onSubmit={handleNext} className="space-y-4">

                                {/* Full Name */}
                                <div className="space-y-1.5">
                                    <label htmlFor="name" className="text-sm font-medium text-[#1B2A4A]">
                                        Full Name <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Ramesh Kumar"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="h-11 rounded-xl border-gray-200 bg-[#F7F8FA] pl-9 text-sm placeholder:text-gray-400 focus:border-[#E8722A] focus:ring-[#E8722A]/20"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="text-sm font-medium text-[#1B2A4A]">
                                        Email Address <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="h-11 rounded-xl border-gray-200 bg-[#F7F8FA] pl-9 text-sm placeholder:text-gray-400 focus:border-[#E8722A] focus:ring-[#E8722A]/20"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <label htmlFor="password" className="text-sm font-medium text-[#1B2A4A]">
                                        Password <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Min. 6 characters"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="h-11 rounded-xl border-gray-200 bg-[#F7F8FA] pl-9 pr-10 text-sm placeholder:text-gray-400 focus:border-[#E8722A] focus:ring-[#E8722A]/20"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>

                                    {/* Password strength bar */}
                                    {formData.password.length > 0 && (
                                        <div className="space-y-1 pt-1">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors
                                                        ${formData.password.length >= i * 3
                                                            ? i <= 1 ? "bg-red-400"
                                                                : i <= 2 ? "bg-yellow-400"
                                                                    : i <= 3 ? "bg-blue-400"
                                                                        : "bg-green-500"
                                                            : "bg-gray-200"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-xs text-gray-400">
                                                {formData.password.length < 4 ? "Too short"
                                                    : formData.password.length < 7 ? "Weak"
                                                        : formData.password.length < 10 ? "Good"
                                                            : "Strong"}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-1.5">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium text-[#1B2A4A]">
                                        Confirm Password <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirm ? "text" : "password"}
                                            placeholder="Re-enter password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            className={`h-11 rounded-xl border-gray-200 bg-[#F7F8FA] pl-9 pr-10 text-sm placeholder:text-gray-400 focus:border-[#E8722A] focus:ring-[#E8722A]/20
                                                ${formData.confirmPassword && formData.password !== formData.confirmPassword
                                                    ? "border-red-300"
                                                    : formData.confirmPassword && formData.password === formData.confirmPassword
                                                        ? "border-green-400"
                                                        : ""
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm(!showConfirm)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                        <p className="text-xs text-green-600 flex items-center gap-1">
                                            <CheckCircle className="h-3 w-3" /> Passwords match
                                        </p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-11 rounded-xl bg-[#E8722A] hover:bg-[#D4651F] active:bg-[#C05A1A] text-white font-semibold text-sm transition-colors shadow-sm mt-1"
                                >
                                    Continue →
                                </Button>
                            </form>
                        )}

                        {/* ── STEP 2 ── */}
                        {step === 2 && (
                            <form onSubmit={handleSubmit} className="space-y-4">

                                {/* Business Name */}
                                <div className="space-y-1.5">
                                    <label htmlFor="businessName" className="text-sm font-medium text-[#1B2A4A]">
                                        Business / Shop Name
                                        <span className="ml-1.5 text-xs font-normal text-gray-400">(optional)</span>
                                    </label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="businessName"
                                            name="businessName"
                                            type="text"
                                            placeholder="e.g. Ramesh General Store"
                                            value={formData.businessName}
                                            onChange={handleChange}
                                            className="h-11 rounded-xl border-gray-200 bg-[#F7F8FA] pl-9 text-sm placeholder:text-gray-400 focus:border-[#E8722A] focus:ring-[#E8722A]/20"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="space-y-1.5">
                                    <label htmlFor="phone" className="text-sm font-medium text-[#1B2A4A]">
                                        Phone Number
                                        <span className="ml-1.5 text-xs font-normal text-gray-400">(optional)</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <div className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-gray-500 border-r border-gray-200 pr-2">
                                            +91
                                        </div>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="98765 43210"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            maxLength={10}
                                            className="h-11 rounded-xl border-gray-200 bg-[#F7F8FA] pl-16 text-sm placeholder:text-gray-400 focus:border-[#E8722A] focus:ring-[#E8722A]/20"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="space-y-1.5">
                                    <label htmlFor="address" className="text-sm font-medium text-[#1B2A4A]">
                                        Shop Address
                                        <span className="ml-1.5 text-xs font-normal text-gray-400">(optional)</span>
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <textarea
                                            id="address"
                                            name="address"
                                            placeholder="Shop no., Street, City, State..."
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full rounded-xl border border-gray-200 bg-[#F7F8FA] pl-9 pr-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-[#E8722A] focus:outline-none focus:ring-2 focus:ring-[#E8722A]/20 resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Info note */}
                                <div className="flex items-start gap-2 rounded-xl bg-blue-50 border border-blue-100 px-3.5 py-3 text-xs text-blue-700">
                                    <CheckCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                                    <span>You can update your business details anytime from your profile settings.</span>
                                </div>

                                <div className="flex gap-3 pt-1">
                                    <Button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex-1 h-11 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[#1B2A4A] font-medium text-sm transition-colors shadow-none"
                                    >
                                        ← Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-[2] h-11 rounded-xl bg-[#E8722A] hover:bg-[#D4651F] active:bg-[#C05A1A] text-white font-semibold text-sm transition-colors shadow-sm"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                                </svg>
                                                Creating account...
                                            </span>
                                        ) : "Create Account"}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Sign in link */}
                    <p className="text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link to="/" className="text-[#E8722A] font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>

                    <p className="text-center text-xs text-gray-400">
                        By creating an account, you agree to our{" "}
                        <span className="underline cursor-pointer hover:text-gray-600">Terms</span>{" "}
                        &{" "}
                        <span className="underline cursor-pointer hover:text-gray-600">Privacy Policy</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;