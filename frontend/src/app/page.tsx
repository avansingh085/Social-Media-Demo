'use client';

import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getToken } from './lib/auth';
import Layout from './components/Layout';

export default function HomePage() {
  
  const router = useRouter();


  return (
    <>
    
      <h2 className="text-2xl font-semibold">Welcome to the Home Page!</h2>
      <p>Social Media Demo</p>
    
    </>
  );
}
