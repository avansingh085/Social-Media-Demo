'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getToken, removeToken } from '../lib/auth';
import api from '../lib/axios';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
 
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/users/profile');
                setUser(res.data)
                return res.data;
            } catch (err) {
                setUser(null);
                return null;
            }
        }
        fetchProfile();
    }, []);

    const handleLogout = () => {
        removeToken();
        window.location.href='/login';
    };

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={`
                fixed top-0 left-0 h-full w-64 bg-green-500 z-50 transform transition-all duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden
            `}>
                <div className="p-4 flex flex-col h-full">
                    <button 
                        onClick={toggleSidebar}
                        className="self-end mb-6"
                    >
                        <X size={24} />
                    </button>
                    
                    {user && (
                        <div className="flex flex-col gap-6">
                            <Link href="/timeline" onClick={toggleSidebar}>Timeline</Link>
                            <Link href="/create-post" onClick={toggleSidebar}>Create Post</Link>
                            <Link href="/follow-request" onClick={toggleSidebar}>Follow Request</Link>
                            <Link href="/following" onClick={toggleSidebar}>Following</Link>
                            <Link href="/suggestions" onClick={toggleSidebar}>Suggestions</Link>
                        </div>
                    )}
                    
                    <div className="mt-auto">
                        {user ? (
                            <button 
                                onClick={handleLogout} 
                                className="bg-white h-10 w-full text-black font-medium hover:cursor-pointer text-sm rounded"
                            >
                                Logout
                            </button>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <Link href="/login" className="text-center" onClick={toggleSidebar}>
                                    Login
                                </Link>
                                <Link href="/register" className="text-center" onClick={toggleSidebar}>
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="w-screen py-4 text-white font-medium flex justify-between px-8 bg-green-500 sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button 
                        onClick={toggleSidebar}
                        className="lg:hidden mr-4"
                    >
                        <Menu size={24} />
                    </button>

                    {/* Desktop Links - Hidden on mobile */}
                    <div className="hidden lg:flex gap-4">
                        {user && (
                            <>
                                <Link href="/timeline">Timeline</Link>
                                <Link href="/create-post">Create Post</Link>
                                <Link href="/follow-request">Follow Request</Link>
                                <Link href="/following">Following</Link>
                                <Link href="/suggestions">Suggestions</Link>
                            </>
                        )}
                    </div>
                </div>
                
                <div>
                    {user ? (
                        <button 
                            onClick={handleLogout} 
                            className="bg-white h-8 w-24 text-black font-medium hover:cursor-pointer text-sm rounded hidden lg:block"
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="hidden lg:flex gap-4">
                            <Link href="/login">Login</Link>
                            <Link href="/register">Register</Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}