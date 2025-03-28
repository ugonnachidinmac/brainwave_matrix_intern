import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Field mappings
const mainFieldsMap = {
  All: ["picture", "title", "author", "published"],
  Food: ["picture", "title", "author", "published"],
  Fruit: ["picture", "title", "author", "published"],
  News: ["picture", "title", "author", "published"],
};

const detailFieldsMap = {
  All: ["titleDescription", "subTitle", "subTitleDescription"],
  Food: ["titleDescription", "subTitle", "subTitleDescription"],
  Fruit: ["titleDescription", "subTitle", "subTitleDescription"],
  News: ["titleDescription", "subTitle", "subTitleDescription"],
};

const endpointMap = {
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

const CreateBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCategory } = location.state || { selectedCategory: "Unknown" };

  const mainFields = mainFieldsMap[selectedCategory] || [];
  const detailFields = detailFieldsMap[selectedCategory] || [];
  const allFields = [...new Set([...mainFields, ...detailFields])];

  const endpoints = endpointMap[selectedCategory];
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const fakeUrl = URL.createObjectURL(files[0]);
      setFormData((prev) => ({ ...prev, [name]: fakeUrl }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!endpoints) {
      toast.error("Invalid category or endpoint.");
      return;
    }

    try {
      const uniqueId = String(Date.now()); // 🔒 Ensure ID is always a string

      const mainData = { id: uniqueId };
      const detailData = { id: uniqueId };

      mainFields.forEach((field) => {
        mainData[field] = formData[field] || "";
      });

      [...mainFields, ...detailFields].forEach((field) => {
        detailData[field] = formData[field] || "";
      });

      const mainRes = await fetch(endpoints.main, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mainData),
      });
      if (!mainRes.ok) throw new Error("Main endpoint failed");

      const detailRes = await fetch(endpoints.detail, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(detailData),
      });
      if (!detailRes.ok) throw new Error("Detail endpoint failed");

      toast.success("Blog created successfully!");

      setTimeout(() => {
        navigate(-1);
      }, 2000); // wait 2 second before navigating
    } catch (error) {
      console.error("Blog creation error:", error);
      toast.error("Error occurred. Check console.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto px-4 py-8 sm:py-16">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg relative">
          <h1 className="text-xl font-bold mb-4 text-center">
            Create Blog - {selectedCategory}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {allFields.map((field) => (
              <fieldset key={field} className="flex flex-col">
                <label htmlFor={field} className="capitalize text-gray-700 mb-1">
                  {field}
                </label>

                {field === "picture" ? (
                  <input
                    type="file"
                    name={field}
                    id={field}
                    accept="image/*"
                    onChange={handleChange}
                    className="border px-2 py-2 rounded w-full text-gray-700 bg-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                ) : field.toLowerCase().includes("description") ? (
                  <textarea
                    name={field}
                    id={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    rows={4}
                    className="border px-3 py-2 rounded w-full resize-y text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={`Enter ${field}...`}
                  />
                ) : (
                  <input
                    type="text"
                    name={field}
                    id={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                )}
              </fieldset>
            ))}

            <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full sm:w-auto"
              >
                Create Blog
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
        <ToastContainer position="top-center" autoClose={2000} theme="dark" />
    </section>
  );
};

export default CreateBlog;
