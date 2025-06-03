import React, { useState, useRef } from "react";
import { Nav } from "@/components/Nav";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface EmployeeData {
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
  country: string;
  position: string;
  department: string;
  salary: string;
  imageUrl: string;
}

export function Newdetails() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState<EmployeeData>({
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
    imageUrl: "",
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    setIsUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "workmate360");
      data.append("cloud_name", "dg9elczll");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dg9elczll/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const result = await response.json();
      setFormData((prev) => ({ ...prev, imageUrl: result.secure_url }));
      Swal.fire("Success", "Image uploaded successfully", "success");
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire("Error", "Failed to upload image", "error");
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setIsUploading(false);
    }
  };

  const calculateAge = (dob: string) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 0 ? age.toString() : "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "dateOfBirth") {
      const age = calculateAge(value);
      setFormData((prev) => ({
        ...prev,
        dateOfBirth: value,
        ageNow: age,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phoneNumber) {
      Swal.fire("Error", "Please fill in all required fields", "error");
      return;
    }

    try {
      await axios.post("http://localhost:8080/profile/add", formData);

      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Employee added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset everything
      handleReset();
      navigate("/home");
    } catch (error) {
      console.error("Submission error:", error);
      //let errorMessage = "Failed to add employee";
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          // Handle permission/authorization errors
          Swal.fire({
            title: "Permission Denied",
            text: "You don't have permission to add employees. Please login with an admin account.",
            icon: "error",
            confirmButtonText: "Login Again",
          }).then(() => {
            localStorage.removeItem("jwtToken"); // Clear invalid token
            navigate("/login");
          });
        } else if (error.response?.status === 401) {
          // Handle authentication errors
          Swal.fire({
            title: "Session Expired",
            text: "Please log in again to continue.",
            icon: "warning",
            confirmButtonText: "Login",
          }).then(() => {
            localStorage.removeItem("jwtToken");
            navigate("/login");
          });
        } else {
          // Handle other errors
          const errorMessage =
            error.response?.data?.message || "Failed to add employee";
          Swal.fire("Error", errorMessage, "error");
        }
      } else {
        // Handle non-Axios errors
        Swal.fire("Error", "An unexpected error occurred", "error");
      }
    }
  };

  const handleReset = () => {
    setFormData({
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
      imageUrl: "",
    });
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Nav showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-4 pt-30 bg-gray-100">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden ">
            <form className="p-8" onSubmit={handleSubmit}>
              <h2 className="text-center text-xl font-bold p-8">
                Add New Employee
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2">Name *</label>
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
                    <label className="block mb-2">Phone Number *</label>
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
                    <label className="block mb-2">City *</label>
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
                    <label className="block mb-2">House Number *</label>
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
                    <label className="block mb-2">Date Of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      onChange={handleChange}
                      value={formData.dateOfBirth}
                      max="2003-01-01"
                      className="w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Age *</label>
                    <input
                      type="number"
                      name="ageNow"
                      value={formData.ageNow}
                      className="w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black"
                      readOnly
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Department *</label>
                    <select
                      name="department"
                      className="w-full h-10 p-2 bg-slate-300 rounded-lg focus:outline-black"
                      onChange={handleChange}
                      value={formData.department}
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="Civil">Civil</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Electrical">IT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2">Position *</label>
                    <input
                      type="text"
                      name="position"
                      onChange={handleChange}
                      value={formData.position}
                      className="w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Salary (Annual)($) *</label>
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
                    <label className="block mb-2">Email *</label>
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
                    <label className="block mb-2">State *</label>
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
                    <label className="block mb-2">Street *</label>
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
                    <label className="block mb-2">Country *</label>
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
                    <label className="block mb-2">Gender *</label>
                    <select
                      name="gender"
                      className="w-full h-10 p-2 bg-slate-300 rounded-lg focus:outline-black"
                      onChange={handleChange}
                      value={formData.gender}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2">Profile Picture</label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="block w-full text-sm text-gray-700
             file:mr-4 file:py-2 file:px-4
             file:rounded-lg file:border-0
             file:text-sm file:font-semibold
             file:bg-slate-200 file:text-slate-700
             hover:file:bg-slate-300
             cursor-pointer
             disabled:opacity-50"
                      disabled={isUploading}
                    />
                    {isUploading && (
                      <div className="mt-2 text-sm text-gray-600 animate-pulse">
                        Uploading image...
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    {previewUrl ? (
                      <div>
                        <img
                          src={previewUrl}
                          alt="Profile preview"
                          className="w-40 h-40 object-cover border rounded-lg"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Image Preview
                        </p>
                      </div>
                    ) : (
                      <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-sm text-gray-500">
                          No image selected
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="m-4 p-8 w-full h-auto align-middle flex justify-start">
                <button
                  type="submit"
                  className="bg-lime-700 hover:bg-slate-400 hover:text-black text-white p-2 w-20 rounded-lg mr-4 disabled:opacity-50"
                  disabled={isUploading}
                >
                  {isUploading ? "Adding..." : "Add"}
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
