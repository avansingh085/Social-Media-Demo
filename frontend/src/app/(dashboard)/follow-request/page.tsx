'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/app/lib/axios';

interface User {
  _id: string;
  username: string;
}
export default function FollowRequestPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<User[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
     
      const res = await api.get('/users/follow-requests');
    
      if (res.status === 401) {
        router.push('/login');
      }
      setRequests(res.data.followRequests);
    };

    fetchRequests();
  }, [router]);

  const handleAccept = async (requesterId: string) => {
   
    await api.post(`/users/follow-request/${requesterId}/accept`);
    setRequests(requests.filter(r => r._id !== requesterId));
  };

  const handleReject = async (requesterId: string) => {
    await api.post(`/users/follow-request/${requesterId}/reject`);
    setRequests(requests.filter(r => r._id !== requesterId));
  };

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4 font-bold">Follow Requests</h1>
      {requests?.length === 0 ? (
        <p>No follow requests.</p>
      ) : (
        requests?.map((user) => (
          <div key={user._id} className="flex justify-between mb-2">
            <span>{user.username}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleAccept(user._id)}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleReject(user._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
