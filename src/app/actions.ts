'use server';

import { signOut, auth } from '@/lib/auth';
import axios from 'axios';
import { Todo } from '@/types/todo';


export async function logout() {
  await signOut({ redirectTo: '/login' });
}

export async function addTodo(formData: FormData) {
  const session = await auth();
  if (!session || !('accessToken' in session) || !session.accessToken) {
    throw new Error('ログインが必要です');
  }

  const title = formData.get('title') as string;
  const price = formData.get('price') as string;

  // 入力バリデーション
  if (!title?.trim()) {
    return { error: 'タイトルを入力してください' };
  }
  const priceNum = parseFloat(price);
  if (!price || isNaN(priceNum) || priceNum <= 0) {
    return { error: '有効な価格（正の数値）を入力してください' };
  }

  try {
    const response = await axios.post<Todo>(
      'http://localhost:3000/todos',
      {
        title,
        completed: false,
        price: priceNum.toFixed(2),
      },
      {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      }
    );
    return { data: response.data };
  } catch (error) {
    console.error('Error adding todo:', error);
    return { error: 'Todoの追加に失敗しました' };
  }
}