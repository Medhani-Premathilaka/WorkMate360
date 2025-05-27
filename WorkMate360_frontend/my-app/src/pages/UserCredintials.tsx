import React, { useState } from 'react'
import './Home.css'
import { Nav } from '@/components/Nav'
import Swal from 'sweetalert2';
import { clear } from 'console';
import axios from 'axios';

interface Login {
  password1:string;
  password2:string;
}


export default function UserCredintials() {
  const [formData, setFormData] = useState<Login>({
      password1 :'',
      password2 :'',
    });

  const handleReset = () => {
    setFormData({
      password1: '',
      password2: ''
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.password1 === formData.password2){
      const res = await axios.post("http://localhost:8080/changepassword",formData);
      Swal.fire({
  title: "Do you want to save the changes?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Save",
  denyButtonText: `Don't save`
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    Swal.fire("Saved!", "", "success");
  } else if (result.isDenied) {
    Swal.fire("Changes are not saved", "", "info");
  }
});
    }else{
      Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Password doesn't match. Re-enter passwords",
  footer: '<a href="#">Why do I have this issue?</a>'
});
  clear();
    }

  }


  return (
    <div >
      <Nav/>
        <div className=" flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <div className="shadow-2xl rounded-2xl bg-white p-10 w-full max-w-md">
    <form className="flex flex-col gap-6" >
      <div className="text-slate-700 text-2xl font-serif font-bold text-center mb-4">
        Change Password
      </div>
      <div>
        <label className="block mb-2 text-gray-700 font-semibold">New Password</label>
        <input
          type="password"
          name = "password1"
          placeholder="Enter New Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>
      <div>
        <label className="block mb-2 text-gray-700 font-semibold">Confirm Password</label>
        <input
          type="password"
          name = "password2"
          placeholder="Confirm New Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>
      <div className="flex justify-between mt-6">
        <button
          type="submit"
          onClick={handleSubmit}
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
    
  )
}
