import { useEffect, useState } from 'react';
import { AppBar, MyBlogCard, Avatar, CompleteProfile } from '../components/export';
import { useMyBlogs } from '../hooks/Index';

export const MyBlogs = () => {
  const { loading, blogs } = useMyBlogs();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!loading && blogs.length === 0) {
      console.log('No blogs found.');
    }
  }, [loading, blogs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#C7B8EA] to-[#A0A8E7]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }

  
  

  const authorName = blogs[0].author.name || 'Anonymous';
  const authorAbout = blogs[0].author.aboutMe || 'Passionate blogger, content creator, and storyteller.';
  const authorBio = blogs[0].author.bio || 'I believe in writing stories that resonate with readers and inspire people to think beyond the ordinary.';

  const handleEditProfile = () => {
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C7B8EA] to-[#8B6EA9]">
      <AppBar />
      <div className="pt-16 pb-10 px-6 md:px-10 lg:px-28">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 mt-10">
          <div className="flex-1 flex flex-col gap-6">
            { blogs.length===0?
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#6E4A8B] mb-6">No Blogs Yet</h1>:
  
            blogs.map((blog) => (
              <MyBlogCard
                key={blog.id}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.publishDate}
                published={blog.published}
                id={blog.id}
              />
            ))}
          </div>
          <div className="w-full h-fit lg:w-[30%] bg-[rgba(0,0,0,0.3)] backdrop-blur-md border border-[rgba(255,255,255,0.2)] rounded-3xl shadow-lg p-6 text-white sticky top-20">
            <h2 className="text-2xl font-bold mb-4 text-[#A78EA9] drop-shadow">Profile Details</h2>
            <div className="flex items-center space-x-4">
              <Avatar name={authorName} size={10} />
              <div>
                <h3 className="text-xl font-semibold text-gray-100">{authorName}</h3>
                <p className="text-gray-300 text-sm">{authorAbout}</p>
              </div>
            </div>
            <p className="mt-6 text-gray-300 leading-relaxed">{authorBio}</p>
            <button
              className="bg-[#A78EA9] text-white py-2 px-4 rounded-md hover:bg-[#C9C3E3] transition duration-300 ease-in-out"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <CompleteProfile
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          authorName={authorName}
          authorAbout={authorAbout}
          authorBio={authorBio}
        />
      )}
    </div>
  );
};
