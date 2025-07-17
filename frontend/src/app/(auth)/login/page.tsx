'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import api from '@/app/lib/axios';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { setToken } from '@/app/lib/auth';
import { useState } from 'react'
export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const [loading,setLoading]=useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const res = await api.post('/auth/login', data);
    setToken(res.data.access_token);
    setLoading(false);
    window.location.href='/timeline';
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Username" {...register('username')} />
        <Input type="password" placeholder="Password" {...register('password')} />
        <Button type="submit" disabled={loading}>{loading ? "wait...":"Login"}</Button>
      </form>
    </div>
  );
}
