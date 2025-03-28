import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Title = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCategory } = location.state || { selectedCategory: "Unknown" };

  const endpointMap = {
    All: ["all", "allDetail"],
    Food: ["food", "foodDetail"],
    Fruit: ["fruit", "fruitDetail"],
    News: ["news", "newsDetail"],
  };

  const [mainPath, detailPath] = endpointMap[selectedCategory.replace(" Detail", "")] || [];
  const [blogData, setBlogData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAll, setShowAll] = useState(false); // State to control "More" button

  // Fetch latest blogs from JSON Server when component mounts
  useEffect(() => {
    if (!mainPath || !detailPath) return;

    const fetchBlogs = async () => {
      try {
        const [mainRes, detailRes] = await Promise.all([
          axios.get(`http://localhost:5000/${mainPath}`),
          axios.get(`http://localhost:5000/${detailPath}`),
        ]);
        setBlogData([...mainRes.data, ...detailRes.data]); // Merge main & detail data
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, [mainPath, detailPath]);

  // Recalculate IDs dynamically
  const originalIds = blogData.map((item) => item.id);

  const handleTopicSelect = (id) => setSelectedId(id);
  const selectedTopic = blogData.find((item) => item.id === selectedId);

  const handleCreateClick = () => navigate("/category", { state: { forCreation: true } });

  const handleEditClick = () => {
    if (!selectedTopic) return;
    navigate("/editBlog", { state: { selectedCategory, blogData: selectedTopic } });
  };

  const handleDeleteClick = () => {
    if (!selectedId) return;
    setShowDeleteConfirm(true);
  };
  
  const confirmDelete = async () => {
    if (!mainPath || !detailPath) {
      toast.warning(`No paths defined for category: ${selectedCategory}`);
      return;
    }
  
    const idToDelete = String(selectedId); // 🔐 make sure it's a string
  
    try {
      await Promise.all([
        axios.delete(`http://localhost:5000/${mainPath}/${idToDelete}`),
        axios.delete(`http://localhost:5000/${detailPath}/${idToDelete}`),
      ]);
  
      setBlogData((prevData) => prevData.filter((item) => String(item.id) !== idToDelete));
      setSelectedId(null);
      setShowDeleteConfirm(false);
      toast.success("Blog post deleted successfully.");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete post. JSON Server is not running. Please run 'npm run dev'.");

    }
  };
  

  const isEditable = selectedId && originalIds.includes(selectedId);
  const visibleBlogs = showAll ? blogData : blogData.slice(0, 3); // Show only 3 initially

  return (
    <section className="absolute top-0 left-0 w-full min-h-screen bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mt-10 mb-10">
        <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
          &larr; Back
        </button>
        <h1 className="text-2xl font-bold mb-4">{selectedCategory} Blog</h1>

        {blogData.length > 0 ? (
          <div className="space-y-2">
            {visibleBlogs.map((item) => (
              <div
                key={item.id}
                onClick={() => handleTopicSelect(item.id)}
                className={`p-3 border rounded cursor-pointer ${
                  selectedId === item.id ? "bg-gray-200 border-blue-500" : "border-gray-300"
                }`}
              >
                <h3 className="text-gray-700 font-semibold">{item.title}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No blog posts to display.</p>
        )}

        {/* "More" Button */}
        {blogData.length > 3 && !showAll && (
          <button onClick={() => setShowAll(true)} className="mt-2 text-blue-600 hover:underline">
            More...
          </button>
        )}

        <div className="mt-6 border-t pt-4">
          <h4 className="mb-2 text-gray-700">
            {selectedId ? (
              <>
                Selected: <span className="font-semibold">{selectedTopic?.title}</span>
              </>
            ) : (
              <>No post selected.</>
            )}
          </h4>
          <div className="flex gap-2 flex-wrap">
            <button className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600" onClick={handleCreateClick}>
              Create
            </button>
            <button
              className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
              disabled={!isEditable}
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
              disabled={!isEditable}
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this blog post?</p>
            <div className="flex justify-center gap-2">
              <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600" onClick={confirmDelete}>
                Delete
              </button>
              <button className="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" />
    </section>
  );
};

export default Title;
