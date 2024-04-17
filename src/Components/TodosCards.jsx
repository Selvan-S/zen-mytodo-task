import React from "react";
import TodoCard from "./TodoCard";

function TodosCards({ todos, filter, setTodos }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:mx-4 place-items-center mx-10">
      {todos.map((val, index) => {
        if (filter == "all") {
          return (
            <TodoCard
              key={val.id}
              val={val}
              index={index}
              setTodos={setTodos}
              todos={todos}
            />
          );
        } else if (filter == "completed") {
          if (val.status) {
            return (
              <TodoCard
                key={val.id}
                val={val}
                index={index}
                setTodos={setTodos}
                todos={todos}
              />
            );
          }
        } else {
          if (!val.status) {
            return (
              <TodoCard
                key={val.id}
                val={val}
                index={index}
                setTodos={setTodos}
                todos={todos}
              />
            );
          }
        }
      })}
    </div>
  );
}

export default TodosCards;
