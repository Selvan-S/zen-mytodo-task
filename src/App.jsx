import { useEffect, useState } from "react";
import "./App.css";
import TodoInputForm from "./Components/TodoInputForm";
import TodosCards from "./Components/TodosCards";
function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_APP_BACKEND_URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-10">
      <h1 className="text-center text-green-700 font-bold text-2xl mb-10">
        My Todo
      </h1>
      <TodoInputForm setTodos={setTodos} />
      <div className="flex justify-between mx-5 my-8">
        <h3 className="font-bold">My Todos</h3>
        <div className="flex justify-center items-center gap-1">
          <div className="font-bold">Status Filter : </div>{" "}
          <div className="flex gap-x-4">
            <label
              htmlFor="list-view"
              className="block mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              status filter
            </label>
            <select
              id="list-view"
              onChange={({ target }) => {
                setFilter(target.value);
              }}
              className={`text-white bg-red-400 border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-xs  border  sm:text-sm rounded-lg  block w-24 sm:w-32 p-2 sm:p-2.5 font-bold`}
            >
              <option value="all" defaultValue="all">
                All
              </option>
              <option value="completed">Completed</option>
              <option value="not-completed">Not completed</option>
            </select>
          </div>
        </div>
      </div>
      <TodosCards todos={todos} filter={filter} setTodos={setTodos} />
    </div>
  );
}

export default App;
