import React, { useState } from "react";
import { Nav } from "@/components/Nav";
import { useFilePicker } from "use-file-picker";
import axios from "axios";

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
}

export function Newdetails() {
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
  });

  const { openFilePicker, filesContent, clear } = useFilePicker({
    accept: ".png",
    readAs: "DataURL",
    multiple: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
        // Prepare the DTO object
        const profileDTO = {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            province: formData.province,
            district: formData.district,
            street: formData.street,
            houseNumber: formData.houseNumber,
            gender: formData.gender,
            ageNow: formData.ageNow ? parseInt(formData.ageNow) : null,
            dateOfBirth: formData.dateOfBirth,
            country: formData.country,
            department: formData.department,
            salary: formData.salary ? parseFloat(formData.salary) : null,
            position: formData.position,
            // Include the Base64 image if available
            profilePictureBase64: filesContent[0]?.content || null
        };

        const response = await fetch("http://localhost:8080/profile/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profileDTO),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("Success:", result);
        alert("Employee added successfully!");

        // Reset form
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
    });
    clear();
  };

  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="flex-1  overflow-hidden">
        <div className="h-full  overflow-y-auto p-10 pt-30 bg-gray-100">
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

                  <div className="space-y-4">
  {/* Image Preview Section */}
  {filesContent.length > 0 ? (
    filesContent.map((file, index) => (
      <div key={index} className="mt-4 relative">
        {/* Image with error fallback */}
        <img
          src={file.content}
          alt={`Uploaded profile ${index + 1}`}
          className="w-40 h-40 object-cover border-2 border-gray-300 rounded-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/default-avatar.png';
            (e.target as HTMLImageElement).className = 
              'w-40 h-40 object-contain border-2 border-gray-300 rounded-lg bg-gray-100';
          }}
        />
        {/* File info */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-gray-600 truncate max-w-[160px]">
            {file.name}
          </p>
          <button
            type="button"
            onClick={() => clear()}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        </div>
      </div>
    ))
  ) : (
    /* Default state when no image is selected */
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
      <svg
        className="w-12 h-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <p className="mt-2 text-sm text-gray-600">No image selected</p>
    </div>
  )}

  {/* Upload Button */}
  <div className="flex space-x-3">
    <button
      type="button"
      onClick={() => openFilePicker()}
      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
    >
      {filesContent.length ? 'Change Image' : 'Upload Profile Picture'}
    </button>
    
    {filesContent.length > 0 && (
      <button
        type="button"
        onClick={() => clear()}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors"
      >
        Remove
      </button>
    )}
  </div>

  {/* Help text */}
  <p className="text-xs text-gray-500">
    Recommended: Square image, JPG/PNG, max 2MB
  </p>
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