import React, { useState } from 'react';
import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const endpoints = {
    All: "http://localhost:5000/all",
    Detail: "http://localhost:5000/allDetail",
    Food: "http://localhost:5000/food",
    "Food Detail": "http://localhost:5000/foodDetail",
    Fruit: "http://localhost:5000/fruit",
    "Fruit Detail": "http://localhost:5000/fruitDetail",
    News: "http://localhost:5000/news",
    "News Detail": "http://localhost:5000/newsDetail",
  };

  const handleCategoryClick = async (category) => {
    setLoading(true);
    const url = endpoints[category];

    if (!url) {
      console.error(`No endpoint found for category: ${category}`);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
      const data = await response.json();

      navigate("/title", {
        state: {
          selectedCategory: category,
          blogData: data,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/title", {
        state: {
          selectedCategory: category,
          blogData: [],
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen">
      <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto px-4 py-8 sm:py-16'>
        <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg relative'>
          {/* Close Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            <FaRegWindowClose size={20} />
          </button>

          {/* Title */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2 text-center">Blog Dashboard</h1>
            <p className="text-center text-gray-700 mb-4 text-sm sm:text-base">
              Please select a category below to update or view your blog posts.
            </p>
          </div>

          {/* Category Buttons */}
          <div className="space-y-3 mb-4">
            {[["All", "Detail"], ["Food", "Food Detail"], ["Fruit", "Fruit Detail"], ["News", "News Detail"]].map(([cat1, cat2], idx) => (
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2" key={idx}>
                {[cat1, cat2].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className='border-2 border-gray-500 px-4 py-2 rounded-xl hover:bg-gray-800 hover:text-white w-full sm:w-[48%] transition duration-300'
                  >
                    {cat}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Loading Indicator */}
          {loading && <p className="text-center text-gray-500">Loading...</p>}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
