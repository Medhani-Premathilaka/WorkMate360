
import { useNavigate } from "react-router-dom";

export  function LoginError() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col rounded-2xl items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Login Error</h1>
        <p className="text-gray-700 mb-6">
          Oops! There was a problem logging you in.<br />
          Please check your credentials and try again.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#2f3e46] text-white px-6 py-2 rounded-lg hover:bg-[#f58686] hover:font-bold transition"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}