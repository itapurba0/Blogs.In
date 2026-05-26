import { useState } from "react";
import DOMPurify from 'dompurify';
import { Blog } from "../hooks/Index";
import { AppBar, Avatar, CommentSection } from "./export";

function decodeIfEscaped(str: string) {
  if (!str) return str;
  if (str.includes('&lt;') || str.includes('&gt;')) {
    const el = document.createElement('textarea');
    el.innerHTML = str;
    return el.value;
  }
  return str;
}
function renderBlogHtml(html: string) {
  // if the HTML was double-escaped in the DB (e.g. "&lt;h1&gt;..."), decode it:
  const decoded = decodeIfEscaped(html);

  // sanitize the HTML to prevent XSS
  const clean = DOMPurify.sanitize(decoded);

  return <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: clean }} />;
}



export const FullBlog = ({ blog }: { blog: Blog }) => {

  const [showComments, setShowComments] = useState(false);

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C7B8EA] to-[#8B6EA9]">
      <AppBar />
      <div className="pt-16 pb-10 px-6 md:px-10 lg:px-28">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 mt-10">
          <div className="flex-1 bg-[rgba(255,255,255,0.15)] backdrop-blur-lg border border-[rgba(255,255,255,0.2)] rounded-3xl shadow-lg p-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#6E4A8B] mb-6">
              {blog.title}
            </h1>
            <p className="text-sm text-gray-800 mb-6">
              Posted on <span className="text-gray-100 font-semibold">2nd Dec 2022</span>
            </p>
            {/* sanitize and render stored HTML content */}
            <div className="text-gray-100 text-lg leading-relaxed mb-6 prose prose-invert max-w-none"
              
            >{renderBlogHtml(blog.content)}</div>
            <button onClick={handleCommentClick} className="mt-8 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.0714285714285714" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square-text">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M13 8H7" />
                <path d="M17 12H7" />
              </svg>
              <span className="text-">Comments</span>
            </button>
            {showComments && (
              <div className="mt-8">
                <CommentSection blogId={blog.id} show={showComments} />
              </div>
            )}
          </div>
          <div className="w-full h-fit lg:w-[30%] bg-[rgba(255,255,255,0.15)] backdrop-blur-md border border-[rgba(255,255,255,0.2)] rounded-3xl shadow-lg p-6 text-white sticky top-20">
            <h2 className="text-2xl font-bold mb-4 text-[#A78EA9] drop-shadow">
              About the Author
            </h2>
            <div className="flex items-center space-x-4">
              <Avatar name={blog.author?.name || "Anonymous"} size={10} />
              <div>
                <h3 className="text-xl font-semibold text-gray-100">
                  {blog.author?.name}
                </h3>
                <p className="text-gray-300 text-sm">
                  Passionate blogger, content creator, and storyteller.
                </p>
              </div>
            </div>
            <p className="mt-6 text-gray-300 leading-relaxed">
              "I believe in writing stories that resonate with readers and inspire people to think beyond the ordinary."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};