import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface CommentSectionProps {
  blogId: number;
  show: boolean; // Add a prop to control visibility
}

export const CommentSection: React.FC<CommentSectionProps> = ({ blogId, show }) => {
  interface Comment {
    id: number;
    author: {
      name: string;
    };
    content: string;
  }

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/comments/all/${blogId}`)
      .then(response => {
        console.log("API response:", response);
        if (Array.isArray(response.data.comments)) {
          setComments(response.data.comments);
        } else {
          console.error("Expected an array of comments, but got:", response.data);
          setComments([]);
        }
      })
      .catch(error => {
        console.error("Error fetching comments:", error);
        setComments([]);
      });
  }, [blogId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/comments/comment`, {
        postId: blogId,
        content: newComment,
      }, {
        headers: {
          Authorization: `Bearer YOUR_AUTH_TOKEN`, // Replace with your actual token
        },
      });
      setComments([...comments, response.data]);
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
            <li key={comment.id} className="border-b border-gray-200 pb-2">
              <p className="text-gray-800"><strong>{comment.author.name}:</strong> {comment.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};