import React, { useState } from "react";
import "./Home.css";
import { Nav } from "@/components/Nav";
import Swal from "sweetalert2";
import axios from "axios";

interface Login {
  password1: string;
  password2: string;
  username?: string;
}

export default function UserCredintials() {
  const [formData, setFormData] = useState<Login>({
    password1: "",
    password2: "",
  });

  const handleReset = () => {
    setFormData({
      password1: "",
      password2: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{6,}$/;
    if (passwordRegex.test(formData.password1)) {
      if (formData.password1 === formData.password2) {
        const username = localStorage.getItem("username");
        inlocalStorage.getItem("jwtToken");

        await axios.post("http://localhost:8080/changepassword", {
          username: username, // You need to send username
          password: formData.password1, // And the new password
        });
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
            handleReset();
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password doesn't match. Re-enter passwords",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        handleReset();
      }
    }else{
      Swal.fire({
  icon: "error",
  title: "Oops...",
  html: `
    <p style="font-size: 14px; color: #555;">
      <strong style="color: #e53e3e;">Password requirements:</strong><br />
      Must be at least <span style="font-weight: 600;">6 characters</span> long and include at least
      <span style="font-weight: 600;"> one uppercase letter</span> and
      <span style="font-weight: 600;"> one special character</span>
      (e.g., <code style="background-color: #f7fafc; padding: 2px 4px; border-radius: 4px;">!@#$%^&*</code>).
    </p>
  `,
  footer: '<a href="#">Please try again</a>'
});


    }
  };

  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="shadow-2xl rounded-2xl bg-white p-10 w-full max-w-md">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="text-slate-700 text-2xl font-serif font-bold text-center mb-4">
              Change Password
            </div>
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">
                New Password
              </label>
              <input
                type="password"
                name="password1"
                value={formData.password1}
                onChange={handleChange}
                placeholder="Enter New Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                placeholder="Confirm New Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-900 transition"
              >
                Submit
              </button>
              <button
                type="reset"
                onClick={handleReset}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
