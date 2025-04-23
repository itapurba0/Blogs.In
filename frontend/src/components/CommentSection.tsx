import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useComment } from '../hooks/Index';
import { Avatar } from './Avatar';

interface CommentSectionProps {
  blogId: number;
  show: boolean;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ blogId, show }) => {

  const { loading, comments, refetchComments } = useComment(blogId);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/comments/comment`, {
        postId: blogId,
        content: newComment,
      }, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        }
      });
      console.log("Comment submitted:", response.data);
      refetchComments(); // Refetch comments after submitting a new one
      setNewComment('');
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }

  };

  return (
    <div className={` transition-max-height duration-500 ease-in-out overflow-hidden ${show ? 'max-h-screen' : 'max-h-0'}`}>
      <div className="p-6 bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-3xl">
        <h2 className="text-xl font-semibold text-white mb-4">Comments</h2>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <form onSubmit={handleSubmit} className="mb-4">
              <textarea
                className="w-full p-2 mb-4 border border-[rgba(255,255,255,0.2)] rounded bg-[rgba(255,255,255,0.1)]"
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
                placeholder="Write a comment..."
              />
              <button
                type="submit"
                className="bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] text-white font-bold py-2 px-4 rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li key={comment.id} className="border border-[rgba(255,255,255,0.1)] p-4 rounded-lg shadow-sm bg-[rgba(255,255,255,0.1)]">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {comment.author && <Avatar name={comment.author.name} size={10} />}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{comment.author.name}</p>
                      <p className="text-white">{comment.content}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

const Skeleton = () => {

  return (

    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="border border-[rgba(255,255,255,0.1)] p-4 rounded-lg shadow-sm bg-[rgba(255,255,255,0.1)]">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-gray-300 rounded-full dark:bg-gray-600"></div>
            </div>
            <div>
              <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-16 mb-1.5"></div>
              <div className="w-16 h-1 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      ))}
    </div>

  )
}



