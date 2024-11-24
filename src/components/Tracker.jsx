import React, { useState } from "react";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import useLocalStorage from "../hooks/useLocalStorage";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Tracker = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [search, setSearch] = useState("");
  const [isLight, setIsLight] = useState(true);

  function addNewTodo(task) {
    const today = new Date();
    const date = today.toISOString().split("T")[0];
    const time = today.toTimeString().split(" ")[0];
    const newCreated = {
      id: Date.now(),
      task,
      isDone: false,
      dateTime: `${date} ${time}`,
    };
    const updatedTodos = [...todos, newCreated];
    setTodos(updatedTodos);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newTodo === "") return;
    addNewTodo(newTodo);
    setNewTodo("");
  }

  function handleToggle({ id, isDone }) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !isDone } : todo
      )
    );
  }

  function handleDelete({ id }) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  return (
    <div
      className={`${
        isLight ? "bg-gray-100 text-gray-800" : "bg-gray-900 text-white"
      } min-h-screen`}
    >
      <div className="pt-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-6">
          <h1 className="text-4xl font-bold">Task Tracker</h1>
          <button
            onClick={() => setIsLight((prev) => !prev)}
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"
          >
            {isLight ? (
              <DarkModeIcon fontSize="large" />
            ) : (
              <LightModeIcon fontSize="large" />
            )}
          </button>
        </div>

        {/* Form */}
        <form
          className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 mt-8"
          onSubmit={handleSubmit}
        >
          <input
            className="flex-grow border border-gray-300 rounded-lg p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter your task here..."
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
          >
            Add Task
          </button>
          <input
            className="flex-grow md:flex-grow-0 border border-gray-300 rounded-lg p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
          />
        </form>

        {/* Task List */}
        <div className="mt-8 grid gap-4 px-6">
          {todos
            .filter((todo) =>
              search === ""
                ? true
                : todo.task.toLowerCase().includes(search.toLowerCase())
            )
            .map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center justify-between p-4 border rounded-lg shadow-md ${
                  todo.isDone
                    ? "bg-green-200 dark:bg-green-700"
                    : "text-white bg-white dark:bg-gray-800"
                }`}
              >
                <div className="flex flex-col flex-grow">
                  <span
                    className={`text-lg text-white font-semibold ${
                      todo.isDone ? "line-through" : ""
                    }`}
                  >
                    {todo.task}
                  </span>
                  <span className="text-sm text-gray-500">{todo.dateTime}</span>
                </div>
                <div className="flex items-center space-x-4">
                  {todo.isDone ? (
                    <DoneIcon className="text-green-500" />
                  ) : (
                    <></>
                  )}
                  <button
                    onClick={() => handleToggle(todo)}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {todo.isDone ? (
                      <ToggleOnOutlinedIcon className="text-blue-500" />
                    ) : (
                      <ToggleOffOutlinedIcon className="text-red-500" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(todo)}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <DeleteIcon className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tracker;
