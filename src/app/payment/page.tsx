"use client";

import { useCart } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    CreditCard,
    Smartphone,
    QrCode,
    Wallet,
    Banknote,
    Truck,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function PaymentPage() {
    const { total, items, gst, deliveryFee, subtotal } = useCart();
    const [selectedMethod, setSelectedMethod] = useState<string>("upi-app");

    const paymentMethods = [
        {
            id: "upi-app",
            icon: Smartphone,
            label: "UPI App",
            sublabel: "Google Pay, PhonePe, Paytm, etc.",
            description: "Pay using your preferred UPI app directly."
        },
        {
            id: "gpay",
            icon: Wallet,
            label: "Google Pay",
            sublabel: "Instant payment via Google Pay",
            description: "",
            special: "gpay" // marker for special rendering if needed
        },
        {
            id: "upi-id",
            icon: QrCode,
            label: "UPI ID",
            sublabel: "Pay via any UPI ID",
            description: "Enter your UPI ID (e.g., mobile@upi) to proceed."
        },
        {
            id: "card",
            icon: CreditCard,
            label: "Credit / Debit Card",
            sublabel: "Visa, Mastercard, RuPay, etc.",
            description: "Enter your card details securely."
        },
        {
            id: "cod",
            icon: Banknote,
            label: "Cash on Delivery",
            sublabel: "Pay when you receive your order",
            description: "Available for orders under ₹5000."
        }
    ];

    return (
        <div className="min-h-screen bg-zip-gray pb-20">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/"
                        className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-gray-600 hover:text-zip-dark"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-black font-header text-zip-dark tracking-tight">
                        Select Payment Method
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Left: Payment Options */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Wallet className="w-5 h-5 text-zip-green" />
                                Payment Options
                            </h2>

                            <div className="space-y-4">
                                {paymentMethods.map((method) => {
                                    const Icon = method.icon;
                                    const isSelected = selectedMethod === method.id;

                                    return (
                                        <motion.div
                                            key={method.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            onClick={() => setSelectedMethod(method.id)}
                                            className={cn(
                                                "cursor-pointer rounded-2xl border-2 p-4 transition-all duration-300 relative overflow-hidden group",
                                                isSelected
                                                    ? "bg-zip-green/5 border-zip-green shadow-md shadow-zip-green/10"
                                                    : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300",
                                                    isSelected ? "bg-zip-green text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                                                )}>
                                                    <Icon className="w-6 h-6" />
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className={cn(
                                                        "font-bold text-base transition-colors",
                                                        isSelected ? "text-zip-dark" : "text-gray-700"
                                                    )}>
                                                        {method.label}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 font-medium">
                                                        {method.sublabel}
                                                    </p>
                                                </div>

                                                <div className={cn(
                                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                                                    isSelected ? "border-zip-green bg-zip-green" : "border-gray-300"
                                                )}>
                                                    {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                                </div>
                                            </div>

                                            {/* Expandable Section for selected method details */}
                                            <motion.div
                                                initial={false}
                                                animate={{ height: isSelected ? "auto" : 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-4 mt-4 border-t border-dashed border-zip-green/20 pl-0 sm:pl-16">
                                                    <p className="text-sm text-gray-600 mb-4">{method.description}</p>

                                                    {/* Contextual Inputs based on selection */}
                                                    {method.id === "upi-id" && (
                                                        <div className="flex flex-col sm:flex-row gap-2 max-w-sm">
                                                            <input
                                                                type="text"
                                                                placeholder="Enter UPI ID (e.g. name@okhdfc)"
                                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-zip-green focus:ring-2 focus:ring-zip-green/20 transition-all"
                                                            />
                                                            <button className="bg-zip-dark text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-black transition-colors">
                                                                Verify
                                                            </button>
                                                        </div>
                                                    )}

                                                    {/* Card specific fields */}
                                                    {method.id === "card" && (
                                                        <div className="space-y-3 max-w-sm">
                                                            <input type="text" placeholder="Card Number" className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-zip-green focus:ring-2 focus:ring-zip-green/20" />
                                                            <div className="flex gap-3">
                                                                <input type="text" placeholder="MM/YY" className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-zip-green focus:ring-2 focus:ring-zip-green/20" />
                                                                <input type="text" placeholder="CVV" className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-zip-green focus:ring-2 focus:ring-zip-green/20" />
                                                            </div>
                                                        </div>
                                                    )}

                                                    <button className="mt-4 bg-zip-green text-white font-bold py-3 px-6 rounded-xl hover:bg-zip-green-dark transition-colors shadow-lg shadow-zip-green/20 active:scale-95 w-full sm:w-auto">
                                                        Pay ₹{total}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
                                Order Summary
                            </h2>

                            {/* Item Preview (Max 3) */}
                            <div className="space-y-3 mb-6">
                                {items.slice(0, 3).map((item) => (
                                    <div key={item.id} className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100 relative">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="font-bold text-sm text-gray-800">
                                            ₹{item.price * item.quantity}
                                        </div>
                                    </div>
                                ))}
                                {items.length > 3 && (
                                    <p className="text-xs text-center text-gray-500 font-medium bg-gray-50 py-2 rounded-lg">
                                        + {items.length - 3} more items
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2 pt-4 border-t border-gray-100">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Item Total</span>
                                    <span className="font-medium">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span className="font-medium text-zip-green">
                                        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>GST & Charges</span>
                                    <span className="font-medium">₹{gst}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                                <span className="font-black text-lg text-zip-dark">To Pay</span>
                                <span className="font-black text-2xl text-zip-dark">₹{total}</span>
                            </div>

                            <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex gap-3 items-start">
                                <Truck className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-bold text-yellow-800">Free Delivery</p>
                                    <p className="text-xs text-yellow-700 mt-0.5">
                                        Your order will be delivered within 10-15 minutes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
