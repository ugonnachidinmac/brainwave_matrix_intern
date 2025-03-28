import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onClose }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;

      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 2000,
        });

        // Redirect to BlogPage after toast
        setTimeout(() => {
          navigate("/blogPage");
          onClose();
        }, 2000);
      } else {
        toast.error("Invalid email or password", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Try again.", {
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

        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

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
          onClick={handleLogin}
          className="bg-[#70c0ef] text-white w-full py-2 rounded hover:bg-[#c0d4de]"
        >
          Log In
        </button>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
