import styles from "./Todo.module.scss";
import { useTodoContext } from "../main";
import { useNavigate } from "react-router-dom";
import { ITodo } from "../model/TaskList";

export const Todo = ({ todo }: { todo: ITodo }) => {
  const { toggleTodo, removeTodo } = useTodoContext();

  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/detail/${todo.id}`, { state: { todo } });
  };

  const handleTodoClick = () => {
    toggleTodo(todo.id);
    console.log(todo);
  };

  const removeTodoClick = () => {
    removeTodo(todo.id);
  };

  const taskClassName = `${styles.tasks} ${
    todo.completed ? styles.isActive : ""
  }`;

  return (
    <div className={styles.root}>
      <div className={taskClassName}>
        <h2 className="m-0">タイトル</h2>
        <p>{todo.title}</p>
        {/* <h2>メモ</h2>
        <p>{todo.memo}</p>
        <p>{todo.createdAt}</p> */}
      </div>

      <div className="flex flex-wrap gap-4 p-4">
        <button
          onClick={handleDetailClick}
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-md"
        >
          詳細を見る
        </button>

        <button
          onClick={handleTodoClick}
          className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-md shadow-md"
        >
          {todo.completed ? "未完了にする" : "完了にする"}
        </button>

        <button
          onClick={removeTodoClick}
          className="bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-md shadow-md"
        >
          削除する
        </button>
      </div>
    </div>
  );
};
