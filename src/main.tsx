import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ITodo } from "./model/TaskList";

const TodoContext = createContext<{
  todos: ITodo[];
  addTodo: (title: string, memo: string) => void;
  toggleTodo: (id: string) => void;
  clearCompletedTodos: () => void;
  removeTodo: (id: string) => void;
  editSaveTodo: (id: string, newTitle: string, newMemo: string) => void;
}>({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  clearCompletedTodos: () => {},
  removeTodo: () => {},
  editSaveTodo: () => {},
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  // ストレージ保存
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  // Todoの追加
  const addTodo = (title: string, memo: string) => {
    const day = CurrentDate();
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: uuidv4(),
        title: title,
        memo: memo,
        createdAt: day,
        modifiedAt: day,
        completed: false,
      },
    ]);
  };

  // Todoの完了状態を切り替える関数
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 完了したTodoを削除する関数
  const clearCompletedTodos = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  // 削除ボタンワンクリックで削除
  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Todoを修正する関数
  const editSaveTodo = (id: string, newTitle: string, newMemo: string) => {
    const editedTodoIndex = todos.findIndex((todo) => todo.id === id);
    console.log(editedTodoIndex);
    if (editedTodoIndex !== -1) {
      // Todoの内容を変更する
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos];
        console.log(updatedTodos);
        updatedTodos[editedTodoIndex] = {
          ...updatedTodos[editedTodoIndex],
          title: newTitle,
          memo: newMemo,
          modifiedAt: CurrentDate() + "(修正)",
        };
        return updatedTodos;
      });
      console.log(todos);
    }
  };

  // 現在の日付を取得する関数
  const CurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    return year + "-" + month + "-" + day + " ";
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        clearCompletedTodos,
        removeTodo,
        editSaveTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// useContextを使ってTodoContextの値を取得するカスタムフック
export const useTodoContext = () => useContext(TodoContext);
