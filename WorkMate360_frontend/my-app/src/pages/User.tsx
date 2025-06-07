import { Nav } from "@/components/Nav";
import { TodoCard } from "@/components/TodoCard";
import {
  
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "react-calendar/dist/Calendar.css";
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import { Tooltip } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import api from "../api"


interface Profile {
  index: number; // Note: capital 'I' to match backend entity
}

interface Todo {
  id?: number;
  title: string;
  dueDate: string;
  isCompleted: boolean;
  profile: Profile;
  description?: string;
}

export function User() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [, setLoading] = useState(true);
    const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
if (!token) {
  navigate("/login-error");
}
  }, [navigate]);

    const HighlightedDay = styled(PickersDay)(({  }) => ({
  backgroundColor: '#cbd5e1', // slate-300
  color: '#0f172a',           // slate-900
  borderRadius: '50%',
  fontWeight: 'bold',
  width: 36,
  height: 36,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
  
  useEffect(() => {
    const fetchAllTodos = async () => {
      try {
        const index = localStorage.getItem("index");
        if (!index) {
          setError("Profile ID not found. Please login again.");
          setLoading(false);
          return;
        }
        const res = await api.get(
          `/todo/getByProfileId/${index}`
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

  const [formData, setFormData] = useState<Todo>({
    title: "",
    dueDate: "",
    isCompleted: false,
    description: "",
    profile: { index: parseInt(localStorage.getItem("index") || "0", 10) },
  });
  // Highlight tiles with due dates and show tooltip
  
  const handleEditTodo = (todo: Todo) => {
    setFormData({
      id: todo.id,
      title: todo.title,
      dueDate: todo.dueDate,
      isCompleted: typeof todo.isCompleted === "boolean" ? todo.isCompleted : false,
      description: todo.description,
      profile: {
        index:
          todo.profile?.index ??
          parseInt(localStorage.getItem("index") || "0", 10),
      },
    });
    setEditMode(true);
    setOpen(true);
  };

  const handleReset = () => {
    setFormData({
      title: "",
      dueDate: "",
      isCompleted: false,
      description: "",
      profile: { index: parseInt(localStorage.getItem("index") || "0", 10) },
    });
  };

  const handleClickOpen = () => {
    setFormData({
      title: "",
      dueDate: "",
      isCompleted: false,
      description: "",
      profile: { index: parseInt(localStorage.getItem("index") || "0", 10) },
    });
    setEditMode(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleReset();
  };

  const handleSubmit = async () => {
    try {
      if (formData.title.trim() === "" || formData.dueDate.trim() === "") {
        handleClose();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "All Fields are required",
          footer: '<a href="#">Enter Valid Information.</a>',
        });
        return;
      }
    //   const payload = {
    //   ...formData,
    //   isCompleted: typeof formData.isCompleted === "boolean" ? formData.isCompleted : false,
    // };
    let dueDate = formData.dueDate;
    if (dueDate && dueDate.length === 16) {
    dueDate = dueDate + ":00";
  }
    const payload = {
    ...formData,
    dueDate,
    profile: { index: parseInt(localStorage.getItem("index") || "0", 10) },
    isCompleted: typeof formData.isCompleted === "boolean" ? formData.isCompleted : false,
  };
      console.log("Submitting formData:", payload);

      if (editMode) {
      if (!formData.id) {
        Swal.fire({
          icon: "error",
          title: "Missing Todo ID",
          text: "Cannot update todo without an ID.",
        });
        return;
      }
      console.log(`Sending PUT request to: http://localhost:8080/todo/update/${formData.id}`);
      console.log("With payload:", JSON.stringify(payload));
      
      await api.put(
        `/todo/update/${formData.id}`,
        payload,
  {
    // headers: {
    //   // Replace 'token' with your actual localStorage key
    //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   "Content-Type": "application/json",
    // },
  }
        
      );
      handleClose();
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Todo updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    }else {
      await api.post("/todo/create", formData);
      handleClose();
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Todo added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    
    handleReset();
    
    navigate("/user");
  } catch (error) {
    console.error("Submission error:", error);
    handleClose();
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Failed to add/update todo",
      text: "Please try again",
      showConfirmButton: true,
    });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Nav showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="w-full pb-50 min-h-screen bg-white rounded-xl shadow-lg h-64 overflow-auto flex flex-col">
        <button
          onClick={handleClickOpen}
          className="bg-[#2f3e46] text-white fixed right-10 top-32  p-3  hover:bg-[#c0c5c8] hover:text-black rounded-xl"
        >
          + New Todo
        </button>
        <div className="fixed top-45 left-64"></div>
      </div>
      <div className=" fixed top-50 right-10 flex justify-center my-8 shadow-2xl rounded-2xl">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
  <DateCalendar
    sx={{ mx: "auto", my: 4 }}
    slots={{
      day: (props) => {
        const { day } = props;
        const calendarDate = day.toLocaleDateString("en-CA"); // "YYYY-MM-DD"
        const todosForDate = todos.filter(
          (todo) =>
            todo.dueDate &&
            todo.dueDate.split("T")[0] === calendarDate
        );
        if (todosForDate.length > 0) {
          return (
            <Tooltip
              key={calendarDate}
              title={todosForDate.map((todo) => ` ${todo.title} at "${todo.dueDate}"`).join('\n')}
              arrow
              placement="top"
            >
              <span>
                <HighlightedDay {...props} />
              </span>
            </Tooltip>
          );
        }
        return <PickersDay {...props} />;
      }
    }}
  />
</LocalizationProvider>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-todo-dialog"
        fullWidth
        maxWidth="md"
        PaperProps={{
          className: "rounded-2xl p-4",
          style: { minWidth: 300, maxWidth: 500 },
        }}
      >
        <DialogTitle id="add-todo-dialog">
          <span className="font-serif text-slate-700 font-bold w-full flex justify-center text-2xl">
            {editMode ? "Update Todo" : "Add New Todo"}
          </span>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-6 mt-2">
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Task
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter Task"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-lg"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
              Due Date
              </label>
              <input
              type="datetime-local"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-lg"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Enter Description"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-lg resize-y"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-between px-8 pb-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-700 hover:bg-slate-300 text-white hover:text-black p-2 rounded-lg shadow-lg text-lg font-bold transition"
          >
            {editMode ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-blue-700 hover:bg-slate-300 text-white hover:text-black p-2 rounded-lg shadow-lg text-lg font-bold transition"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="bg-red-700 hover:bg-slate-300 text-white hover:text-black p-2 rounded-lg shadow-lg text-lg font-bold transition"
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
      <div className="fixed top-30 left-64">
        <TodoCard onEdit={handleEditTodo} />
      </div>
    </div>
  );
}
