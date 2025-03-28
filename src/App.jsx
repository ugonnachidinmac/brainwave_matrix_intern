import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FaSpinner } from "react-icons/fa";
import './App.css';

// Lazy loaded components
const NavBar = lazy(() => import('./Components/NavBar/NavBar'));
const Footer = lazy(() => import('./Components/Footer/Footer'));
const Home = lazy(() => import('./Components/Home/Home'));
const AllBlogs = lazy(() => import('./Components/AllBlogs/AllBlogs'));
const FoodBlogs = lazy(() => import('./Components/FoodBlogs/FoodBlogs'));
const FruitBlogs = lazy(() => import('./Components/FruitBlogs/FruitBlogs'));
const NewsBlogs = lazy(() => import('./Components/NewsBlogs/NewsBlogs'));
const FoodDetails = lazy(() => import('./Components/FoodDetails/FoodDetails'));
const AllDetail = lazy(() => import('./Components/AllDetail/AllDetail'));
const FruitDetail = lazy(() => import('./Components/FruitDetail/FruitDetail'));
const AboutUs = lazy(() => import('./Components/AboutUs/AboutUs'));
const TermsAndConditions = lazy(() => import('./Components/TermsAndConditions/TermsAndConditions'));
const NewsDetail = lazy(() => import('./Components/NewsDetail/NewsDetail'));
const UpdateBlog = lazy(() => import('./Components/UpdateBlog/UpdateBlog'));
const Login = lazy(() => import('./Components/Login/Login'));
const SignUp = lazy(() => import('./Components/SignUp/SignUp'));
const BlogPage = lazy(() => import('./Components/BlogPage/BlogPage'));
const Title = lazy(() => import('./Components/Title/Title'));
const EditBlog = lazy(() => import('./Components/EditBlog/EditBlog'));
const CreateBlog = lazy(() => import('./Components/CreateBlog/CreateBlog'));
const Category = lazy(() => import('./Components/Category/Category'));

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-blue-700 text-2xl">
    <FaSpinner className="animate-spin text-5xl mb-2" />
    <p>Loading...</p>
  </div>
);

const DelayedSuspense = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  return isLoading ? <LoadingSpinner /> : children;
};

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DelayedSuspense>
        <NavBar />
        <Home />
        
        <Routes>
          {/* Route for Home */}
          {/* <Route path="/home" element={<Home />} /> */}
          
          {/* Redirect root to blogs or home */}
          <Route path="/" element={<Navigate to="/blogs" replace />} />
          
          {/* Blog Routes */}
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blogs/food" element={<FoodBlogs />} />
          <Route path="/blogs/fruit" element={<FruitBlogs />} />
          <Route path="/blogs/news" element={<NewsBlogs />} />

          {/* Detail Pages */}
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/all/:id" element={<AllDetail />} />
          <Route path="/fruit/:id" element={<FruitDetail />} />
          <Route path="/news/:id" element={<NewsDetail />} />

          {/* Other Pages */}
          <Route path="/updateblog" element={<UpdateBlog />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/termsAndConditions" element={<TermsAndConditions />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/category" element={<Category />} />
          <Route path="/title" element={<Title />} />
          <Route path="/editBlog" element={<EditBlog />} />
          <Route path="/blogPage" element={<BlogPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </DelayedSuspense>
    </Suspense>
  );
}

export default App;
