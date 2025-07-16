'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { getToken } from '@/app/lib/auth';
import { useRouter } from 'next/navigation';
import { Input } from '@/app/components/ui/input';
import api from '@/app/lib/axios';
export default function CreatePostPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const token = getToken();
    await api.post('/posts', data);
    router.push('/timeline');
  };

  return (
    <div className="max-w-md mx-auto py-10 bg-white">
      <h1 className="text-2xl mb-4">Create Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Title" {...register('title')} />
        <Textarea placeholder="Description" {...register('description')} />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
