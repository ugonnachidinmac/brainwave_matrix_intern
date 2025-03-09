import React from 'react'
import Hero from '../../Components/Hero/Hero'
import CourseSection from '../../Components/CourseSection/CourseSection'
import Register from '../../Components/Register/Register'
import StudentGallery from '../../Components/StudentGallery/StudentGallery'

const Home = () => {
  return (
    <>
  <section>
  <Hero />
  <CourseSection />
  <Register />
  <StudentGallery />
  </section>
    
    </>
  )
}

export default Home