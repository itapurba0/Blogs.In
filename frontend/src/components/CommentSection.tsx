import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CommentSectionProps {
  blogId: number;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`/api/comments?blogId=${blogId}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [blogId]);

  //   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     setIsSubmitting(true);
  //     try {
  //       const response = await axios.post(`/api/v1/comments`, {
  //         blogId,
  //         text: newComment,
  //       });
  //       setComments([...comments, response.data]);
  //       setNewComment('');
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  //   };

  return (
    <div className="p-6 bg-[rgba(255,255,255,0.2)] backdrop-blur-md border border-[rgba(255,255,255,0.3)] shadow-[0_10px_30px_rgba(0,0,0,0.2)] rounded-3xl">
      <h2 className="text-2xl font-semibold text-[#8B6EA9] mb-4">Comments</h2>
      <form >
        <textarea
          className="w-full p-2 mb-4 border border-[#6E4A8B] rounded"
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
      <ul>
      {comments.map((comment) => (
          <li key={comment.id} className="mt-4">
            <p className="text-gray-100"><strong>{comment.author.name}:</strong> {comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
