import React, { useState } from "react";
import studentData from "../../../data/db.json"; // Import JSON data

const StudentGallery = () => {
  // Default year and course (fallback if not available)
  const defaultYear = studentData.student["2019"] ? "2019" : Object.keys(studentData.student)[0];
  const defaultCourse = studentData.student[defaultYear]?.["BCC"]
    ? "BCC"
    : Object.keys(studentData.student[defaultYear])[0];

  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedCourse, setSelectedCourse] = useState(defaultCourse);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6; // 2 rows × 3 columns = 6 per page

  // Get available years
  const years = Object.keys(studentData.student);

  // Get available courses for the selected year
  const courses = selectedYear ? Object.keys(studentData.student[selectedYear]) : [];

  // Get students for the selected year and course
  const students = studentData.student[selectedYear]?.[selectedCourse] || [];

  // Pagination Logic
  const totalPages = Math.ceil(students.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  // Handle Page Change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="p-6 flex flex-col items-center">
  <div className="relative w-full">
  {/* Thick Upper Border */}
  <hr className="border-t-[4px] border-gray-600 w-full" />
  
  {/* Lighter Lower Border (Positioned Below) */}
  <hr className="border-t-[2px] border-gray-400 w-full absolute top-[6px] left-0" />
</div>

      <h1 className="text-[36px] font-bold mb-4">Student Photos</h1>

      {/* Year & Course Selection */}
      <div className="flex gap-[84px] mb-4">
        <div className="">
          <label className="block font-semibold">Select Year:</label>
          <select
            className="border-2 border-gray-500 w-[650] rounded-[10px] p-2 rounded "
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setSelectedCourse(Object.keys(studentData.student[e.target.value])[0]); // Reset course
              setCurrentPage(1); // Reset page on year change
            }}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Select Course:</label>
          <select
            className="border-2 border-gray-500 w-full rounded-[10px] p-2 rounded "
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setCurrentPage(1); // Reset page on course change
            }}
          >
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Students (2 rows × 3 columns) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {currentStudents.length > 0 ? (
          currentStudents.map((student) => (
            <img
              key={student.id}
              src={student.photo}
              alt="Student"
              className="w-full h-[200px] object-cover rounded shadow-md"
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No students found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-4 space-x-2">
          <button
            className={`px-4 py-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 border rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : ""}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`px-4 py-2 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default StudentGallery;
