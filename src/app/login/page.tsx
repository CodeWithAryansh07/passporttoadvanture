/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState(new FormData());

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (isLogin) {
            try {

                const response = await axios.post('api/auth/login', {
                    email,
                    password,
                    remember: formData.get('remember') === 'true' ? true : false,
                });

                if (response.status === 200) {
                    toast.success("Login successful", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                    })

                    router.push('/');
                } else {
                    toast.error("Login failed", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                    })
                }

                console.log(response.data);

            } catch (error) {
                toast.error("Login failed", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                })
                console.log(error);
            }
        } else {

            const confirmPassword = formData.get('confirmPassword') as string;
            const fullName = formData.get('fullName') as string;

            if (password !== confirmPassword) {
                toast.error("Passwords do not match", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                })
                return;
            }

            try {
                const response = await axios.post('api/auth/register', {
                    username: fullName,
                    email,
                    password,
                });

                if (response.status === 201) {
                    toast.success("Registration successful", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                    })

                    router.push('/');
                } else {
                    toast.error("Registration failed", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                    })
                }
                console.log(response.data);
            } catch (error) {
                toast.error("Registration failed", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                })
                console.log(error);
                
            }
        }
    }

    // useEffect(() => {
    //     // toast("Hello")
    //     toast.success("Hello", {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //     })
    // }, [])

    // useEffect(() => {
    //     const fetchCookie = async () => {
    //         try {
    //             const response = await axios.get('/api/get-cookie', {
    //                 withCredentials: true,
    //             });
    //             const data = await response.data
    //             console.log("Cookie data:", data);
                
    //         } catch (error) {
    //             console.error("Error fetching cookie:", error);
    //         }
    //     };

    //     fetchCookie();
    // })

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Background Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Toggle Buttons */}
                    <div className="flex">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`w-1/2 py-4 text-sm font-medium transition-colors duration-300 ${isLogin
                                ? 'bg-yellow-500 text-white'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer'
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`w-1/2 py-4 text-sm cursor-pointer font-medium transition-colors duration-300 ${!isLogin
                                ? 'bg-yellow-500 text-white'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer'
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Form Container */}
                    <div className="px-8 py-12">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                            {isLogin ? 'Welcome Back!' : 'Create Account'}
                        </h2>

                        <form className="space-y-6">
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="text"
                                            name="fullName"
                                            onChange={(e) => {
                                                formData.set('fullName', e.target.value);
                                            }}
                                            required
                                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={(e) => {
                                            formData.set('email', e.target.value);
                                        }}
                                        required
                                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        onChange={(e) => {
                                            formData.set('password', e.target.value);
                                        }}
                                        required
                                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5 text-gray-400 cursor-pointer" />
                                        ) : (
                                            <Eye className="w-5 h-5 text-gray-400 cursor-pointer" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            onChange={(e) => {
                                                formData.set('confirmPassword', e.target.value);
                                            }}
                                            required
                                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-5 h-5 text-gray-400 cursor-pointer" />
                                            ) : (
                                                <Eye className="w-5 h-5 text-gray-400 cursor-pointer" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {isLogin && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            title='Remember me'
                                            name="remember"
                                            onChange={(e) => {
                                                formData.set('remember', e.target.checked ? 'true' : 'false');
                                            }}
                                            type="checkbox"
                                            className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 block text-sm text-gray-700">
                                            Remember me
                                        </label>
                                    </div>
                                    <button
                                        type="button"
                                        className="text-sm font-medium text-yellow-600 hover:text-yellow-500"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={handleSubmit}
                                className="w-full cursor-pointer bg-yellow-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-300"
                            >
                                {isLogin ? 'Sign In' : 'Create Account'}
                            </button>
                        </form>

                        {/* <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <img
                                        className="h-5 w-5"
                                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                                        alt="Google"
                                    />
                                </button>
                                <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <img
                                        className="h-5 w-5"
                                        src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                                        alt="Facebook"
                                    />
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;