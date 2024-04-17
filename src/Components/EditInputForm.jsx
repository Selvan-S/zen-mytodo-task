import React, { useEffect, useState } from "react";

function EditInputForm({ setTodos, index, todos, id, onClose }) {
  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setTodoName(data.todoName);
        setTodoDescription(data.todoDescription);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setDisable(true);
    const formData = {
      todoName,
      todoDescription,
    };
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        updateTodos(data);
      });
    setTodoName("");
    setTodoDescription("");
    setDisable(false);
    onClose();
  }
  function updateTodos(updatedData) {
    const list = [...todos];
    list.splice(index, 1, updatedData);
    setTodos(list);
  }
  return (
    <form className="w-full max-w-xl mx-auto mt-5" onSubmit={handleSubmit}>
      <div className="flex flex-wrap mb-2 gap-3">
        <div className="w-full px-3 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="todo-name"
          >
            Todo Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="todo-name"
            type="text"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            placeholder="Todo Name"
          />
        </div>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="todo-description"
          >
            Todo Description
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="todo-description"
            type="text"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 border border-green-700 rounded mx-3 mt-4 uppercase"
          disabled={disable}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default EditInputForm;
