import React from 'react'
import EditInputForm from './EditInputForm';

function EditModal({ setTodos, index, todos, val, onClose }) {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`bg-white sm:w-[600px] w-[328px] max-w-full h-[340px] rounded-xl p-4 flex flex-col relative`}
      >
        <EditInputForm
          setTodos={setTodos}
          id={val.id}
          onClose={onClose}
          index={index}
          todos={todos}
        />
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 border border-red-700 rounded mx-3 uppercase"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default EditModal