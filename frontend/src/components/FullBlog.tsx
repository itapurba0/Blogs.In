import { Blog } from "../hooks/Index";
import { AppBar, Avatar } from "./export";
import DOMPurify from 'dompurify';
export const FullBlog = ({ blog }: { blog: Blog }) => {
  const sanitizedContent = DOMPurify.sanitize(blog.content);
  console.log(sanitizedContent);
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
            <div className="formated-content"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>

          <div className="w-full h-fit lg:w-[30%] bg-[rgba(255,255,255,0.15)] backdrop-blur-md border border-[rgba(255,255,255,0.2)] rounded-3xl shadow-lg p-6 text-white sticky top-20">

            <h2 className="text-2xl font-bold mb-4 text-[#A78EA9] drop-shadow">
              About the Author
            </h2>


            <div className="flex items-center space-x-4">
              <Avatar name={blog.author.name || "Anonymous"} size={10} />
              <div>
                <h3 className="text-xl font-semibold text-gray-100">
                  {blog.author.name}
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
