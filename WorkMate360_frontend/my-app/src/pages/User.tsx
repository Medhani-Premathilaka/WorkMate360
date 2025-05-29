import { Nav } from "@/components/Nav";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Profile {
  index: number;  // Note: capital 'I' to match backend entity
}

interface Todo {
  title: string;
  dueDate: string;
  isCompleted: boolean;
  profile: Profile;
}

export function User() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Todo>({
    title: "",
    dueDate: "",
    isCompleted: false,
    profile: { index: parseInt(localStorage.getItem("index") || "0", 10) }
  });

  const handleReset = () => {
    setFormData({
      title: "",
      dueDate: "",
      isCompleted: false,
      profile: { index: parseInt(localStorage.getItem("index") || "0", 10) }
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleReset();
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/todo/create", formData);
      handleReset();
      handleClose();
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Todo added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      
      // Reset everything
    
      navigate("/user");
    } catch (error) {
      
      console.error("Submission error:", error);
      handleClose();
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to add todo",
        text: "Please try again",
        showConfirmButton: true
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Nav />
      <div className="w-full pb-50 min-h-screen bg-white rounded-xl shadow-lg h-64 overflow-auto flex flex-col">
        <button
          onClick={handleClickOpen}
          className="bg-slate-700 text-white absolute right-10 top-32 font-serif p-3 hover:text-xl rounded-xl"
        >
          + New Todo
        </button>
        <div className="fixed top-45 left-64"></div>
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
            Add New Todo
          </span>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-6 mt-2">
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">Task</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter Task"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-lg"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-lg"
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
            Add
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
    </div>
  );
}