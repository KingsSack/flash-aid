"use client"
import React from 'react';

// Define a type for a Post
interface Post {
  id: string;
  userName: string;
  timeAgo: string;
  content: string;
  upvotes: number;
  hasMap?: boolean; // New property to indicate if a post should have a map
}

const App: React.FC = () => {
  // Sample posts data
  const posts: Post[] = [
    {
      id: '1',
      userName: 'Helena',
      timeAgo: '3 min ago',
      content: 'There was a fire on X Street!',
      upvotes: 21,
      hasMap: true, // Helena's post will now include the map
    },
    {
      id: '2',
      userName: 'Daniel',
      timeAgo: '2 hrs ago',
      content: 'Power is out in my neighborhood.',
      upvotes: 6,
      hasMap: true,
    },
    // Add more posts as needed
  ];

  // Function to handle upvoting (for demonstration)
  const handleUpvote = (postId: string) => {
    console.log(`Upvoting post with ID: ${postId}`);
    // In a real application, you would update the state or call an API here
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background font-sans pb-20"> {/* Added pb-20 for bottom padding for bottom nav */}
      {/* Navigation Tabs: Home / Scenarios - Adjusted margin-top as map is no longer at the very top */}
      <div className="w-full max-w-md flex justify-around bg-white rounded-xl shadow-lg mt-4 p-2 relative z-10">
        {/* Home button - now unselected */}
        <button className="flex-1 py-2 px-4 rounded-lg text-gray-700 font-semibold text-lg hover:bg-gray-100 transition-colors duration-200">
          Home
        </button>
        {/* Scenarios button - now selected */}
        <button className="flex-1 py-2 px-4 rounded-lg bg-primary text-white font-semibold text-lg shadow-md">
          Scenarios
        </button>
      </div>

      {/* Posts Feed */}
      <div className="w-full max-w-md mt-6 px-4 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-xl shadow-md">
            {/* Conditionally render map placeholder inside Helena's post */}
            {post.hasMap && (
              <div className="w-full bg-blue-100 rounded-lg overflow-hidden mb-3" style={{ height: '150px' }}>
                <img
                  src="https://placehold.co/600x150/e0e0e0/555555?text=Map+Placeholder"
                  alt="Map"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/600x150/e0e0e0/555555?text=Map+Placeholder"; }}
                />
              </div>
            )}

            <div className="flex items-center mb-2">
              {/* User Avatar Placeholder */}
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-gray-600 font-bold text-sm">
                {post.userName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{post.userName} posted</p>
                <p className="text-sm text-gray-500">{post.timeAgo}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-3">{post.content}</p>
            <div className="flex items-center text-sm text-gray-600">
              {/* Upvote Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414L7.5 9.086 5.707 7.293a1 1 0 00-1.414 1.414l2.5 2.5a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{post.upvotes} upvotes</span>
              {/* Upvote Button */}
              <button
                onClick={() => handleUpvote(post.id)}
                className="ml-2 p-1 rounded-full bg-accent/20 text-accent hover:bg-accent/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              >
                {/* Plus sign icon for upvote */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation - Now only contains the "Create" button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-center items-center h-16 rounded-t-xl z-20">
        {/* "Create" button with plus sign icon */}
        <button className="flex flex-col items-center text-primary hover:text-blue-700 transition-colors duration-200">
          {/* Plus sign icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="text-xs mt-1">Create</span>
        </button>
      </div>
    </div>
  );
};

export default App;