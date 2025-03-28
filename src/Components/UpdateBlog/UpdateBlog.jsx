import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";

const UpdateBlog = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-8 max-w-md w-full text-center relative max-h-screen overflow-y-auto">
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

        <h2 className="text-xl sm:text-2xl font-bold mb-4">Welcome to Blog Update</h2>
        <p className="mb-6 text-gray-600 text-sm sm:text-base">
          Please log in or sign up to create or update your blog post.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              navigate("/login");
              onClose();
            }}
            className="bg-[#70c0ef] text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/signup");
              onClose();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-[#70c0ef] transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
