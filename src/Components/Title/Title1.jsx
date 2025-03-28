import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Title = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCategory, blogData } = location.state || {
    selectedCategory: "Unknown",
    blogData: [],
  };

  const [selectedId, setSelectedId] = useState(null);

  const handleTopicSelect = (id) => setSelectedId(id);

  const selectedTopic = blogData.find(item => item.id === selectedId);

  const handleCreateClick = () => {
    setSelectedId(null);
    navigate("/createBlog", { state: { selectedCategory } });
  };

  return (
    <section className="p-4">
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <div className='bg-white p-6 rounded shadow-md w-full max-w-sm h-[90vh] overflow-y-auto'>
          <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
            &larr; Back
          </button>

          <h1 className="text-xl font-bold mb-2">{selectedCategory} Blog</h1>

          {blogData.length > 0 ? (
            blogData.map(item => (
              <div
                key={item.id}
                onClick={() => handleTopicSelect(item.id)}
                className={`mb-2 p-2 border rounded cursor-pointer ${
                  selectedId === item.id ? 'bg-gray-200 border-blue-500' : 'border-gray-300'
                }`}
              >
                <h3 className="text-gray-700 font-semibold">{item.title}</h3>
              </div>
            ))
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
            <div className="space-x-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={handleCreateClick}
              >
                Create
              </button>
              <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                Edit
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Title;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Authenticate from '../Authenticate/Authenticate' // Make sure the path is correct

const Title = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCategory, blogData } = location.state || {
    selectedCategory: "Unknown",
    blogData: [],
  };

  const [selectedId, setSelectedId] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState(null); // 'edit' or 'delete'

  const handleTopicSelect = (id) => setSelectedId(id);
  const selectedTopic = blogData.find(item => item.id === selectedId);

  const handleCreateClick = () => {
    setSelectedId(null);
    navigate("/category", { state: { forCreation: true } });
  };

  const handleAuthTrigger = (actionType) => {
    if (!selectedId) return;
    setAuthAction(actionType); // 'edit' or 'delete'
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    if (authAction === 'edit') {
      navigate("/blogPage", { state: { blogId: selectedId, mode: 'edit' } });
    } else if (authAction === 'delete') {
      // Example: Perform delete logic here (or navigate to confirmation page)
      // navigate("/deleteConfirm", { state: { blogId: selectedId } });
      alert(`Delete action confirmed for blog ID: ${selectedId}`);
    }
    setShowAuthModal(false);
  };

  return (
    <section className="p-4">
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <div className='bg-white p-6 rounded shadow-md w-full max-w-sm h-[90vh] overflow-y-auto'>
          <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
            &larr; Back
          </button>

          <h1 className="text-xl font-bold mb-2">{selectedCategory} Blog</h1>

          {blogData.length > 0 ? (
            blogData.map(item => (
              <div
                key={item.id}
                onClick={() => handleTopicSelect(item.id)}
                className={`mb-2 p-2 border rounded cursor-pointer ${
                  selectedId === item.id ? 'bg-gray-200 border-blue-500' : 'border-gray-300'
                }`}
              >
                <h3 className="text-gray-700 font-semibold">{item.title}</h3>
              </div>
            ))
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
            <div className="space-x-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={handleCreateClick}
              >
                Create
              </button>
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                disabled={!selectedId}
                onClick={() => handleAuthTrigger('edit')}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                disabled={!selectedId}
                onClick={() => handleAuthTrigger('delete')}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAuthModal && (
        <Authenticate
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </section>
  );
};

export default Title;

