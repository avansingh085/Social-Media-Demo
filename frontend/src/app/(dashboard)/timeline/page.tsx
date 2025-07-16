'use client';

import { getToken } from '@/app/lib/auth';
import api from '@/app/lib/axios';
import { useEffect, useState } from 'react';

interface Post {
  _id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
}

export default function TimelinePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchFeed = async () => {
      
      const res = await api.get('/posts/feed');
      console.log(res,"POST___________________")
      setPosts(res.data);
    };
    fetchFeed();
  }, []);

  return (
    <div className="max-w-xl mx-auto py-10 bg-white">
      <h1 className="text-2xl mb-4">Timeline</h1>
      {posts.map((post) => (
        <div key={post._id} className="border p-4 mb-4">
          <h2 className="font-bold">{post.title}</h2>
          <p>{post.description}</p>
          <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
