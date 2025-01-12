import React from 'react'
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to My Authentication App
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          This is a full-featured <span className="font-semibold">MERN stack</span> application built with modern web technologies, including <span className="font-semibold">MongoDB</span>, <span className="font-semibold">Node.js</span>, <span className="font-semibold">Express.js</span>, and <span className="font-semibold">React</span>.
        </p>
        <p className="text-gray-600 mb-6">
          The application offers robust user authentication features such as:
        </p>
        <ul className="list-disc list-inside text-left text-gray-700 mb-6">
          <li>Signup, Signin, and Signout functionalities.</li>
          <li>Google authentication for easy access.</li>
          <li>Profile picture uploads, stored securely in <span className="font-semibold">Cloudinary</span>.</li>
        </ul>
        <p className="text-gray-600">
          Experience a seamless and secure way to manage your account with modern technologies and responsive design!
        </p>
      </div>
    </div>
  );
};

export default Home;
