"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion } from "framer-motion"; // Added framer-motion import

export default function Navbar({ onSearch }: { onSearch?: (query: string) => void }) {
    const { total, items, setOpen } = useCart();
    const [query, setQuery] = useState("");

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        onSearch?.(val);
    };

    return (
        <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 gap-4">

                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <div className="relative w-32 sm:w-36 h-8 sm:h-10 transition-transform active:scale-95">
                            <Image
                                src="/images/zipkart_logo.png"
                                alt="ZipKart"
                                fill
                                className="object-cover object-left w-full"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Search Bar - Hidden on very small screens, shown otherwise */}
                    <div className="flex-1 max-w-2xl mx-4 hidden sm:block">
                        <div className="relative group">
                            <input
                                type="text"
                                value={query}
                                onChange={handleSearch}
                                placeholder="Search 'milk', 'chips', 'shampoo'..."
                                className="w-full pl-12 pr-4 py-3 bg-zip-gray border border-transparent focus:bg-white focus:border-zip-green/50 focus:ring-4 focus:ring-zip-green/10 rounded-2xl text-sm transition-all outline-none text-gray-700 placeholder:text-gray-400"
                            />
                            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-zip-green transition-colors" />
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 sm:gap-6">
                        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-500">
                            <Link href="#" className="hover:text-zip-green transition-colors">Categories</Link>
                            <Link href="#" className="hover:text-zip-green transition-colors">Deals</Link>
                        </div>

                        <motion.button // Changed to motion.button
                            key={totalItems} // Added key prop for animation re-trigger
                            initial={{ scale: 1 }} // Added initial animation state
                            animate={{ scale: [1, 1.15, 1] }} // Added animate animation sequence
                            transition={{ duration: 0.3 }} // Added transition duration
                            onClick={() => setOpen(true)}
                            className="relative flex items-center gap-2 sm:gap-3 bg-zip-green text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-zip-green-dark active:scale-95 transition-all shadow-lg shadow-zip-green/20"
                        >
                            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                            <div className="flex flex-col items-start leading-none min-w-[30px] sm:min-w-0">
                                <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest hidden sm:block">
                                    {totalItems > 0 ? `${totalItems} Items` : "My Cart"}
                                </span>
                                <span className="text-xs sm:text-sm font-bold">
                                    {total > 0 ? `₹${total}` : "₹0"}
                                </span>
                            </div>
                        </motion.button>

                        <button className="sm:hidden p-2 text-gray-500">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="pb-4 sm:hidden px-1">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2.5 bg-zip-gray border border-transparent focus:bg-white focus:border-zip-green rounded-xl text-sm outline-none shadow-inner"
                        />
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
