"use client";

import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Plus, Minus } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
    const { items, addToCart, updateQuantity } = useCart();

    const cartItem = items.find((item) => item.id === product.id);
    const qty = cartItem ? cartItem.quantity : 0;

    return (
        <div className="group bg-white rounded-3xl p-3 sm:p-4 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100/50 hover:border-gray-200 flex flex-col items-center justify-between relative overflow-hidden h-full">

            {/* Discount Badge */}
            {product.originalPrice > product.price && (
                <span className="absolute top-3 left-3 bg-blue-500 text-white text-[10px] font-black px-2 py-1 rounded-lg z-10 shadow-sm shadow-blue-500/20 uppercase tracking-wide">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
            )}

            {/* Image */}
            <div className="relative w-full aspect-square mb-4 bg-gray-50 rounded-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 border border-transparent group-hover:border-gray-100">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                    loading="lazy"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col w-full gap-1">
                <div className="flex items-start justify-between w-full h-10 mb-2">
                    <h3 className="font-bold text-zip-dark text-sm leading-snug line-clamp-2 sm:text-base group-hover:text-zip-green transition-colors font-header">
                        {product.name}
                    </h3>
                </div>
                <span className="text-xs text-gray-500 font-bold bg-gray-100 px-2 py-1 rounded-md self-start border border-gray-200">
                    {product.weight}
                </span>

                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mt-2 sm:mt-4 w-full gap-2 sm:gap-0">
                    <div className="flex flex-col">
                        <span className="text-[10px] sm:text-xs text-gray-400 line-through font-medium">₹{product.originalPrice}</span>
                        <span className="text-base sm:text-xl font-black text-zip-dark leading-none">₹{product.price}</span>
                    </div>

                    {/* Add Button / Qty Control */}
                    <div className="relative z-20 w-full sm:w-auto">
                        {qty === 0 ? (
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full sm:w-auto justify-center bg-zip-green/5 border border-zip-green text-zip-green font-bold text-xs sm:text-sm px-3 py-1.5 rounded-xl shadow-sm hover:bg-zip-green hover:text-white transition-all active:scale-95 flex items-center gap-1 group/btn overflow-hidden"
                            >
                                ADD <Plus className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:rotate-90 transition-transform" />
                            </button>
                        ) : (
                            <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start bg-zip-green rounded-xl overflow-hidden shadow-lg shadow-zip-green/30 transform scale-100 transition-transform">
                                <button
                                    onClick={() => updateQuantity(product.id, qty - 1)}
                                    className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center text-white hover:bg-black/10 active:bg-black/20 transition-colors"
                                >
                                    <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                                </button>
                                <span className="flex-1 sm:flex-none w-auto sm:w-6 h-8 flex items-center justify-center bg-zip-green text-white text-xs sm:text-sm font-bold">
                                    {qty}
                                </span>
                                <button
                                    onClick={() => updateQuantity(product.id, qty + 1)}
                                    className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center text-white hover:bg-black/10 active:bg-black/20 transition-colors"
                                >
                                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
