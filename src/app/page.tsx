import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/todo');
}

// "use client";
 
// // pages/index.tsx
//  import { useState, useEffect } from 'react';
//  import axios from 'axios';
//  import { Todo } from '../types/todo';
 
//  export default function Home() {
//    const [todos, setTodos] = useState<Todo[]>([]);
//    const [newTodo, setNewTodo] = useState({ title: '', price: '0.00' });
 
//    useEffect(() => {
//      // Todo一覧を取得
//      axios.get<Todo[]>('http://localhost:3000/todos').then((response) => {
//        setTodos(response.data);
//      });
//    }, []);
 
//    const createTodo = async () => {
//      const response = await axios.post<Todo>('http://localhost:3000/todos', {
//        title: newTodo.title,
//        completed: false,
//        price: newTodo.price,
//      });
//      setTodos([...todos, response.data]);
//      setNewTodo({ title: '', price: '0.00' });
//    };
 
//    return (
//      <div>
//            <h1 className="text-3xl font-bold underline">
//      Hello world!
//    </h1>

//        <h1>Todoリスト</h1>
//        <input
//          type="text"
//          value={newTodo.title}
//          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
//          placeholder="新しいTodo"
//        />
//        <input
//          type="text"
//          value={newTodo.price}
//          onChange={(e) => setNewTodo({ ...newTodo, price: e.target.value })}
//          placeholder="価格"
//        />
//        <button onClick={createTodo} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-2xl shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out">
//        追加
//        </button>
//        <ul>
//          {todos.map((todo) => (
//            <li key={todo.id}>
//              {todo.title} - ¥{todo.price} - {todo.completed ? '完了' : '未完了'}
//            </li>
//          ))}
//        </ul>
//      </div>
//    );
//  }