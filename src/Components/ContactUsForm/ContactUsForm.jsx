import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdContactMail } from "react-icons/md"; // Import the icon

// Validation Schema
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short!")
    .max(50, "Name is too long!")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message is too long")
    .required("Message is required"),
});

// Toast Notifications
const notifySuccess = () => toast.success("Message sent successfully!");
const notifyError = () => toast.error("Message sending failed!");

const ContactUsForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen pb-[35px] bg-gray-900 px-4 md:px-0 pt-24 md:pt-32">
      <div className="w-full max-w-lg bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-center mb-4">
    <MdContactMail className="text-4xl text-blue-400" /> {/* Contact Icon */}
  </div>
        <h2 className="text-2xl font-semibold text-center mb-4">Get in Touch</h2>

        <Formik
          initialValues={{ name: "", email: "", message: "" }}
          validationSchema={ContactSchema}
          validateOnChange
          validateOnBlur
          onSubmit={(values, { resetForm, setSubmitting }) => {
            try {
              console.log("Message Sent:", values);
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
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block font-medium">Name:</label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
                  placeholder="Enter your name"
                />
                <ErrorMessage name="name" component="div" className="text-red-400 text-sm" />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block font-medium">Email:</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-400 text-sm" />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block font-medium">Message:</label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full mt-1 p-2 rounded bg-gray-700 border border-gray-600"
                  placeholder="Write your message here..."
                />
                <ErrorMessage name="message" component="div" className="text-red-400 text-sm" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 disabled:bg-gray-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </Form>
          )}
        </Formik>

        <ToastContainer />
      </div>
    </div>
  );
};

export default ContactUsForm;
