import axios from "axios";
import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";

interface Profile {
  index: number;
}

interface Todo {
  id: number;
  title: string;
  dueDate: string;
  isCompleted: boolean;
  profile: Profile;
  description?: string;
}

export function TodoCard({ onEdit }: { onEdit: (todo: Todo) => void }) {
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  //const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllTodos = async () => {
      try {
        const index = localStorage.getItem("index");
        if (!index) {
          setError("Profile ID not found. Please login again.");
          setLoading(false);
          return;
        }
        const res = await axios.get(
          `http://localhost:8080/todo/getByProfileId/${index}`
        );
        setTodos(res.data);
      } catch (error) {
        console.error("Error fetching todos.", error);
        setError("Failed to load todos. Please check console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllTodos();
  }, []);

  const handleDelete = async (todoId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this permanently?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8080/todo/delete/${todoId}`);
        setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
        Swal.fire({
          title: "Deleted!",
          text: "Your Task has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to delete",
        text: "There was a problem deleting the todo. Please try again.",
      });
    }
  };

  // const handleUpdate = (todoId: number, e?: React.MouseEvent) => {
  //   if (e) e.stopPropagation();
  // };

  const handleToggleComplete = async (todo: Todo, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      // Prepare the full todo object as required by backend
      
      const updatedTodo = {
        ...todo,
        isCompleted: !todo.isCompleted,
        profile: { index: Number(localStorage.getItem("index")) }, // Ensure profile is present and correct
      };
      await axios.put(
        `http://localhost:8080/todo/update/${todo.id}`,
        updatedTodo
      );
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? { ...updatedTodo } : t))
      );
    } catch (error) {
      console.error("Error updating todo status:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update",
        text: "There was a problem updating the todo. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-2xl bg-white p-10">
          <div className="flex flex-col items-center justify-center text-gray-700">
            <svg
              className="animate-spin h-8 w-8 mb-4 text-slate-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <span className="text-lg font-semibold">
              Loading tasks, please wait...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed top-70 left-90 shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-2xl">
        <div className="flex flex-col items-center justify-center p-10 text-red-600">
          <svg
            className="h-8 w-8 mb-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
          <span className="text-lg font-semibold mb-2">
            Failed to load Todos
          </span>
          <span className="text-base">{error}</span>
          <p className="mt-2 text-sm text-gray-500">
            Please ensure your backend server is running and accessible at{" "}
            <span className="font-mono">http://localhost:8080/profile/all</span>
            .<br />
            If the issue persists, check your network connection or contact
            support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-500 min-h-screen bg-white rounded-xl overflow-auto p-6 ">
      <h2 className="text-2xl font-bold mb-6 text-slate-600">My Tasks</h2>
      <div className="max-h-[65vh] fixed left-64 right-100 overflow-y-auto p-10 mb-10">
        {todos.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>No tasks found. Create a new task to get started!</p>
          </div>
        ) : (
          <div className="space-y-4 ">
            {todos.map((todo) => (
              <React.Fragment key={todo.id}>
                <div
                  onClick={() =>
                    setSelectedTodoId(
                      selectedTodoId === todo.id ? null : todo.id
                    )
                  }
                  className={`p-4 border rounded-lg shadow-md flex justify-between items-center transition-transform duration-200 hover:scale-101 cursor-pointer ${
                    todo.isCompleted
                      ? "bg-gray-50 border-gray-200"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onClick={(e) => handleToggleComplete(todo, e)}
                      readOnly
                      className="h-5 w-5 rounded text-slate-700 focus:ring-slate-500"
                    />
                    <div className="flex-grow">
                      <h3
                        className={`text-lg font-medium ${
                          todo.isCompleted
                            ? "line-through text-gray-500"
                            : "text-slate-700"
                        }`}
                      >
                        {todo.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Due: {new Date(todo.dueDate).toLocaleDateString()}{" "}
                        {new Date(todo.dueDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(todo); // <-- call the handler from props
                      }}
                      className="p-2 text-blue-700 hover:bg-blue-50 rounded-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => handleDelete(todo.id, e)}
                      className="p-2 text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {selectedTodoId === todo.id && (
                  <div className="mt-3 p-3 bg-slate-50 rounded text-slate-700 border border-slate-200">
                    <span className="font-semibold">Description:</span>
                    <div>
                      {todo.description ? (
                        todo.description
                      ) : (
                        <span className="italic text-gray-400">
                          No description
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
