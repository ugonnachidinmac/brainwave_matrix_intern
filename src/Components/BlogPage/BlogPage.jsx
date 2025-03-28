import React, { useState } from 'react';
import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const categoryEndpoints = {
    All: {
      main: "http://localhost:5000/all",
      detail: "http://localhost:5000/allDetail",
    },
    Food: {
      main: "http://localhost:5000/food",
      detail: "http://localhost:5000/foodDetail",
    },
    Fruit: {
      main: "http://localhost:5000/fruit",
      detail: "http://localhost:5000/fruitDetail",
    },
    News: {
      main: "http://localhost:5000/news",
      detail: "http://localhost:5000/newsDetail",
    },
  };

  const handleCategoryClick = async (category) => {
    setLoading(true);
    const selectedEndpoints = categoryEndpoints[category];

    try {
      const [mainRes, detailRes] = await Promise.all([
        fetch(selectedEndpoints.main),
        fetch(selectedEndpoints.detail),
      ]);

      if (!mainRes.ok || !detailRes.ok) {
        throw new Error(`Failed to fetch data for ${category}`);
      }

      const mainData = await mainRes.json();
      const detailData = await detailRes.json();

      navigate("/title", {
        state: {
          selectedCategory: category,
          blogData: { main: mainData, detail: detailData },
          endpoints: selectedEndpoints,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/title", {
        state: {
          selectedCategory: category,
          blogData: { main: [], detail: [] },
          endpoints: selectedEndpoints,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto px-4 py-6 sm:py-8 md:py-10">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl relative transition-all duration-300 mt-6 sm:mt-8">
          {/* Close Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            aria-label="Close"
          >
            <FaRegWindowClose size={22} />
          </button>

          {/* Title */}
          <div className="mb-6 text-center">
            <h1 className="font-bold mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl transition-all duration-300">
              Blog Dashboard
            </h1>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base">
              Select a category to view and update blog posts (Main + Detail).
            </p>
          </div>

          {/* Category Buttons */}
          <div className="space-y-3">
            {Object.keys(categoryEndpoints).map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat)}
                className="w-full border-2 border-gray-500 px-4 py-2 rounded-xl text-gray-800 font-medium hover:bg-gray-800 hover:text-white transition duration-300 text-sm sm:text-base"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loading Indicator */}
          {loading && (
            <p className="text-center text-gray-500 mt-4 text-sm sm:text-base">
              Loading...
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
