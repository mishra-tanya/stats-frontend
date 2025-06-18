import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="text-center animate-fade-in">
        <div className="text-[120px] font-extrabold text-gray-800 mb-4">
          404
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
          The page you’re looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
