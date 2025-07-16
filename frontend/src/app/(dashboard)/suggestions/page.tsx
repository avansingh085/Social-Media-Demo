'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/app/lib/axios';

interface User {
  _id: string;
  username: string;
}

export default function SuggestionsPage() {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await api.get('/users/suggestions');
        setSuggestions(res.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [router]);

  const handleFollowRequest = async (targetUserId: string) => {
    try {
      await api.post(`/users/${targetUserId}/follow-request`);
      setSuggestions(suggestions.filter((u) => u._id !== targetUserId));
    } catch (error) {
      console.error('Failed to send follow request', error);
    }
  };

  if (loading) {
    return <div className="p-8">Loading suggestions...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4 font-bold">People You May Know</h1>
      {suggestions.length === 0 ? (
        <p>No new users to follow.</p>
      ) : (
        suggestions.map((user) => (
          <div key={user._id} className="flex justify-between items-center mb-2">
            <span>{user.username}</span>
            <button
              onClick={() => handleFollowRequest(user._id)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Send Follow Request
            </button>
          </div>
        ))
      )}
    </div>
  );
}
