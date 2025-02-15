import { Link } from "react-router-dom";
import { Avatar } from "./export";
import { formatDate, parseISO } from "date-fns";
import React from "react";

interface BlogCardTypes {
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
  id: number
  onCommentClick: () => void;
}

export const BlogCard: React.FC<BlogCardTypes> = ({
  authorName,
  title,
  content,
  publishDate,
  id,
  onCommentClick,
}) => {

  const data = content.slice(0, 250) + "...";
  const words = content.split(/\s+/).length;
  const publishedDateValue = parseISO(publishDate);



  return (
    <div
      className={"relative block bg-[rgba(255,255,255,0.2)] backdrop-blur-md border border-[rgba(255,255,255,0.3)] shadow-[0_10px_30px_rgba(0,0,0,0.2)] rounded-3xl p-6 hover:shadow-md "}
    >
      <div className="flex items-center mb-4">
        <Avatar size={10} name={authorName || "#"} />
        <div className="ml-3">
          <h4 className="font-medium text-lg text-[#6E4A8B]">{authorName}</h4>
          <span className="text-gray-100 text-sm">{formatDate(publishedDateValue, "EEE MMM d yyyy")}</span>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-[#8B6EA9] mb-2 drop-shadow-lg">
          {title}
        </h2>
        <div
          className="text-gray-100 text-sm formatted-content"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>
      <div className="mt-4 text-gray-700 text-xs">
        {`${Math.ceil(words / 100)} min read`}
      </div>
      <div className="flex justify-between">
        <Link to={`/blog/one/${id}`}>
          <button className="mt-4 px-4 py-2 bg-[#6E4A8B] text-white rounded-full">
            Continue Reading..
          </button>
        </Link>

        <button onClick={onCommentClick} className="mt-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.0714285714285714" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square-text">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M13 8H7" />
            <path d="M17 12H7" />
          </svg>
        </button>
      </div>

    </div>
  );
};