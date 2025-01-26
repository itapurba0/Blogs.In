import axios from 'axios';
import React from 'react';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

interface CompleteProfileProps {
  isOpen: boolean;
  onClose: () => void;
  authorName: string;
  authorAbout: string;
  authorBio: string;
}

export const CompleteProfile: React.FC<CompleteProfileProps> = ({
  isOpen,
  onClose,
  authorName,
  authorAbout,
  authorBio,
}) => {
  if (!isOpen) return null;
  const navigate = useNavigate();
  const [name, setName] = React.useState(authorName);
  const [aboutMe, setAboutMe] = React.useState(authorAbout);
  const [bio, setBio] = React.useState(authorBio);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await axios.put(`${BACKEND_URL}/api/v1/user/updateAbout`, { name, aboutMe, bio }, {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      }
    });
    if (res.status === 200) {
      alert("saved successfully");
      onClose();
      navigate(`/MyBlogs`), { refresh: true };
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gradient-to-br from-[#C7B8EA] to-[#8B6EA9] rounded-md p-6 w-[80%] md:w-[50%] lg:w-[30%] shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">Complete Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full bg-[rgba(255,255,255,0.6)] placeholder:text-[#8B6EA9] text-gray-700 text-sm border border-transparent focus:border-[#A78EA9] rounded-lg px-4 py-2 transition duration-300 shadow-md focus:shadow-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-1">About:</label>
            <textarea
              value={aboutMe}
              onChange={(event) => setAboutMe(event.target.value)}
              className="w-full bg-[rgba(255,255,255,0.6)] placeholder:text-[#8B6EA9] text-gray-700 text-sm border border-transparent focus:border-[#A78EA9] rounded-lg px-4 py-2 transition duration-300 shadow-md focus:shadow-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-1">Bio:</label>
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              className="w-full bg-[rgba(255,255,255,0.6)] placeholder:text-[#8B6EA9] text-gray-700 text-sm border border-transparent focus:border-[#A78EA9] rounded-lg px-4 py-2 transition duration-300 shadow-md focus:shadow-lg focus:outline-none"
            />
          </div>
          <div className='flex justify-between'>
            <button
              type="submit"
              className="bg-[#A78EA9] text-white py-2 px-4 rounded-lg hover:bg-[#C9C3E3] transition duration-300 ease-in-out"
            >
              Save Changes
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};