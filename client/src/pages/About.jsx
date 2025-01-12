import React from 'react'
import Header from '../components/Header';
const About = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About This Application</h1>
        <p className="text-lg text-gray-600 mb-4">
          This application is a modern, full-stack solution built with the <span className="font-semibold">MERN stack</span>: 
          <span className="text-indigo-600 font-semibold"> MongoDB</span>, <span className="text-indigo-600 font-semibold">Express.js</span>, 
          <span className="text-indigo-600 font-semibold"> React</span>, and <span className="text-indigo-600 font-semibold">Node.js</span>. 
          It offers a secure and seamless authentication experience for users.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Designed for scalability and performance, this app integrates essential and advanced features to ensure a user-friendly experience.
        </p>
        <div className="text-left text-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>User signup, signin, and signout functionalities.</li>
            <li>Google OAuth integration for quick and secure authentication.</li>
            <li>Profile picture upload and storage using <span className="font-semibold">Cloudinary</span>.</li>
            <li>Secure password hashing with <span className="font-semibold">bcrypt.js</span>.</li>
            <li>Role-based route protection to safeguard sensitive data and actions.</li>
          </ul>
        </div>
        <div className="text-left text-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Technology Highlights:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-semibold">MongoDB:</span> A NoSQL database for efficient and flexible data storage.
            </li>
            <li>
              <span className="font-semibold">Express.js:</span> A minimal and robust Node.js framework for API creation and routing.
            </li>
            <li>
              <span className="font-semibold">React:</span> A front-end library for building dynamic and responsive user interfaces.
            </li>
            <li>
              <span className="font-semibold">Node.js:</span> A JavaScript runtime for building scalable and high-performance backends.
            </li>
          </ul>
        </div>
        <p className="text-lg text-gray-600 mt-6">
          Whether you are looking for a secure authentication system or a robust full-stack architecture, this application demonstrates the power of the MERN stack in delivering modern web solutions.
        </p>
      </div>
    </div>
    </>
  );
};

export default About;
