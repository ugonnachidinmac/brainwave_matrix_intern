import React, { useState, useEffect } from 'react';

const BlogInfo = () => {
  const [allBlogs, setAllBlogs] = useState({});
  const [displayBlogs, setDisplayBlogs] = useState([]);
  const [category, setCategory] = useState('all'); // Matches JSON keys
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;

  useEffect(() => {
    fetch('/db.json') // Adjust path if needed
      .then(res => res.json())
      .then(data => {
        setAllBlogs(data); // Don't slice here
      });
  }, []);

  useEffect(() => {
    if (allBlogs[category]) {
      const startIndex = (currentPage - 1) * blogsPerPage;
      const endIndex = startIndex + blogsPerPage;
      setDisplayBlogs(allBlogs[category].slice(startIndex, endIndex));
    }
  }, [category, currentPage, allBlogs]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1); // Reset to page 1 on category change
  };

  const totalPages = allBlogs[category]
    ? Math.ceil(allBlogs[category].length / blogsPerPage)
    : 1;

  return (
    <div>
      <div className="category-buttons">
        {['all', 'food', 'fruit', 'news'].map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            style={{ fontWeight: category === cat ? 'bold' : 'normal' }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="blog-grid">
        {displayBlogs.map(blog => (
          <div key={blog.id} className="blog-card">
            <img src={blog.picture} alt={blog.title} />
            <h3>{blog.title}</h3>
            <p>By {blog.author}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setCurrentPage(idx + 1)}
            style={{ fontWeight: currentPage === idx + 1 ? 'bold' : 'normal' }}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogInfo;
