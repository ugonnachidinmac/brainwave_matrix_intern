import React, { useState, useEffect } from 'react';
import news from '../../../data/db.json'; // Import local data
import { useNavigate } from 'react-router-dom';

const NewsBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    setBlogs(news.news); // Access the 'news' key from db.json
  }, []);

  // Pagination Logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <section className="px-2 sm:px-4 md:px-6 py-6 flex flex-col items-center w-full max-w-7xl mx-auto">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => handleCardClick(blog.id)}
            className="p-3 border rounded shadow bg-white hover:shadow-lg transition duration-300 cursor-pointer flex flex-col"
          >
            <div className="relative w-full h-[180px] sm:h-[200px] mb-3">
              <img
                src={blog.picture}
                alt={blog.title}
                className="rounded w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded">
                <p className="text-white text-sm font-semibold text-center px-2">
                  Click for more details
                </p>
              </div>
            </div>
            <h1 className="text-sm sm:text-base font-semibold mb-1 break-words">
              {blog.title}
            </h1>
            <span className="block text-gray-500 text-xs mb-1">{blog.author}</span>
            <span className="text-gray-400 text-xs">
              {blog.published
                ? new Date(blog.published).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap gap-2 justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-blue-100 transition"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
            } transition`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-blue-100 transition"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default NewsBlogs;
