import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const EditBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCategory, blogData: receivedBlogData } = location.state || {};

  const endpointMap = {
    All: ['all', 'allDetail'],
    Food: ['food', 'foodDetail'],
    Fruit: ['fruit', 'fruitDetail'],
    News: ['news', 'newsDetail'],
  };

  const [mainPath, detailPath] = endpointMap[selectedCategory?.replace(' Detail', '')] || [];
  const selectedId = receivedBlogData?.id;
  const [blogData, setBlogData] = useState(receivedBlogData || null);
  const [loading, setLoading] = useState(!receivedBlogData);
  const [editForm, setEditForm] = useState({
    picture: '',
    title: '',
    titleDescription: '',
    subTitle: '',
    subTitleDescription: '',
    author: '',
    published: '',
  });

  useEffect(() => {
    if (!selectedId || !mainPath || !detailPath) return;

    const fetchData = async () => {
      try {
        const [mainRes, detailRes] = await Promise.all([
          axios.get(`http://localhost:5000/${mainPath}/${selectedId}`),
          axios.get(`http://localhost:5000/${detailPath}/${selectedId}`),
        ]);

        const mergedData = {
          ...mainRes.data,
          ...detailRes.data,
        };

        setBlogData(mergedData);
        setEditForm(mergedData);
      } catch (error) {
        console.error('Failed to fetch blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedId, mainPath, detailPath]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    if (!mainPath || !detailPath || !selectedId) return;
  
    try {
      await Promise.all([
        axios.put(`http://localhost:5000/${mainPath}/${Number(selectedId)}`, editForm),
        axios.put(`http://localhost:5000/${detailPath}/${Number(selectedId)}`, editForm),
      ]);
  
       toast.success("Blog post updated successfully.");
      
            setTimeout(() => {
              navigate(-1);
            }, 2000); // wait 2 second before navigating
    } catch (error) {
      console.error("Edit failed:", error);
      toast.error("Failed to update post. JSON Server might not be running.");
    }
  };
  

  if (loading) return <p>Loading blog data...</p>;

  return (
    <section className="absolute top-0 left-0 w-full min-h-screen bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mt-10 mb-10">
        <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>

        <div className="space-y-3 w-full max-w-md">
          {['picture', 'title', 'subTitle', 'author'].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={editForm[field] || ''}
              onChange={handleEditChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full p-2 border rounded"
            />
          ))}
          {['titleDescription', 'subTitleDescription'].map((field) => (
            <textarea
              key={field}
              name={field}
              value={editForm[field] || ''}
              onChange={handleEditChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full p-2 border rounded"
            />
          ))}
          <input
            type="text"
            name="published"
            value={editForm.published || ''}
            onChange={handleEditChange}
            placeholder="Published Date"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end gap-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSaveEdit}>
              Save
            </button>
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
    </section>
  );
};

export default EditBlog;
