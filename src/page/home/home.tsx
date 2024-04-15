import TodoList from "../../modules/TodoList";
import styles from "./home.module.scss";
import { useRef } from "react";

import { useTodoContext } from "../../main";

function Home() {
  const { addTodo } = useTodoContext();

  const todoTitleRef = useRef<HTMLInputElement>(null);
  const todoMemoRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = () => {
    const title = todoTitleRef.current?.value;
    const memo = todoMemoRef.current?.value;
    if (!title || !memo) return;
    addTodo(title, memo);
    if (todoTitleRef.current) todoTitleRef.current.value = "";
    if (todoMemoRef.current) todoMemoRef.current.value = "";
  };

  return (
    <div className={styles.wrapper}>
      <h1 className="">TODOアプリ</h1>
      <TodoList />
      <div className="mt-4">
        <p>タイトル名</p>
        <input
          type="text"
          ref={todoTitleRef}
          className="border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md px-4 py-2 w-full"
        />
        <p>メモ</p>
        <input
          type="text"
          ref={todoMemoRef}
          className="border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md px-4 py-2 w-full"
        />
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleAddTodo}
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md shadow-md"
          >
            タスクを追加
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
