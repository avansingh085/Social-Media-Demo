'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getToken, removeToken } from '../lib/auth';
import api from '../lib/axios';

export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState(null);
 console.log(user,"PPPPPPPPPPPPPPPPPPPPPPPPPPP")
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
        <nav className="w-full py-4 border-b flex justify-between px-8">
            <div className="flex gap-4">
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
                    <button onClick={handleLogout} className="underline text-sm">
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
