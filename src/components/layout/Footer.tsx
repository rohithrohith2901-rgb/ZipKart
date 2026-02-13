"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-gray-200 py-12 bg-white relative z-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <Link href="/" className="inline-block">
                        <div className="relative w-40 h-12">
                            <Image
                                src="/images/zipkart_logo.png"
                                alt="ZipKart"
                                fill
                                className="object-cover object-left w-full"
                            />
                        </div>
                    </Link>
                    <p className="text-gray-500 text-sm">
                        India's last minute app. Fast, reliable, and fresh.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold text-zip-dark text-sm uppercase tracking-wider">Useful Links</h4>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><Link href="#" className="hover:text-zip-green">About Us</Link></li>
                        <li><Link href="#" className="hover:text-zip-green">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-zip-green">Terms</Link></li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h4 className="font-bold text-zip-dark text-sm uppercase tracking-wider">Categories</h4>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><Link href="#" className="hover:text-zip-green">Vegetables</Link></li>
                        <li><Link href="#" className="hover:text-zip-green">Fruits</Link></li>
                        <li><Link href="#" className="hover:text-zip-green">Dairy</Link></li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h4 className="font-bold text-zip-dark text-sm uppercase tracking-wider">Contact</h4>
                    <p className="text-gray-500 text-sm">support@zipkart.com</p>
                    <p className="text-gray-500 text-sm">+91 123 456 7890</p>
                </div>
            </div>
            <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-400 text-xs">
                &copy; 2026 ZipKart. All rights reserved.
            </div>
        </footer>
    );
}
