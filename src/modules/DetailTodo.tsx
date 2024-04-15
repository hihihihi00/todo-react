import { useState, useEffect, ChangeEvent } from "react";
import styles from "./DetailTodo.module.scss";
import { useTodoContext } from "../main";
import { useLocation, useNavigate } from "react-router-dom";
import { ITodo } from "../model/TaskList";

const DetailTodo = () => {
  const location = useLocation();
  const { todo } = location.state;
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (modified) {
      if (
        window.confirm("修正中の内容が破棄されます。本当にトップに戻りますか？")
      ) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  const { editSaveTodo } = useTodoContext();

  const [modified, setmodified] = useState(false);

  const [editedTodo, setEditedTodo] = useState<ITodo>(todo);

  useEffect(() => {
    const storedEditedTodo = localStorage.getItem("editedTodo");
    if (storedEditedTodo) {
      setEditedTodo(JSON.parse(storedEditedTodo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("editedTodo", JSON.stringify(editedTodo));
  }, [editedTodo]);

  console.log(editedTodo);

  const handleModifiedClick = () => {
    if (modified) {
      editSaveTodo(todo.id, editedTodo.title, editedTodo.memo);
    }
    setmodified((prevModified) => !prevModified);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedTodo((prevEditedTodo: ITodo) => ({
      ...prevEditedTodo,
      [name]: value,
    }));
  };

  return (
    <div className={styles.wrapper}>
      <h1>詳細</h1>
      <div>
        <h2 className="m-0">タイトル</h2>

        {modified ? (
          <input
            type="text"
            name="title"
            value={editedTodo.title}
            onChange={handleInputChange}
          />
        ) : (
          <p>{editedTodo.title}</p>
        )}

        <h2>メモ</h2>

        {modified ? (
          <textarea
            name="memo"
            value={editedTodo.memo}
            onChange={handleInputChange}
          />
        ) : (
          <p>{editedTodo.memo}</p>
        )}

        <p>登録日付</p>
        <p>{editedTodo.createdAt}</p>
        <p>変更日付</p>
        <p>{editedTodo.modifiedAt}</p>
      </div>

      <div className="flex flex-wrap gap-4 p-4">
        <button
          onClick={handleModifiedClick}
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-md"
        >
          {modified ? "保存する" : "修正する"}
        </button>
      </div>
      <button
        onClick={handleBackClick}
        className="bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-md shadow-md"
      >
        トップに戻る
      </button>
    </div>
  );
};

export default DetailTodo;
