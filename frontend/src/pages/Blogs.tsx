
import { AppBar, BlogCard } from "../components/export";
import { useBlogs } from "../hooks/Index";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#C7B8EA] to-[#A0A8E7]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#C7B8EA] to-[#8B6EA9] h-100%">
      <AppBar />
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        <div className="flex flex-col space-y-4">
          {blogs.filter((blog) => blog.published).map((blog) => (
            <div key={blog.id} className="blog-card">
              <BlogCard
                key={blog.id}
                authorName={blog.author?.name || "#"}
                title={blog.title}
                content={blog.content}
                publishDate={blog.publishDate}
                id={blog.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};