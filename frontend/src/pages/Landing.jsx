const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-blue-300 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl bg-white rounded-lg shadow-xl p-8 mx-4 md:mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
          Welcome to My Blog App
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Explore interesting articles and stories from our community.
        </p>
        <div className="flex justify-center mt-8">
          <a
            href="/blog"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Explore Blog
          </a>
          <a
            href="/login"
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 ml-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
