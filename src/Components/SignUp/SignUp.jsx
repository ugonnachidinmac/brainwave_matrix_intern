import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = ({ onClose }) => {
  const navigate = useNavigate();

  // State for input fields
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Sign Up submission
  const handleSignUp = async () => {
    if (!author || !email || !password) {
      toast.error("Please fill in all fields.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const newUser = {
      author,
      email,
      password,
    };

    try {
      // POST user data to db.json (JSON Server must be running on port 5000)
      await axios.post("http://localhost:5000/users", newUser);

      toast.success("Sign up successful!", {
        position: "top-center",
        autoClose: 5000,
      });

      // Delay redirect until toast is shown
      setTimeout(() => {
        navigate("/login");
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Failed to sign up. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm relative">
        {/* Close Button */}
        <button
          onClick={() => {
            navigate("/");
            onClose();
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <FaRegWindowClose size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mb-3 w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 w-full p-2 border rounded"
        />

        <button
          onClick={handleSignUp}
          className="bg-[#70c0ef] text-white w-full py-2 rounded hover:bg-[#c0d4de]"
        >
          Sign Up
        </button>

        {/* Toast notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
