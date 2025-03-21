"use client"

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/5 py-4 backdrop-blur-sm'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Image
                            src="/assets/logo.png"
                            alt="TravelIndia"
                            width={40}
                            height={40}
                            className="h-10 w-auto"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className={`text-lg font-medium transition-colors ${
                                isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/destinations"
                            className={`text-lg font-medium transition-colors ${
                                isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                            }`}
                        >
                            Destinations
                        </Link>
                        <Link
                            href="/about-us"
                            className={`text-lg font-medium transition-colors ${
                                isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                            }`}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact-us"
                            className={`text-lg font-medium transition-colors ${
                                isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                            }`}
                        >
                            Contact
                        </Link>
                        <button
                            className={`px-6 py-2 rounded-full font-medium transition-colors cursor-pointer ${
                                isScrolled
                                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                    : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                            }`}
                        >
                            Login
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-2 rounded-md ${isScrolled ? 'text-gray-600' : 'text-white'}`}
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div
                            className={`px-2 pt-2 pb-3 space-y-1 ${
                                isScrolled ? 'bg-white' : 'bg-black/50 backdrop-blur-md'
                            }`}
                        >
                            <Link
                                href="/"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/destinations"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                                }`}
                            >
                                Destinations
                            </Link>
                            <Link
                                href="/about"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                                }`}
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                                }`}
                            >
                                Contact
                            </Link>
                            <button
                                className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                                    isScrolled ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
