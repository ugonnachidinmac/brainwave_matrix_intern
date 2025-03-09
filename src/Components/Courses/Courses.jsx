import React from "react";

const Courses = () => {
  return (
    <section className="px-4 py-12 md:px-10 lg:px-20 bg-gray-100 text-gray-900 mt-20">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-blue-700 mb-4">Bible Courses</h3>
        <p className="text-gray-700 leading-relaxed">
          Currently, the Institute offers a three-tier course program: 
          <span className="font-semibold"> Basic Certificate Course (BCC), Leadership Certificate Course (LCC),</span>  
          and <span className="font-semibold">Leadership Diploma Course (LDC).</span>  
          Each program covers topics such as The Word, Ministry, Family, Faith, Success, Prayer, and Prosperity.  
          The course spans two weeks, with daily six-hour lectures from 8:00 AM to 3:00 PM, including a 30-minute break.
        </p>
      </div>

      {/* Course Sections */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* BCC Course */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-2xl font-semibold text-blue-600 mb-2">
            BASIC CERTIFICATE COURSE (BCC)
          </h4>
          <p className="text-gray-700 leading-relaxed">
            This is the WOFBI foundation course. It is for those who have never 
            attended any WOFBI program. Courses include: Word Foundation, New Creation 
            Fundamentals, Character Development, Principles of Answered Prayer, Faith, 
            Success, Financial Prosperity, Ministry, Family Life, Divine Health, and The Holy Spirit.
          </p>
        </div>

        {/* LCC Course */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-2xl font-semibold text-blue-600 mb-2">
            LEADERSHIP CERTIFICATE COURSE (LCC)
          </h4>
          <p className="text-gray-700 leading-relaxed">
            This course is for those who have completed the BCC. It focuses on leadership 
            development and motivation. Topics include: Biblical Business Strategy, 
            Excellence in Ministry, Church Growth, Anointing, Supernatural Supplies, 
            Marriage Covenant, Faith Complex, and Success Concepts.
          </p>
        </div>

        {/* LDC Course */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-2xl font-semibold text-blue-600 mb-2">
            LEADERSHIP DIPLOMA COURSE (LDC)
          </h4>
          <p className="text-gray-700 leading-relaxed">
            This advanced training program is for those who have completed the LCC. 
            Topics include: Biblical Management, Exploits in Ministry, Word Dynamics, 
            Integrity, Growing in Power, Financing the Ministry, Supernatural Wisdom, 
            and Signs & Wonders Today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Courses;
