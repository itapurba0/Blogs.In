import { Link } from "react-router-dom";
import { useHandleDelete, useHandlePublish } from "../hooks/Index";
import { format, parseISO } from "date-fns";
import { BsBoxArrowUp,BsFillTrash3Fill } from "react-icons/bs";
interface BlogCardTypes {
  title: string;
  content: string;
  publishedDate: string;
  published: boolean;
  id: number;
}

export const MyBlogCard = ({ title, content, publishedDate, id, published }: BlogCardTypes) => {
  const { handleDelete } = useHandleDelete();
  const { handlePublish } = useHandlePublish();
  const words = content.split(/\s+/).length;
  const data = content.slice(0, 250) + "...";
  const publishedDateValue = parseISO(publishedDate);

  return (
    <div className="relative block bg-[rgba(255,255,255,0.2)] backdrop-blur-md border border-[rgba(255,255,255,0.3)] shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-3xl p-6 transition-transform duration-300 ease-in-out hover:scale-102 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
      <div className="absolute top-4 right-4 space-x-2">
        <button
          onClick={() => handleDelete(id)}
        >
          <BsFillTrash3Fill size={20} />
        </button>
        {!published && (
          <button
            onClick={() => handlePublish(id)}
          >
            <BsBoxArrowUp size={20} />
          </button>
        )}
      </div>
      <Link to={`/blog/one/${id}`}>
        {/* Date Section */}
        <div className="flex items-center mb-4">
          <Circle />
          <div className="ml-3">
            <span className="text-gray-300 text-sm">
              {format(publishedDateValue, "EEE MMM d yyyy")}{" "}
              {published ? (
                <span className="text-sky-600 font-semibold">Published</span>
              ) : (
                <span className="text-red-700 font-semibold">Draft</span>
              )}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div>
          <h2 className="text-2xl font-semibold text-[#8B6EA9] mb-2 drop-shadow-lg">
            {title}
          </h2>
          <div
            className="formatted-content text-gray-100"
            dangerouslySetInnerHTML={{ __html: data }} 
          ></div>
        </div>

        {/* Read Time */}
        <div className="mt-4 text-gray-900 text-xs">
          {`${Math.ceil(words / 100)} min read`}
        </div>
      </Link>
    </div>
  );
};

function Circle() {
  return (
    <div className="h-1.5 w-1.5 rounded-full bg-slate-600"></div>
  );
}