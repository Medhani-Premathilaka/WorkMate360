import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  role: string;
  name: string;
  imageUrl: string;
  username: string;
  Index: string;
  firstLogin: string;

  //imageUrl: string;// Add other fields if your backend returns more data
}

export const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:8080/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extract token and role from response properly
      const token = response.data.token;
      const role = response.data.role;
      localStorage.setItem("firstLogin", response.data.firstLogin ? "true" : "false");
      localStorage.setItem("index", response.data.Index);
      localStorage.setItem("token",token);
      localStorage.setItem("role", response.data.role);
      // Example after login success
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("profileImageUrl", response.data.imageUrl);
      // Add this to your login response handler
localStorage.setItem("username", response.data.username); // Make sure your backend sends this!
      //localStorage.setItem("name",name);

      if (!token) {
        setError("No token received from server");
        return;
      }

      // Store the JWT token with consistent key
      localStorage.setItem("token", token);

      // Set default Authorization header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      console.log("Login successful, token stored");

      // Redirect to dashboard
      if (role === "ADMIN" ) {
        navigate("/home");
      } else if (role === "USER") {
        navigate("/user");
      }
    } catch (err: any) {
      if (err.response) {
        // The request was made and the server responded with a status code
        setError(err.response.data?.message || "Invalid username or password");
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from server. Please try again.");
      } else {
        // Something happened in setting up the request
        setError("An error occurred. Please try again.");
      }
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCredentials({
      username: "",
      password: "",
    });
    setError("");
  };

  return (
    <div className="bg-[url(../assets/images/login.jpg)] min-h-screen w-full bg-cover bg-center">
      <div className="fixed bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-80 h-auto p-8 border-2 border-white/50 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl ">
        <h3 className="text-center text-xl font-bold text-slate-700">
          Welcome
        </h3>
        {error && (
          <div className="mt-2 p-2 bg-red-100 text-red-700 text-sm rounded text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-slate-600 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-2xl text-white ${
              isLoading ? "bg-slate-400" : "bg-slate-700 hover:bg-slate-600"
            } transition-colors`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="mt-3 w-full py-2 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-2xl transition-colors"
            disabled={isLoading}
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};
