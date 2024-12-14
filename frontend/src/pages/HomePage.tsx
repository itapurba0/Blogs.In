import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#C7B8EA]">
      <h1 className="text-6xl font-bold mb-8 text-[#A78EA9]">Welcome to My App</h1>
      <div className="flex justify-center space-x-4">
        <Link to="/signup" className="bg-[#A78EA9] hover:bg-[#8B6EA9] text-white font-bold py-2 px-4 rounded shadow-md">
          Sign Up
        </Link>
        <Link to="/signin" className="bg-[#A78EA9] hover:bg-[#8B6EA9] text-white font-bold py-2 px-4 rounded shadow-md">
          Sign In
        </Link>
      </div>
    </div>
  );
};