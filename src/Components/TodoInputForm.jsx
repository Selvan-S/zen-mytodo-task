import React, { useState } from "react";

function TodoInputForm({ setTodos }) {
  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [disable, setDisable] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setDisable(true);
    const formData = {
      todoName,
      todoDescription,
      status: false,
    };
    fetch(import.meta.env.VITE_REACT_APP_BACKEND_URL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos((previewData) => [...previewData, data]);
      })
      .catch((error) => console.log(error));
    setTodoName("");
    setTodoDescription("");
    setDisable(false);
  }
  return (
    <form className="w-full max-w-xl mx-auto mt-5" onSubmit={handleSubmit}>
      <div className="flex flex-wrap mb-6">
        <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
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
        <div className="w-full md:w-2/5 px-3">
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
          className="w-full md:w-1/5 bg-green-500 hover:bg-green-700 text-white font-bold py-3 md:px-3 border border-green-700 rounded h-fit mt-6 mx-3 md:mt-5 md:mx-0"
          disabled={disable}
        >
          Add Todo
        </button>
      </div>
    </form>
  );
}

export default TodoInputForm;
