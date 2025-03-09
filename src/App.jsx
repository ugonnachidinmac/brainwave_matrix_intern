import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaSpinner } from "react-icons/fa"; // Import spinner icon
import './App.css';

// Lazy load components
const Navbar = lazy(() => import('./Components/Navbar/Navbar'));
const Footer = lazy(() => import('./Components/Footer/Footer'));
const Home = lazy(() => import('./Components/Home/Home'));
const Courses = lazy(() => import('./Components/Courses/Courses'));
const AboutWofbi = lazy(() => import('./Components/AboutWofbi/AboutWofbi'));
const CourseDetails = lazy(() => import('./Components/coursedetails/CourseDetails'));
const EnrollmentForm = lazy(() => import('./Components/EnrollmentForm/EnrollmentForm'));
const ContactUsForm = lazy(() => import('./Components/ContactUsForm/ContactUsForm'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-blue-700 text-2xl">
    <FaSpinner className="animate-spin text-5xl mb-2" />
    <p>Loading...</p>
  </div>
);

const DelayedSuspense = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure loading screen is shown for at least 3 seconds
    const timer = setTimeout(() => setIsLoading(false), 1200);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <LoadingSpinner /> : children;
};

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <DelayedSuspense>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/aboutwofbi" element={<AboutWofbi />} />
            <Route path="/coursedetails/:id" element={<CourseDetails />} />
            <Route path="/enrollmentForm" element={<EnrollmentForm />} />
            <Route path="/contactUsForm" element={<ContactUsForm />} />
          </Routes>
          <Footer />
        </DelayedSuspense>
      </Suspense>
    </Router>
  );
}

export default App;
