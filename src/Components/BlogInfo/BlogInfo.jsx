import React from 'react';
import { NavLink } from 'react-router-dom';

const BlogInfo = () => {
  const navItems = [
    { label: 'All', path: '/blogs' },
    { label: 'Food', path: '/blogs/food' },
    { label: 'Fruit', path: '/blogs/fruit' },
    { label: 'News', path: '/blogs/news' },
  ];

  return (
    <section className="py-4 px-2 sm:px-4 lg:px-8">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === '/blogs'} // Exact match only for "All"
            className={({ isActive }) =>
              `px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base font-medium transition-colors duration-300 
              ${
                isActive
                  ? 'bg-[#b5d3e3] text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-blue-100 focus:bg-blue-100'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default BlogInfo;
