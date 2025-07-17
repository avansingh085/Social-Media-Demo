'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getToken, removeToken } from '../lib/auth';
import api from '../lib/axios';

export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState(null);
 
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

        router.push('/login');
    };

    return (
        <nav className="w-screen py-4 text-white font-medium    flex justify-between px-8 bg-green-400">
            <div className="flex gap-4 ">
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
            <div>
                {user ? (
                    <button onClick={handleLogout} className="bg-white h-8 w-24 text-black font-medium hover:cursor-pointer text-sm">
                        Logout
                    </button>
                ) : (
                    <>
                        <Link href="/login" className="mr-4">
                            Login
                        </Link>
                        <Link href="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
