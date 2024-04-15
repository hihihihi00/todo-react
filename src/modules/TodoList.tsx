import { Todo } from "./Todo";
import { useTodoContext } from "../main";

const TodoList = () => {
  const { todos } = useTodoContext();

  console.log(todos);

  return (
    <>
      {todos.length === 0 ? (
        <div>タスクを追加してください</div>
      ) : (
        todos.map((todo) => <Todo todo={todo} key={todo.id} />)
      )}
    </>
  );
};

export default TodoList;
