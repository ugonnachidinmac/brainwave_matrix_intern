import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import registerSlidePhotos from "../../../data/db.json"; // Import local data

const Sliding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("translate-x-0 opacity-100");
  const photos = registerSlidePhotos.registerslidephoto; // Extract photos array

  // Function to move to the next slide (Right to Left Effect)
  const nextSlide = () => {
    setSlideDirection("-translate-x-full opacity-0");
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
      setSlideDirection("translate-x-0 opacity-100");
    }, 300);
  };

  // Function to move to the previous slide (Left to Right Effect)
  const prevSlide = () => {
    setSlideDirection("translate-x-full opacity-0");
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? photos.length - 1 : prevIndex - 1
      );
      setSlideDirection("translate-x-0 opacity-100");
    }, 300);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex]);

  return (
    <section className="flex flex-col items-center mt-10 w-full overflow-hidden">
      <h1 className="text-3xl font-bold mb-5 text-center">PHOTOS</h1>

      {/* Image Slider (Fixed Size) */}
      <div className="relative w-full lg:w-[400px] lg:h-[200px] border-gray-500 border-[5px] rounded-md overflow-hidden bg-slate-500 flex items-center justify-center mx-[20px]">
        <div
          className={`relative w-full h-full transition-transform transform ${slideDirection} duration-500 ease-in-out`}
        >
          <Image
            className="w-full lg:w-[400px] lg:h-[200px] object-cover rounded-md"
            cloudName="dqtyrjpeh"
            publicId={photos[currentIndex].photo}
            loading="lazy"
            alt={`Slide ${currentIndex + 1}`}
          />
        </div>
      </div>

      {/* Navigation Buttons (Under the Image) */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={prevSlide}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          ◀ Previous
        </button>
        <button
          onClick={nextSlide}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Next ▶
        </button>
      </div>
    </section>
  );
};

export default Sliding;
