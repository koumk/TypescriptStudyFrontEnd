'use client';

import { Todo } from '@/types/todo';
import { logout, addTodo } from '@/app/actions';
import { useState } from 'react';

// Props型の定義
export interface TodoPageClientProps {
  todos: Todo[];
  error: string | null;
}

export default function TodoPageClient({ todos: initialTodos, error: initialError }: TodoPageClientProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);
  const [formError, setFormError] = useState<string | null>(null);

  // Todo追加ハンドラー
  const handleAddTodo = async (formData: FormData) => {
    setIsLoading(true);
    setFormError(null);

    const result = await addTodo(formData);

    if (result.error) {
      setFormError(result.error);
      setErrorMessage(result.error);
    } else if (result.data) {
      setTodos([...todos, result.data]);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Todoリスト</h1>
          <form action={logout}>
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              ログアウト
            </button>
          </form>
        </div>

        {/* Todo追加フォーム */}
        <form action={handleAddTodo} className="mb-6 p-4 bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">タイトル</label>
              <input
                type="text"
                name="title"
                placeholder="例: 掃除"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">価格</label>
              <input
                type="text"
                name="price"
                placeholder="例: 15.00"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
          </div>
          {formError && <p className="mt-2 text-red-500 text-sm">{formError}</p>}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? '追加中...' : 'Todoを追加'}
          </button>
        </form>

        {/* Todoリスト */}
        {isLoading && <p className="text-center text-gray-500">読み込み中...</p>}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        {!isLoading && todos.length === 0 && !errorMessage && (
          <p className="text-center text-gray-500">Todoがありません</p>
        )}
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{todo.title}</h2>
                <p className="text-sm text-gray-500">価格: ¥{todo.price}</p>
                <p className="text-sm text-gray-500">
                  状態: {todo.completed ? '完了' : '未完了'}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  todo.completed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}
              >
                {todo.completed ? '完了' : '未完了'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}