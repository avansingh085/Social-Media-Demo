'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/app/lib/axios';

interface User {
  _id: string;
  username: string;
}

export default function FollowingPage() {
  const router = useRouter();
  const [following, setFollowing] = useState<User[]>([]);

  useEffect(() => {
    const fetchFollowing = async () => {
     
      const res = await api.get('/users/following');

      if (res.status === 401) {
        router.push('/login');
      }
      setFollowing(res.data);
    };

    fetchFollowing();
  }, [router]);

  const handleUnfollow = async (targetUserId: string) => {
    const token = localStorage.getItem('token');
    await api.post(`/users/${targetUserId}/unfollow`);
    setFollowing(following.filter((user) => user._id !== targetUserId));
  };

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4 font-bold">Following</h1>
      {following.length === 0 ? (
        <p>You are not following anyone yet.</p>
      ) : (
        following.map((user) => (
          <div key={user._id} className="flex justify-between mb-2">
            <span>{user.username}</span>
            <button
              onClick={() => handleUnfollow(user._id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Unfollow
            </button>
          </div>
        ))
      )}
    </div>
  );
}
