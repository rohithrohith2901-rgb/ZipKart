"use client";

import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
    const {
        items,
        updateQuantity,
        removeFromCart,
        subtotal,
        deliveryFee,
        gst,
        total,
        open,
        setOpen,
    } = useCart();

    const router = useRouter();

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col h-full border-l border-white/20"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white/50 backdrop-blur-xl">
                            <h2 className="text-xl font-black font-header text-zip-dark flex items-center gap-2">
                                My Cart
                                <span className="bg-zip-yellow text-zip-dark text-xs px-2 py-1 rounded-full font-bold">
                                    {totalItems} items
                                </span>
                            </h2>
                            <button
                                onClick={() => setOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-zip-dark"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-400">
                                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <ShoppingBag className="w-12 h-12 text-gray-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-700">Your cart is empty</h3>
                                    <p className="text-sm max-w-xs mx-auto">
                                        Add items from the homepage to start your grocery run!
                                    </p>
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="mt-6 px-8 py-3 bg-zip-green text-white font-bold rounded-xl shadow-lg shadow-zip-green/20 hover:bg-zip-green-dark transition-all active:scale-95"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            key={item.id}
                                            className="flex gap-4 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
                                        >
                                            {/* Image */}
                                            <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>

                                            {/* Info & Controls */}
                                            <div className="flex flex-col flex-1 justify-between">
                                                <div>
                                                    <h4 className="font-bold text-zip-dark text-sm leading-tight line-clamp-2">
                                                        {item.name}
                                                    </h4>
                                                    <span className="text-xs text-gray-400 font-medium mt-1 inline-block">
                                                        {item.weight}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="font-bold text-zip-dark">
                                                        ₹{item.price * item.quantity}
                                                    </div>

                                                    {/* Qty Selector */}
                                                    <div className="flex items-center bg-zip-green rounded-lg overflow-hidden shadow-sm">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-black/10 active:bg-black/20 transition-colors"
                                                        >
                                                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                                                        </button>
                                                        <span className="w-8 h-8 flex items-center justify-center bg-white text-zip-dark text-xs font-bold border-x border-zip-green/10">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-black/10 active:bg-black/20 transition-colors"
                                                        >
                                                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Bill Details */}
                            {items.length > 0 && (
                                <div className="mt-8 bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-3">
                                    <h3 className="font-bold text-gray-500 text-xs uppercase tracking-widest mb-4">Bill Details</h3>

                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium">₹{subtotal}</span>
                                    </div>

                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>GST (5%)</span>
                                        <span className="font-medium">₹{gst}</span>
                                    </div>

                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Delivery Fee</span>
                                        <span className="font-medium text-zip-green">
                                            {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                                        <span className="font-black text-lg text-zip-dark">Grand Total</span>
                                        <span className="font-black text-xl text-zip-dark">₹{total}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Actions */}
                        {items.length > 0 && (
                            <div className="p-5 bg-white border-t border-gray-100 shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.1)] z-50">
                                <button
                                    onClick={() => {
                                        setOpen(false);
                                        router.push("/payment");
                                    }}
                                    className="w-full bg-zip-green hover:bg-zip-green-dark text-white font-bold py-4 rounded-2xl shadow-xl shadow-zip-green/30 active:scale-[0.98] transition-all flex items-center justify-between px-6 group"
                                >
                                    <div className="flex flex-col items-start leading-none">
                                        <span className="text-[10px] font-medium opacity-80 uppercase tracking-widest mb-1">Total to Pay</span>
                                        <span className="text-xl">₹{total}</span>
                                    </div>
                                    <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                        Proceed to Pay <ShoppingBag className="w-5 h-5 fill-current" />
                                    </span>
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
