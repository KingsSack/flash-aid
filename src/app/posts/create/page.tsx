"use client"

import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background p-4 font-sans">
      {/* Existing Header/Navigation ('M' removed, 'Create a post', '29' removed) */}
      <div className="w-full flex justify-between items-center px-4 py-3 bg-background rounded-b-xl mb-4">
        {/* Removed 'M' icon/button (the three lines) */}
        <div className="w-6 h-6"></div> {/* Placeholder for alignment if needed, or remove if not necessary */}
        <h1 className="text-xl font-semibold text-gray-800">Create a <span className="text-primary">post</span></h1>
        {/* Removed '29' - Placeholder for a notification or counter */}
        {/* An empty div is added here to maintain the justify-between spacing if desired, otherwise it can be removed */}
        <div className="w-6 h-6"></div>
      </div>

      {/* Map Placeholder */}
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Select your location</h3>

        {/* Map Placeholder - Moved inside this section */}
        {/* Adjusted height and added mb-4 for spacing below the map */}
        <div className="w-full bg-blue-100 rounded-lg overflow-hidden shadow-md mb-4" style={{ height: '200px' }}>
          <img
            src="https://placehold.co/600x200/e0e0e0/555555?text=Map+Placeholder"
            alt="Map"
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = "https://placehold.co/600x200/e0e0e0/555555?text=Map+Placeholder"; }}
          />
        </div>
      </div>

      {/* Enter a description of your scenario section */}
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Enter a description of your scenario</h3>
        <textarea
          placeholder="Type description here"
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 resize-none"
        ></textarea>
      </div>

      {/* Post Button */}
      <button className="w-full max-w-md bg-primary text-white p-4 rounded-lg font-semibold text-xl hover:bg-primary/90 transition-colors duration-200 shadow-md">
        Post
      </button>
    </div>
  );
};

export default App;