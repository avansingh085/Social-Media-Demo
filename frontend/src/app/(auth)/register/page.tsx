'use client';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import api from '@/app/lib/axios';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { useState } from 'react';

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [loading,setLoading]=useState(false);
  const onSubmit = async (data: any) => {
    setLoading(true);
    await api.post('/auth/register', data);
    setLoading(false);
    router.push('/login');
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Username" {...register('username')} />
        <Input type="password" placeholder="Password" {...register('password')} />
        <Button type="submit" disabled={loading}>{loading ? "wait..." :"Register"}</Button>
      </form>
    </div>
  );
}
