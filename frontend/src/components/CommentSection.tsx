import React, { useState} from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useComment } from '../hooks/Index';
import { Avatar } from './Avatar';
interface CommentSectionProps {
  blogId: number;
  show: boolean; 
}

export const CommentSection: React.FC<CommentSectionProps> = ({ blogId, show }) => {

  const { loading, comments } = useComment(blogId);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#C7B8EA] to-[#A0A8E7]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }
 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/comments/comment`, {
        postId: blogId,
        content: newComment,
      }, {headers: {
        Authorization: localStorage.getItem("jwt"),
      }
    });
      console.log("Comment submitted:", response.data);
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
      <div className=" p-6 bg-[rgba(255,255,255,0.2)] backdrop-blur-md border border-[rgba(255,255,255,0.3)] shadow-[0_10px_30px_rgba(0,0,0,0.2)] rounded-3xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2>
        <form onSubmit={handleSubmit} className="mb-4">
         
          <textarea
          className="w-full p-2 mb-4 border border-purple-700 rounded bg-[#d6b0ff44]"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          placeholder="Write a comment..."
          />
          <button
          type="submit"
          className="bg-[#6E4A8B] hover:bg-[#8B6EA9] text-white font-bold py-2 px-4 rounded"
          disabled={isSubmitting}
          >
          {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="border border-gray-300 p-4 rounded-lg shadow-sm bg-[#d8bfec]">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Avatar name={comment.author.name} size={10} />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">{comment.author.name}</p>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};