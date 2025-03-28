import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Authenticate = ({ onClose, onSuccess, selectedTopic }) => {
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!author || !password) {
      toast.error("Please enter both author and password", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;

      const matchedUser = users.find(
        (user) => user.author === author && user.password === password
      );

      if (!matchedUser) {
        toast.error("Invalid author or password", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }

      // Check if logged-in author matches selected blog post's author
      if (matchedUser.author !== selectedTopic.author) {
        toast.error("You are not the author of this post", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }

      toast.success("Authenticated successfully!", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        onSuccess();  // Proceed to edit/delete
      }, 2000);

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
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <FaRegWindowClose size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Author Login</h2>

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
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
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Proceed
        </button>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Authenticate;
