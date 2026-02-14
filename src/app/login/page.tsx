"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Mail, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [method, setMethod] = useState<"phone" | "email">("phone");
    const [inputValue, setInputValue] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputValue) {
            toast.error("Please enter a valid " + (method === "phone" ? "phone number" : "email"));
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Successfully logged in!");
            router.push("/");
        }, 1500);
    };

    const handleOAuth = (provider: string) => {
        setIsLoading(true);
        // Simulate OAuth
        setTimeout(() => {
            setIsLoading(false);
            toast.success(`Logged in with ${provider}`);
            router.push("/");
        }, 1500);
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white">

            {/* Left Side - Visual (Hidden on mobile) */}
            <div className="hidden lg:block relative bg-zip-green overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-zip-green-dark/90 to-zip-green/90 z-10" />
                <Image
                    src="/images/hero_main.jpg"
                    alt="Groceries"
                    fill
                    className="object-cover opacity-50 mix-blend-multiply"
                    priority
                />

                <div className="relative z-20 h-full flex flex-col justify-between p-12 text-white">
                    <Link href="/" className="flex items-center gap-2 group w-fit">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md group-hover:bg-white/30 transition-colors">
                            <ArrowLeft className="w-6 h-6" />
                        </div>
                        <span className="font-bold">Back to Home</span>
                    </Link>

                    <div className="space-y-6 max-w-lg">
                        <h1 className="text-5xl font-black font-header leading-tight">
                            Fresh Groceries <br /> delivered in <br />
                            <span className="text-zip-yellow">10 minutes.</span>
                        </h1>
                        <p className="text-lg text-white/90 font-medium">
                            Join millions of happy customers and experience the fastest grocery delivery service in town.
                        </p>

                        <div className="flex gap-4 pt-4">
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                                <span className="block text-3xl font-black mb-1">10M+</span>
                                <span className="text-sm opacity-80">Downloads</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                                <span className="block text-3xl font-black mb-1">4.8★</span>
                                <span className="text-sm opacity-80">App Rating</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-sm opacity-60">
                        © 2026 ZipKart Technologies Pvt. Ltd.
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zip-yellow rounded-full blur-[120px] opacity-20 z-10" />
            </div>

            {/* Right Side - Login Form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 relative">
                <Link href="/" className="lg:hidden absolute top-6 left-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>

                <div className="w-full max-w-md space-y-8">
                    <div className="text-center space-y-2">
                        <div className="relative w-16 h-16 mx-auto mb-6 bg-zip-green/10 rounded-2xl flex items-center justify-center">
                            <Image
                                src="/images/zipkart_logo.png"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="object-contain" // Fallback logo size/style
                            />
                        </div>
                        <h2 className="text-3xl font-black font-header text-zip-dark tracking-tight">Welcome Back!</h2>
                        <p className="text-gray-500 font-medium">Please enter your details to sign in.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Toggle Method */}
                        <div className="flex bg-gray-100 p-1 rounded-xl">
                            <button
                                onClick={() => { setMethod("phone"); setInputValue(""); }}
                                className={cn(
                                    "flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2",
                                    method === "phone" ? "bg-white text-zip-dark shadow-sm" : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                <Smartphone className="w-4 h-4" /> Phone
                            </button>
                            <button
                                onClick={() => { setMethod("email"); setInputValue(""); }}
                                className={cn(
                                    "flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2",
                                    method === "email" ? "bg-white text-zip-dark shadow-sm" : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                <Mail className="w-4 h-4" /> Email
                            </button>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">
                                    {method === "phone" ? "Mobile Number" : "Email Address"}
                                </label>
                                <div className="relative group">
                                    {method === "phone" && (
                                        <div className="absolute left-4 top-3.5 flex items-center gap-2 border-r border-gray-300 pr-3 mr-3">
                                            <span className="text-sm font-bold text-gray-600">🇮🇳 +91</span>
                                        </div>
                                    )}
                                    <input
                                        type={method === "phone" ? "tel" : "email"}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder={method === "phone" ? "98765 43210" : "john@example.com"}
                                        className={cn(
                                            "w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-zip-green focus:ring-4 focus:ring-zip-green/10 rounded-2xl py-3.5 text-base transition-all outline-none font-medium placeholder:text-gray-400",
                                            method === "phone" ? "pl-20" : "pl-4"
                                        )}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-zip-dark text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-black transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    "Continue"
                                )}
                            </button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-4 text-gray-400 font-bold tracking-wider">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleOAuth("Google")}
                                className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span className="font-bold text-gray-700 text-sm group-hover:text-gray-900">Google</span>
                            </button>
                            <button
                                onClick={() => handleOAuth("Apple")}
                                className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group"
                            >
                                <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                                <span className="font-bold text-gray-700 text-sm group-hover:text-gray-900">Facebook</span>
                            </button>
                        </div>

                        <p className="text-center text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                            By clicking continue, you agree to our
                            <Link href="/terms" className="text-zip-dark font-bold hover:underline mx-1">Terms of Service</Link>
                            and
                            <Link href="/privacy" className="text-zip-dark font-bold hover:underline mx-1">Privacy Policy</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
