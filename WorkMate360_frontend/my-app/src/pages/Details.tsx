import { Nav } from "@/components/Nav";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import profileimage from "../assets/images/profile.png";

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
  imageType: string;
  imageData: string;
}

export function Details() {
  const { index } = useParams<{ index: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { openFilePicker, filesContent, clear } = useFilePicker({
    accept: [".png", ".jpg", ".jpeg"],
    readAs: "DataURL",
    multiple: false,
  });

  const deleteData = async (index: number) => {
    try {
      await axios.delete(`http://localhost:8080/profile/admin/delete/${index}`);
      //toast.success("Deleted successfully");
      setProfile(null);
      clear();
      const deleteAlert = await Swal.fire({
        title: "Are you sure ? Do you want to delete this profile",
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
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted Successfully!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Cancelled", "", "info");
        }
      });
      console.log(deleteAlert);
      navigate("/home");
    } catch (error) {
      console.error("Error deleting profile: ", error);
      toast.error("Delete failed");
    }
  };

  const updateData = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!profile) {
      toast.error("Profile data is missing.");
      return;
    }

    try {
      // FIX 1: Proper Base64 handling
      const base64Data = filesContent[0]?.content.includes(",")
        ? filesContent[0].content.split(",")[1]
        : filesContent[0]?.content;

      const dataToSend = {
        ...profile,
        profilePicture: base64Data || profile.profilePicture,
      };

      // FIX 2: Added headers
      await axios.put(`http://localhost:8080/profile/update`, dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const alert = await Swal.fire({
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
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Profile Updated Successfully!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Check console for details");
    }
  };
  console.log(alert);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/profile/details/${index}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    return () => clear();
  }, [index]);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="flex-1 overflow-hidden bg-gray-100">
        <div className="h-full overflow-y-auto p-4 pt-30">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl font-serif">
            <form className="p-8" onSubmit={updateData}>
              <h2 className="text-center text-xl font-bold p-8">
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
                    onChange={(val) =>
                      setProfile({ ...profile, dateOfBirth: val })
                    }
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
                    options={["Civil", "Mechanical", "Electrical"]}
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
                  <div>
                    {filesContent.length > 0 ? (
                      <div key={0} className="mt-4">
                        <img
                          src={filesContent[0].content}
                          alt="Uploaded profile"
                          className="w-40 h-40 object-contain border rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/default-avatar.png";
                          }}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          {filesContent[0].name}
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <img
                          src={
                            profile.profilePicture
                              ? `data:image/png;base64,${profile.profilePicture}`
                              : "/default-avatar.png"
                          }
                          className="w-40 h-40 object-contain border rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = profileimage;
                          }}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          {profile.profilePicture
                            ? "Current Profile"
                            : "No Image Selected"}
                        </p>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => openFilePicker()}
                      className="bg-slate-500 p-2 rounded-lg text-white hover:bg-slate-300 hover:text-slate-700"
                    >
                      {filesContent.length
                        ? "Change Image"
                        : "Upload Profile Picture"}
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

// Reusable InputField
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

// Reusable SelectField
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
