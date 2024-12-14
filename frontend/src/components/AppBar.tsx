import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useMyBlogs } from "../hooks/Index";

export const AppBar = () => {
  const { loading, blogs } = useMyBlogs();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#C7B8EA] to-[#A0A8E7]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }

  const authorname = blogs[0]?.author.name || "Anonymous";

  return (
    <div className="fixed top-0 left-0 w-full bg-[#6A1B9A] border-b-[1px] border-[#5A157F] shadow-md px-6 py-4 flex items-center justify-between z-50">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 bg-[#5A157F] rounded-full shadow-md"></div>
        <Link
          to="/blogs"
          className="text-2xl font-semibold text-white drop-shadow-lg hover:text-gray-200 transition duration-300"
        >
          Blogs.In
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        <Link to="/Publish">
          <button
            className="bg-[#8B6EA9] text-white px-5 py-2.5 rounded-full shadow-md hover:bg-[#6E4A8B] hover:shadow-lg transition-all duration-300"
          >
            New
          </button>
        </Link>
        <Link to="/MyBlogs">
          <Avatar size={10} name={authorname} />
        </Link>
      </div>
    </div>
  );
};
