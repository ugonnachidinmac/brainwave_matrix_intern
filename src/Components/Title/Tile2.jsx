import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Title = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCategory, blogData: initialBlogData } = location.state || {
    selectedCategory: "Unknown",
    blogData: [],
  };

  const [blogData, setBlogData] = useState(initialBlogData);
  const [selectedId, setSelectedId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    picture: '',
    title: '',
    titleDescription: '',
    subTitle: '',
    subTitleDescription: '',
    author: '',
    published: '',
  });

  const categoryMap = {
    All: "all",
    Detail: "allDetail",
    Food: "food",
    "Food Detail": "foodDetail",
    Fruit: "fruit",
    "Fruit Detail": "fruitDetail",
    News: "news",
    "News Detail": "newsDetail",
  };

  const categoryPath = categoryMap[selectedCategory];

  const handleTopicSelect = (id) => setSelectedId(id);
  const selectedTopic = blogData.find(item => item.id === selectedId);

  const handleCreateClick = () => {
    setSelectedId(null);
    navigate("/category", { state: { forCreation: true } });
  };

  const handleEditClick = () => {
    if (!selectedTopic) return;
    setEditForm({ ...selectedTopic });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    if (!categoryPath) {
      alert(`No path defined for category: ${selectedCategory}`);
      return;
    }

    try {
      await axios.put(`http://localhost:5000/${categoryPath}/${selectedId}`, editForm);
      const updatedData = blogData.map(item =>
        item.id === selectedId ? { ...editForm, id: selectedId } : item
      );
      setBlogData(updatedData);
      setShowEditModal(false);
      alert("Blog post updated successfully.");
    } catch (error) {
      console.error("Edit failed:", error);
      alert("Failed to update post.");
    }
  };

  const handleDeleteClick = () => {
    if (!selectedId) return;
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!categoryPath) {
      alert(`No path defined for category: ${selectedCategory}`);
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/${categoryPath}/${selectedId}`);
      const updatedData = blogData.filter(item => item.id !== selectedId);
      setBlogData(updatedData);
      setSelectedId(null);
      setShowDeleteConfirm(false);
      alert("Blog post deleted successfully.");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete post.");
    }
  };

  return (
    <section className="min-h-screen p-4 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded shadow-md h-full max-h-screen overflow-y-auto">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
          &larr; Back
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">{selectedCategory} Blog</h1>

        {/* Blog List */}
        {blogData.length > 0 ? (
          <div className="space-y-2">
            {blogData.map(item => (
              <div
                key={item.id}
                onClick={() => handleTopicSelect(item.id)}
                className={`p-3 border rounded cursor-pointer transition ${
                  selectedId === item.id ? 'bg-gray-200 border-blue-500' : 'border-gray-300'
                }`}
              >
                <h3 className="text-gray-700 font-semibold">{item.title}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No blog posts to display.</p>
        )}

        {/* Action Buttons */}
        <div className="mt-6 border-t pt-4">
          <h4 className="mb-2 text-gray-700">
            {selectedId ? (
              <>Selected: <span className="font-semibold">{selectedTopic?.title}</span></>
            ) : <>No post selected.</>}
          </h4>
          <div className="flex flex-wrap gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto" onClick={handleCreateClick}>
              Create
            </button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full sm:w-auto" disabled={!selectedId} onClick={handleEditClick}>
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto" disabled={!selectedId} onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-4 sm:p-6 rounded shadow-md w-full max-w-xs text-center">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this blog post?</p>
            <div className="flex justify-center gap-2">
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={confirmDelete}>
                Delete
              </button>
              <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-md max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Blog Post</h2>
            <div className="space-y-3">
              {['picture', 'title', 'subTitle', 'author'].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={editForm[field]}
                  onChange={handleEditChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full p-2 border rounded"
                />
              ))}
              {['titleDescription', 'subTitleDescription'].map((field) => (
                <textarea
                  key={field}
                  name={field}
                  value={editForm[field]}
                  onChange={handleEditChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full p-2 border rounded"
                />
              ))}
              <input
                type="text"
                name="published"
                value={editForm.published}
                onChange={handleEditChange}
                placeholder="Published Date"
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end gap-2">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleSaveEdit}>
                  Save
                </button>
                <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Title;
