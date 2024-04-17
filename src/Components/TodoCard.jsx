/* eslint-disable react/prop-types */
import { useState } from "react";
import EditModal from "./EditModal";

function TodoCard({ val, index, setTodos, todos }) {
  const [isCompleted, setIsCompleted] = useState(val.status);
  const [showModal, setShowModal] = useState(false);
  function changeComplete(bool, inx) {
    setIsCompleted(bool);
    const list = [...todos];
    const selectedTodo = list[inx];
    const selectedTodoId = selectedTodo.id;
    selectedTodo.status = bool;
    console.log(bool, inx, selectedTodo, selectedTodoId);
    setTodos(list);
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${selectedTodoId}`, {
      method: "PUT",
      body: JSON.stringify({ status: bool }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  function deleteTodo(id) {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let filteredTodos = todos.filter((item) => item != val);
        setTodos([...filteredTodos]);
      });
  }

  return (
    <div className="md:max-w-sm rounded overflow-hidden shadow-lg w-full">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{val.todoName}</div>
        <p className="text-base text-black">
          <span className="text-gray-600">Description:</span>{" "}
          {val.todoDescription}
        </p>
        <br />
        <div className="flex justify-start items-center gap-1">
          <span className="text-gray-600">Status:</span>
          <div className="flex gap-x-4">
            <label
              htmlFor="list-view"
              className="block mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Select status
            </label>
            <select
              id="list-view"
              value={isCompleted}
              onChange={({ target }) => {
                if (target.value == "true") {
                  changeComplete(true, index);
                } else {
                  changeComplete(false, index);
                }
              }}
              className={`${
                isCompleted
                  ? "bg-green-500 focus:ring-green-500 focus:border-green-500"
                  : "bg-red-400 focus:ring-red-500 focus:border-red-500"
              } placeholder-gray-400 text-white text-xs font-bold border border-gray-300 sm:text-sm rounded-lg  block w-24 sm:w-32 p-2 sm:p-2.5 `}
            >
              <option value={false}>Not Completed</option>
              <option value={true}>Completed</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center gap-1 mt-7">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 border border-green-700 rounded"
            onClick={() => setShowModal(true)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 border border-red-700 rounded"
            onClick={() => deleteTodo(val.id)}
          >
            Delete
          </button>
        </div>
        {showModal && (
          <EditModal
            setTodos={setTodos}
            todos={todos}
            val={val}
            index={index}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default TodoCard;
