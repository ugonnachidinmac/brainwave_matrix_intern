import React, { useState, useEffect } from 'react';
import all from '../../../data/db.json'; // Import local data
import { useNavigate } from 'react-router-dom';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    setBlogs(all.all);
  }, []);

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
    navigate(`/all/${id}`);
  };

  return (
    <section className="p-4 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="relative p-3 border rounded shadow bg-white hover:shadow-lg transition duration-300 w-full cursor-pointer overflow-hidden"
            onClick={() => handleCardClick(blog.id)}
          >
            <div className="relative">
              <img
                src={blog.picture}
                alt={blog.title}
                className="rounded w-full h-[180px] sm:h-[160px] md:h-[150px] object-cover mb-2"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded">
                <p className="text-white text-sm font-semibold text-center px-2">
                  Click for more details
                </p>
              </div>
            </div>

            <h1 className="text-sm font-semibold">{blog.title}</h1>
            <span className="block text-gray-500 text-xs">{blog.author}</span>
            <span className="text-xs text-gray-400">
              {blog.published
                ? new Date(blog.published).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default AllBlogs;
