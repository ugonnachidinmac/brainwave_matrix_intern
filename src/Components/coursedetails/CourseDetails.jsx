import React from "react";
import { useParams } from "react-router-dom";
import coursesData from "../../../data/db.json"; // Import local data
import { Image } from "cloudinary-react";
import { useNavigate } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams(); // Get course ID from 
  const navigate = useNavigate();
  const courseDetail = coursesData.coursedetails.find((c) => c.id === parseInt(id));

  if (!courseDetail) {
    return <h2 className="text-center text-red-500">Course not found!</h2>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Course Title */}
      <h1 className="text-3xl font-bold">{courseDetail.title}</h1>

      {/* Course Card */}
      <div className="border-gray-500 border-[10px] rounded-xl bg-white dark:bg-gray-800 shadow-lg w-[350px] text-center mt-5 p-5">
        <Image
          className="border-gray-500 border-[5px] rounded-md w-full object-cover"
          cloudName="dqtyrjpeh"
          publicId={coursesData.courses.find((c) => c.id === parseInt(id))?.imageUrl}
          loading="lazy"
          alt={courseDetail.title}
        />
        <p className="text-gray-600 dark:text-gray-300 mt-3">{courseDetail.description}</p>
        <p className="text-gray-500 dark:text-gray-400">{courseDetail.duration}</p>
        <h2 className="text-lg font-bold mt-4">{courseDetail.objective}</h2>
        <p className="text-gray-600 dark:text-gray-300">{courseDetail.description2}</p>

        {/* Course Outline */}
        <h2 className="text-lg font-bold mt-4">{courseDetail.course}</h2>
        <ul className="text-gray-600 dark:text-gray-300 text-left mt-2">
          {courseDetail.outline.map((item, index) => (
            <li key={index} className="mb-1">• {item}</li>
          ))}
        </ul>

        {/* Register Button */}
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"  onClick={() => navigate("/enrollmentForm")} >
          {courseDetail.register}
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
