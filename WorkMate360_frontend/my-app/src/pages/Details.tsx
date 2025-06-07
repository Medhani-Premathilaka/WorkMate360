import { Nav } from "@/components/Nav";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import profileimage from "../assets/images/profile.png";
import api from "../api";

interface Profile {
  index: number;
  name: string;
  email: string;
  phoneNumber: string;
  province: string;
  district: string;
  street: string;
  houseNumber: string;
  gender: string;
  ageNow: number;
  dateOfBirth?: string;
  profilePicture: string;
  country: string;
  department: string;
  salary: number;
  position: string;
  imageName: string;
  imageId: string;
  imageUrl: string;
}

export function Details() {
  const [showSidebar, setShowSidebar] = useState(true);
  const { index } = useParams<{ index: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "workmate360");
    data.append("cloud_name", "dg9elczll");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dg9elczll/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const uploadedImage = await res.json();
      return uploadedImage.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Image upload failed");
    }
  };

  const deleteData = async (index: number) => {
    const result = await Swal.fire({
      title: "Are you sure? Do you want to delete this profile?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/profile/delete/${index}`);
        setProfile(null);
        Swal.fire("Deleted Successfully!", "", "success");
        navigate("/home");
      } catch (error) {
        console.error("Error deleting profile: ", error);
        toast.error("Delete failed");
      }
    } else if (result.isDenied) {
      Swal.fire("Cancelled", "", "info");
    }
  };

  const updateData = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!profile) {
      toast.error("Profile data is missing.");
      return;
    }

    try {
      let imageUrl = profile.imageUrl;

      // Upload new image if selected
      if (selectedFile) {
        try {
          imageUrl = await uploadImage(selectedFile);
        } catch (error) {
          toast.error("Failed to upload image");
          return;
        }
      }

      // Prepare the updated profile data
      const updatedProfile = {
        ...profile,
        imageUrl: imageUrl,
      };

      // Send the update request
      await api.put(`/profile/update`, updatedProfile, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Show success message
      const result = await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-1 right-gap",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      });

      if (result.isConfirmed) {
        Swal.fire("Profile Updated Successfully!", "", "success");
        // Update local state with the new image URL
        setProfile(updatedProfile);
        setImagePreview(null);
        setSelectedFile(null);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Check console for details");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `/profile/details/${index}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [index]);

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
              Loading profiles, please wait...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        <div className="shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-2xl p-16">
          <div className="flex flex-col items-center justify-center p-10 text-red-600">
            <svg
              className="h-16 w-16 mb-4"
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

            <span className=" font-semibold mb-2 text-6xl ">
              404 <br />{" "}
            </span>
            <span className=" font-semibold mb-2 text-4xl ">
              NOT FOUND <br />{" "}
            </span>
          </div>

          <span className="text-base">{profile}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen">
      <Nav showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex-1 overflow-hidden bg-gray-100">
        <div className="h-full overflow-y-auto p-4 pt-30">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl ">
            <form className="p-8" onSubmit={updateData}>
              <h2 className="text-center text-xl font-bold p-4">
                {profile.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
                {/* Left Column */}
                <div className="space-y-4">
                  <InputField label="Index" value={profile.index} readOnly />
                  <InputField
                    label="Phone Number"
                    value={profile.phoneNumber}
                    onChange={(val) =>
                      setProfile({ ...profile, phoneNumber: val })
                    }
                  />
                  <InputField
                    label="District"
                    value={profile.district}
                    onChange={(val) =>
                      setProfile({ ...profile, district: val })
                    }
                  />
                  <InputField
                    label="House Number"
                    value={profile.houseNumber}
                    onChange={(val) =>
                      setProfile({ ...profile, houseNumber: val })
                    }
                  />
                  <InputField
                    label="Date Of Birth"
                    type="date"
                    value={profile.dateOfBirth || ""}
                    onChange={(val) => {
                      // Calculate age from the selected date
                      const birthDate = new Date(val);
                      const today = new Date();
                      let age = today.getFullYear() - birthDate.getFullYear();
                      const m = today.getMonth() - birthDate.getMonth();
                      if (
                        m < 0 ||
                        (m === 0 && today.getDate() < birthDate.getDate())
                      ) {
                        age--;
                      }
                      setProfile({ ...profile, dateOfBirth: val, ageNow: age });
                    }}
                  />
                  <InputField
                    label="Age"
                    value={profile.ageNow.toString()}
                    onChange={(val) =>
                      setProfile({ ...profile, ageNow: Number(val) })
                    }
                  />
                  <SelectField
                    label="Department"
                    value={profile.department}
                    options={["Civil", "Mechanical", "Electrical", "IT","Marketing"]}
                    onChange={(val) =>
                      setProfile({ ...profile, department: val })
                    }
                  />
                  <InputField
                    label="Position"
                    value={profile.position}
                    onChange={(val) =>
                      setProfile({ ...profile, position: val })
                    }
                  />
                  <InputField
                    label="Salary"
                    value={profile.salary}
                    onChange={(val) =>
                      setProfile({ ...profile, salary: Number(val) })
                    }
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <InputField
                    label="Email"
                    value={profile.email}
                    onChange={(val) => setProfile({ ...profile, email: val })}
                  />
                  <InputField
                    label="Province"
                    value={profile.province}
                    onChange={(val) =>
                      setProfile({ ...profile, province: val })
                    }
                  />
                  <InputField
                    label="Street"
                    value={profile.street}
                    onChange={(val) => setProfile({ ...profile, street: val })}
                  />
                  <InputField
                    label="Country"
                    value={profile.country}
                    onChange={(val) => setProfile({ ...profile, country: val })}
                  />
                  <SelectField
                    label="Gender"
                    value={profile.gender}
                    options={["Male", "Female"]}
                    onChange={(val) => setProfile({ ...profile, gender: val })}
                  />

                  {/* Image Upload Section */}
                  <div className="mt-4">
                    <input
                      type="file"
                      className="block w-full text-sm text-gray-700
             file:mr-4 file:py-2 file:px-4
             file:rounded-lg file:border-0
             file:text-sm file:font-semibold
             file:bg-slate-200 file:text-slate-700
             hover:file:bg-slate-300
             cursor-pointer"
                      onChange={handleFileChange}
                      accept="image/*"
                    />

                    <div className="mt-4">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="New profile preview"
                          className="w-40 h-40 object-contain border rounded-lg"
                        />
                      ) : (
                        <img
                          src={profile.imageUrl || profileimage}
                          alt="Current profile"
                          className="w-40 h-40 object-contain border rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = profileimage;
                          }}
                        />
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        {imagePreview ? "New Image Preview" : "Current Profile"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="m-4 p-2 w-full h-auto flex justify-start">
                <button
                  type="button"
                  onClick={() => deleteData(profile.index)}
                  className="bg-red-600 hover:bg-slate-400 hover:text-black text-white p-2 w-20 rounded-lg mr-4"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className="bg-yellow-600 hover:bg-slate-400 hover:text-black text-white p-2 w-20 rounded-lg mr-4"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable InputField component
const InputField = ({
  label,
  value,
  onChange,
  readOnly = false,
  type = "text",
}: {
  label: string;
  value: any;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  type?: string;
}) => (
  <div>
    <label className="block mb-2">{label}</label>
    <input
      readOnly={readOnly}
      type={type}
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      className="w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black"
    />
  </div>
);

// Reusable SelectField component
const SelectField = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}) => (
  <div>
    <label className="block mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 p-2 bg-slate-300 rounded-lg focus:outline-black"
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
  </div>
);
