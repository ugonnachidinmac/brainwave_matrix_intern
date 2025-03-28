import React from 'react';
import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate("/createBlog", {
      state: {
        selectedCategory: category,
      },
    });
  };

  const categories = ["All", "Food", "Fruit", "News"];

  return (
    <section className="min-h-screen">
      {/* Scrollable Overlay */}
      <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50 px-4 pt-16 sm:pt-24 overflow-y-auto'>
        {/* Modal Box */}
        <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg relative max-h-screen overflow-y-auto'>
          {/* Close Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            aria-label="Close Modal"
          >
            <FaRegWindowClose size={22} />
          </button>

          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold mb-2 text-center">Create Blog</h1>
            <p className="text-center text-gray-600 mb-4">
              Please select a category below to create a blog post.
            </p>
          </div>

          {/* Category Buttons */}
          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className='w-full border-2 border-gray-500 px-4 py-2 rounded-xl text-sm sm:text-base hover:bg-gray-800 hover:text-white transition'
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
