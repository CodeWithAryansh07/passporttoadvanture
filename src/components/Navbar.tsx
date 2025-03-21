"use client";

import { useState, useEffect, useRef } from 'react';
import { Menu, X, User, ChevronDown, LogOut, ShoppingCart, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import axios from 'axios';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchCookie = async () => {
            try {
                const response = await axios.get('/api/get-cookie', {
                    withCredentials: true,
                });
                const data = await response.data;
                setToken(data.token);
            } catch (error) {
                console.error("Error fetching cookie:", error);
            }
        };

        fetchCookie();
    }, []);

    // Close the profile menu when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target as Node)
            ) {
                setIsProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const pathname = usePathname();
    
    if (pathname === "/login" || pathname === "/register" || pathname.startsWith("/profile")) return null;

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
            setToken(null);
            window.location.href = '/';
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

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
                        
                        {token ? (
                            <div className="relative" ref={profileMenuRef}>
                                <button
                                    title='Profile'
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                    className={`flex cursor-pointer items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                                        isScrolled
                                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                                >
                                    <User className="w-5 h-5" />
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isProfileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                                        <Link
                                            href="/profile"
                                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            <User className="w-4 h-4 mr-2" />
                                            Profile
                                        </Link>
                                        <Link
                                            href="/profile/wishlist"
                                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            <Heart className="w-4 h-4 mr-2" />
                                            Wishlist
                                        </Link>
                                        <Link
                                            href="/profile/cart"
                                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            Cart
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className={`px-6 py-2 rounded-full font-medium transition-colors cursor-pointer ${
                                    isScrolled
                                        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                        : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                                }`}
                            >
                                Login
                            </Link>
                        )}
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
                            {token ? (
                                <>
                                    <Link
                                        href="/profile"
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                                            isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                                        }`}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/profile/wishlist"
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                                            isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                                        }`}
                                    >
                                        Wishlist
                                    </Link>
                                    <Link
                                        href="/profile/cart"
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                                            isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                                        }`}
                                    >
                                        Cart
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className={`w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 ${
                                            isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                                        }`}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        isScrolled
                                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
