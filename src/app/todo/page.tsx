import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import axios from 'axios';
import { Todo } from '@/types/todo';
import TodoPageClient from '@/components/TodoPageClient';

// サーバーコンポーネントでのデータ取得関数
async function fetchTodos(token: string): Promise<Todo[]> {
  try {
    const response = await axios.get('http://localhost:3000/todos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
}

// サーバーコンポーネント（デフォルトエクスポート）
export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  const todos = await fetchTodos(session.accessToken!);
  const error = todos.length === 0 ? 'Todoデータの取得に失敗しました' : null;

  // 正しいコンポーネント使用
  return <TodoPageClient todos={todos} error={error} />;
}