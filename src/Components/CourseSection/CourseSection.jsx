import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import coursesData from "../../../data/db.json"; // Import local JSON file

const CourseSection = () => {
  const [courses] = useState(coursesData.courses); // Load courses from JSON

  return (
    <section className="w-full mt-10 mb-12 flex flex-col items-center">
      {/* Section Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Course Section</h1>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-lg mx-auto">
        {courses.map((course) => (
          <Link key={course.id} to={`/coursedetails/${course.id}`}>
            <div className="border-gray-500 border-[10px] rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer w-[300px]">
              {/* Image */}
              <div className="p-3 relative">
                <Image
                  className="border-gray-500 border-[5px] rounded-md w-full lg:w-[350px] lg:h-[150px] object-cover"
                  cloudName="dqtyrjpeh"
                  publicId={course.imageUrl}
                  loading="lazy"
                  alt={course.title}
                />
                {/* <button className="absolute top-[10px] left-[10px] bg-blue-600 px-3 py-1 text-white text-xs rounded-md">
                  {course.title}
                </button> */}
              </div>

              {/* Course Details */}
              <div className="px-4  text-center">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{course.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{course.description}</p>
                <p className="text-gray-500 dark:text-gray-400">{course.duration}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CourseSection;
