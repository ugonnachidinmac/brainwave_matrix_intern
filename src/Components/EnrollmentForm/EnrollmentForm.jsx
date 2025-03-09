import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserGraduate } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

// Navbar Component (Fixed at the Top)
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white py-4 shadow-lg z-50">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">WOFBI Enrollment</h1>
      </div>
    </nav>
  );
};

// Validation Schema
const FormSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Full name is too short!")
    .max(50, "Full name is too long!")
    .required("Full name is required"),
  gender: Yup.string()
    .oneOf(["Male", "Female"], "Invalid gender selection")
    .required("Gender is required"),
  address: Yup.string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address is too long")
    .required("Address is required"),
  contact: Yup.string()
    .matches(/^\d{10,15}$/, "Contact must be a valid number (10-15 digits)")
    .required("Contact number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  course: Yup.string()
    .oneOf(["BCC", "LCC", "LDC"], "Invalid course selection")
    .required("Course selection is required"),
});

// Toast notifications
const notifySuccess = () => toast.success("Form submitted successfully!");
const notifyError = () => toast.error("Submission failed! Please try again.");

const EnrollmentForm = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-10 flex justify-center items-center bg-gray-900 min-h-screen">
        <div className="max-w-lg w-full mx-4 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
          {/* Back Arrow */}
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 text-2xl mb-4"
            title="Back to Home Page"
          >
            <IoMdArrowRoundBack />
          </button>

          {/* Form Title and Description */}
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
            <FaUserGraduate className="text-blue-500" />
            WOFBI Enrollment Form
          </h2>
          <p className="text-gray-300 text-sm mb-6">
            Please fill out the form below to enroll in one of our courses.
          </p>

          {/* Formik Form */}
          <Formik
            initialValues={{
              fullName: "",
              gender: "",
              address: "",
              contact: "",
              email: "",
              course: "",
            }}
            validationSchema={FormSchema}
            validateOnChange
            validateOnBlur
            onSubmit={(values, { resetForm, setSubmitting }) => {
              try {
                // Get existing enrollments or initialize an empty array
                const existingEnrollments =
                  JSON.parse(localStorage.getItem("enrollments")) || [];

                // Add new form data to the array
                const updatedEnrollments = [...existingEnrollments, values];

                // Save back to localStorage
                localStorage.setItem(
                  "enrollments",
                  JSON.stringify(updatedEnrollments)
                );

                notifySuccess();
                resetForm();
              } catch (error) {
                notifyError();
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block font-medium">
                    Full Name:
                  </label>
                  <Field
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-400 text-sm"
                  />
                </div>

                {/* Gender Selection */}
                <div>
                  <label className="block font-medium">Gender:</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <Field
                        type="radio"
                        name="gender"
                        value="Male"
                        className="accent-blue-500"
                      />
                      Male
                    </label>
                    <label className="flex items-center gap-2">
                      <Field
                        type="radio"
                        name="gender"
                        value="Female"
                        className="accent-blue-500"
                      />
                      Female
                    </label>
                  </div>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-400 text-sm"
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block font-medium">
                    Address:
                  </label>
                  <Field
                    id="address"
                    name="address"
                    type="text"
                    className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
                    placeholder="Enter your address"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-400 text-sm"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label htmlFor="contact" className="block font-medium">
                    Contact Number:
                  </label>
                  <Field
                    id="contact"
                    name="contact"
                    type="text"
                    className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
                    placeholder="Enter your contact number"
                  />
                  <ErrorMessage
                    name="contact"
                    component="div"
                    className="text-red-400 text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-medium">
                    Email:
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-400 text-sm"
                  />
                </div>

                {/* Course Selection */}
                <div>
                  <label htmlFor="course" className="block font-medium">
                    Select Course:
                  </label>
                  <Field
                    as="select"
                    id="course"
                    name="course"
                    className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
                  >
                    <option value="" disabled>
                      Select a course
                    </option>
                    <option value="BCC">Basic Certificate Course (BCC)</option>
                    <option value="LCC">
                      Leadership Certificate Course (LCC)
                    </option>
                    <option value="LDC">Leadership Diploma Course (LDC)</option>
                  </Field>
                  <ErrorMessage
                    name="course"
                    component="div"
                    className="text-red-400 text-sm"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded transition duration-300 disabled:bg-gray-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Toast Notifications */}
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default EnrollmentForm;
