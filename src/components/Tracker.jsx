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
        isLight
          ? "bg-[#f8f9fa] text-[#212529]"
          : "bg-[#121212] text-[#ffffff]"
      } min-h-screen`}
    >
      <div className="pt-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-6">
          <h1 className="text-4xl font-bold">Task Tracker</h1>
          <button
            onClick={() => setIsLight((prev) => !prev)}
            className={`p-2 rounded-full ${
              isLight
                ? "bg-[#e9ecef] hover:bg-[#d6d8db]"
                : "bg-[#272727] hover:bg-[#383838]"
            }`}
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
            className={`flex-grow border ${
              isLight
                ? "bg-[#ffffff] text-[#212529]"
                : "bg-[#1e1e1e] text-[#ffffff]"
            } border-gray-300 rounded-lg p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter your task here..."
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#007bff] text-white rounded-lg shadow-lg hover:bg-[#0056b3]"
          >
            Add Task
          </button>
          <input
            className={`flex-grow md:flex-grow-0 border ${
              isLight
                ? "bg-[#ffffff] text-[#212529]"
                : "bg-[#1e1e1e] text-[#ffffff]"
            } border-gray-300 rounded-lg p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                    ? isLight
                      ? "bg-[#d4edda] text-[#155724]"
                      : "bg-[#272727] text-[#ffffff]"
                    : isLight
                    ? "bg-[#e9ecef] text-[#212529]"
                    : "bg-[#1e1e1e] text-[#ffffff]"
                }`}
              >
                <div className="flex flex-col flex-grow">
                  <span
                    className={`text-lg font-semibold ${
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
                  ) : null}
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
