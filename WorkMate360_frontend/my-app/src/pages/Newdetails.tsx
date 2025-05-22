import React, { useState } from "react";
import { Nav } from "@/components/Nav";
import { useFilePicker } from "use-file-picker";
import axios from "axios";
import Swal from 'sweetalert2'

interface EmployeeData {
  index: string;
  name: string;
  email: string;
  phoneNumber: string;
  province: string;
  district: string;
  street: string;
  houseNumber: string;
  gender: string;
  ageNow: string;
  dateOfBirth: string;
  profilePicture?: string;
  country: string;
  position: string;
  department: string;
  salary: string;
  imageName: string;
  imageType: string;
  imageData: string;
}

export function Newdetails() {
  //const [result,setResult] = useState('')
  const [formData, setFormData] = useState<EmployeeData>({
    index: "",
    name: "",
    email: "",
    phoneNumber: "",
    province: "",
    district: "",
    street: "",
    houseNumber: "",
    gender: "",
    ageNow: "",
    dateOfBirth: "",
    country: "",
    position: "",
    department: "",
    salary: "",
    imageName: "",
  imageType: "",
  imageData: ""
  });

  const { openFilePicker, filesContent, clear } = useFilePicker({
    accept: ".png",
    readAs: "DataURL",
    multiple: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/profile/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await Swal.fire({
  position: "center",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: true,
  timer: 1500
});
 
  console.log(result);

      setFormData({
        index: "",
        name: "",
        email: "",
        phoneNumber: "",
        province: "",
        district: "",
        street: "",
        houseNumber: "",
        gender: "",
        ageNow: "",
        dateOfBirth: "",
        country: "",
        department: "",
        salary: "",
        position: "",
        imageName:"",
        
  imageType: "",
  imageData: "",
      });
      clear();
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      index: "",
      name: "",
      email: "",
      phoneNumber: "",
      province: "",
      district: "",
      street: "",
      houseNumber: "",
      gender: "",
      ageNow: "",
      dateOfBirth: "",
      country: "",
      position: "",
      department: "",
      salary: "",
      imageName:"",
        
  imageType: "",
  imageData: "",
    });
    clear();
  };

  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="flex-1  overflow-hidden">
        <div className="h-full  overflow-y-auto p-4 pt-30 bg-gray-100">
          <div className="  max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden font-serif">
            <form className="p-8" onSubmit={handleSubmit}>
              <h2 className="text-center text-xl font-bold p-8 ">
                Add New Employee
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2">Name</label>
                    <input
                      name="name"
                      type="text"
                      onChange={handleChange}
                      value={formData.name}
                      className="w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Phone Number</label>
                    <input
                      name="phoneNumber"
                      onChange={handleChange}
                      value={formData.phoneNumber}
                      type="tel"
                      placeholder="ex:123-4567890"
                      className="w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">District</label>
                    <input
                      type="text"
                      name="district"
                      onChange={handleChange}
                      value={formData.district}
                      className="w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">House Number</label>
                    <input
                      type="text"
                      name="houseNumber"
                      onChange={handleChange}
                      value={formData.houseNumber}
                      className="w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Date Of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      onChange={handleChange}
                      value={formData.dateOfBirth}
                      className="w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Age</label>
                    <input
                      type="number"
                      name="ageNow"
                      onChange={handleChange}
                      value={formData.ageNow}
                      min={18}
                      className="w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Department</label>
                    <select
                      name="department"
                      className="w-full h-10 p-2 bg-slate-300 rounded-lg focus:outline-black"
                      onChange={handleChange}
                      value={formData.department}
                    >
                      <option value="">Select Department</option>
                      <option value="civil">Civil</option>
                      <option value="mech">Mechanical</option>
                      <option value="elec">Electrical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2">Position</label>
                    <input
                      type="text"
                      name="position"
                      onChange={handleChange}
                      value={formData.position}
                      min={18}
                      className="w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Salary($)</label>
                    <input
                      type="number"
                      name="salary"
                      onChange={handleChange}
                      value={formData.salary}
                      min={1000}
                      className="w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black"
                      required
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      className="w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Province</label>
                    <input
                      type="text"
                      name="province"
                      onChange={handleChange}
                      value={formData.province}
                      className="w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Street</label>
                    <input
                      type="text"
                      name="street"
                      onChange={handleChange}
                      value={formData.street}
                      className="w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      onChange={handleChange}
                      value={formData.country}
                      className="w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Gender</label>
                    <select
                      name="gender"
                      className="w-full h-10 p-2 bg-slate-300 rounded-lg focus:outline-black"
                      onChange={handleChange}
                      value={formData.gender}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div >
                    <input type="file" className="bg-slate-200" name="imageName" accept="image/*"/>
                    {filesContent.length > 0 ? (
                      <div key={0} className="mt-4">
                        <img
                          src={filesContent[0].content}
                          alt="Uploaded profile"
                          className="w-40 h-40 object-contain border rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/default-avatar.png';
                          }}
                        />
                        <p className="text-sm text-gray-500 mt-1">{filesContent[0].name}</p>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <img
                          src={formData.imageData
                            ? `data:image/png;base64,${formData.imageData}` 
                            : '/default-avatar.png'}
                          alt="Current Profile"
                          className="w-40 h-40 object-contain border rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/default-avatar.png';
                          }}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          {formData.imageData ? "Current Profile" : "No Image Selected"}
                        </p>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => openFilePicker()}
                      className="bg-slate-500 p-2 rounded-lg text-white hover:bg-slate-300 hover:text-slate-700"
                    >
                      {filesContent.length ? 'Change Image' : 'Upload Profile Picture'}
                    </button>
                    {filesContent.length > 0 && (
                      <button
                        type="button"
                        onClick={() => clear()}
                        className="ml-2 bg-slate-500 p-2 rounded-lg text-white hover:bg-slate-300 hover:text-slate-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="m-4 p-8 w-full h-auto align-middle flex justify-start">
                <button
                  type="submit"
                  className="bg-lime-700 hover:bg-slate-400 hover:text-black text-white p-2 w-20 rounded-lg mr-4"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-blue-600 hover:bg-slate-400 hover:text-black text-white p-2 w-20 rounded-lg mr-4"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}