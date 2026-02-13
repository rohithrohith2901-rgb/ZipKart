"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/ui/ProductCard";
import { products, categories } from "@/data/products";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Filter,
  SearchX,
  LayoutGrid,
  Carrot,
  Milk,
  Cookie,
  CupSoda,
  Home,
  SprayCan
} from "lucide-react";

const iconMap: Record<string, any> = {
  "LayoutGrid": LayoutGrid,
  "Carrot": Carrot,
  "Milk": Milk,
  "Cookie": Cookie,
  "CupSoda": CupSoda,
  "Home": Home,
  "SprayCan": SprayCan
};

import { motion } from "framer-motion";

import Marquee from "@/components/ui/Marquee";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  // ... existing code ...


  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pb-20 bg-zip-gray">
      <Navbar onSearch={setSearchQuery} />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-zip-green to-zip-green-dark text-white pt-8 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden shadow-lg">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 py-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start gap-4 max-w-xl text-center md:text-left z-20"
          >
            <span className="bg-zip-yellow text-zip-dark px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg shadow-black/10 inline-block animate-pulse self-center md:self-start">
              ⚡ Free Delivery in 10 Mins
            </span>
            <h1 className="text-4xl sm:text-6xl font-black font-header leading-tight tracking-tight drop-shadow-sm">
              Fresh Groceries <br /> Delivered in Minutes.
            </h1>
            <p className="text-lg opacity-90 max-w-md mx-auto md:mx-0 font-medium">
              From farm-fresh veggies to daily essentials, get everything you need delivered to your doorstep instantly.
            </p>
            <div className="mt-4 flex gap-4 self-center md:self-start">
              <button
                onClick={() => {
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-zip-green-dark px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-black/10 hover:shadow-xl hover:scale-105 transition-all active:scale-95"
              >
                Start Shopping
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] z-10"
          >
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80"
              alt="Grocery Delivery"
              fill
              className="object-cover rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white/20"
            />
            {/* Floating Badge 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -bottom-6 -left-6 bg-white text-zip-dark p-4 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="bg-green-100 p-2 rounded-full">
                <span className="text-2xl">🥬</span>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Fresh</p>
                <p className="font-bold">100% Organic</p>
              </div>
            </motion.div>

            {/* Floating Badge 2 */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 1 }}
              className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-xl rotate-3"
            >
              <div className="relative w-14 h-14 bg-orange-50 rounded-xl overflow-hidden mb-1">
                <Image
                  src="https://images.unsplash.com/photo-1615485925694-a039166d8b71?auto=format&fit=crop&q=80&w=200"
                  alt="Fresh Fruit"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Fast</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Background Decor */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
          <div className="absolute -right-20 -bottom-40 w-96 h-96 bg-zip-yellow rounded-full blur-[100px] opacity-30 animate-pulse"></div>
        </div>

        {/* Curvey Bottom Visual */}
        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-zip-gray rounded-t-[50%] scale-x-125 translate-y-8"></div>
      </div>

      {/* Scroll Tape Marquee */}
      <div className="bg-zip-yellow rotate-1 overflow-hidden py-3 border-y-2 border-black relative z-30 shadow-sm mx-[-2rem] sm:mx-0 sm:rotate-0 sm:border-x-0 mb-8">
        <Marquee speed={15} className="font-black text-zip-dark uppercase tracking-widest text-sm sm:text-base">
          <span className="mx-4 flex items-center gap-2">⚡ 10 Minute Delivery</span>
          <span className="mx-4 text-zip-dark/30">•</span>
          <span className="mx-4 flex items-center gap-2">🥦 Farm Fresh</span>
          <span className="mx-4 text-zip-dark/30">•</span>
          <span className="mx-4 flex items-center gap-2">🚚 Free Shipping</span>
          <span className="mx-4 text-zip-dark/30">•</span>
          <span className="mx-4 flex items-center gap-2">💯 Best Prices</span>
          <span className="mx-4 text-zip-dark/30">•</span>
          <span className="mx-4 flex items-center gap-2">💳 Secure Payment</span>
          <span className="mx-4 text-zip-dark/30">•</span>
        </Marquee>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 relative z-20 space-y-16" id="products">

        {/* Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between px-1">
            <h2 className="text-2xl font-bold text-zip-dark font-header tracking-tight">Shop by Category</h2>
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-zip-green font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all hover:underline decoration-2 underline-offset-4"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <motion.div
            className="flex gap-3 sm:gap-4 overflow-x-auto pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar snap-x cursor-grab active:cursor-grabbing"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((cat, index) => {
              const Icon = iconMap[cat.icon] || LayoutGrid;
              const isActive = selectedCategory === cat.id;

              return (
                <motion.button
                  key={cat.id}
                  variants={itemVariants}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "flex flex-col items-center gap-3 min-w-[100px] sm:min-w-[110px] p-4 rounded-3xl transition-all duration-300 snap-start border group relative overflow-hidden",
                    isActive
                      ? "bg-white border-zip-green ring-2 ring-zip-green/20 shadow-lg shadow-zip-green/10 -translate-y-1"
                      : "bg-white border-transparent hover:border-gray-200 hover:shadow-md hover:-translate-y-1"
                  )}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300",
                    isActive ? "bg-zip-green text-white shadow-md shadow-zip-green/30" : "bg-gray-50 text-gray-400 group-hover:bg-zip-green/10 group-hover:text-zip-green"
                  )}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className={cn(
                    "text-xs font-bold text-center leading-tight whitespace-pre-wrap px-1 transition-colors",
                    isActive ? "text-zip-dark" : "text-gray-500 group-hover:text-zip-dark"
                  )}>
                    {cat.name}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Product Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1 sticky top-20 z-30 bg-zip-gray/80 backdrop-blur-md py-4 -my-4">
            <h2 className="text-2xl font-black text-zip-dark font-header tracking-tight flex items-center gap-2">
              {selectedCategory === "all" ? "All Products" : selectedCategory}
              <span className="text-sm font-medium text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full mt-1">
                {filteredProducts.length}
              </span>
            </h2>
          </div>

          {filteredProducts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6 pb-20"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-white rounded-3xl shadow-sm border border-gray-100 mx-4">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center animate-pulse">
                <SearchX className="w-10 h-10 text-gray-300" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-800">No products found</h3>
                <p className="text-gray-400 max-w-xs mx-auto">
                  We couldn't find matches for "{searchQuery}" in {selectedCategory === 'all' ? 'any category' : selectedCategory}.
                </p>
              </div>
              <button
                onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                className="text-white bg-zip-green px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-zip-green/20 hover:bg-zip-green-dark transition-all active:scale-95"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Second Marquee */}
      <div className="bg-zip-dark text-white rotate-[-1deg] overflow-hidden py-3 border-y-2 border-white/10 relative z-30 shadow-sm mx-[-2rem] sm:mx-0 sm:rotate-0 sm:border-x-0 mt-20 mb-[-20px]">
        <Marquee speed={25} direction="right" className="font-black uppercase tracking-widest text-sm sm:text-base">
          <span className="mx-4">📱 Download the App</span>
          <span className="mx-4 text-white/30">•</span>
          <span className="mx-4">🍏 Get 50% Off First Order</span>
          <span className="mx-4 text-white/30">•</span>
          <span className="mx-4">🚀 Superfast Delivery</span>
          <span className="mx-4 text-white/30">•</span>
          <span className="mx-4">🛒 No Minimum Order</span>
          <span className="mx-4 text-white/30">•</span>
          <span className="mx-4">🍉 Freshness Guaranteed</span>
          <span className="mx-4 text-white/30">•</span>
        </Marquee>
      </div>

      <Footer />
    </div>
  );
}
