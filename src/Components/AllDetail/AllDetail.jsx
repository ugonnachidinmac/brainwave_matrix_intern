import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AllDetail = () => {
  const { id } = useParams();
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/allDetail/${id}`);
        if (!response.ok) throw new Error('Blog not found');
        const data = await response.json();
        setFoodItem(data);
      } catch (error) {
        console.error(error);
        setFoodItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleLike = () => setLikeCount(prev => prev + 1);
  const toggleCommentInput = () => setShowCommentInput(prev => !prev);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      setComments(prev => [...prev, newComment]);
      setCommentCount(prev => prev + 1);
      setNewComment('');
      setShowCommentInput(false);
    }
  };

  const toggleShareOptions = () => {
    setShowShareOptions(prev => !prev);
    setShareMessage('');
  };

  const handleShare = (platform) => {
    setShareMessage(`Post shared successfully on ${platform}!`);
    setShowShareOptions(false);
    setTimeout(() => setShareMessage(''), 3000);
  };

  const toggleCommentsView = () => setShowAllComments(prev => !prev);

  if (loading) return <p className="p-4 text-center text-gray-600">Loading...</p>;
  if (!foodItem) return <p className="p-4 text-center text-red-500">Blog not found.</p>;

  const visibleComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <section className="p-4 sm:p-6 md:p-8 max-w-5xl w-full mx-auto">
      <div className="border p-4 sm:p-6 rounded shadow bg-white">
        <div className="w-full mb-4">
          <img
            src={foodItem.picture}
            alt={foodItem.title}
            className="rounded w-full max-h-[400px] object-cover"
            loading="lazy"
          />
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 break-words">{foodItem.title}</h1>
        <p className="text-gray-600 text-sm sm:text-base mb-4 break-words">{foodItem.titleDescription}</p>

        <h2 className="text-lg sm:text-xl font-semibold mb-2 break-words">{foodItem.subTitle}</h2>
        <p className="text-gray-700 text-sm sm:text-base mb-4 break-words">{foodItem.subTitleDescription}</p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500">
          <span>{foodItem.author}</span>
          <span>{new Date(foodItem.published).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Like, Comment, Share Section */}
      <div className="border-t pt-4 mt-6">
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <button onClick={handleLike} className="text-blue-500 hover:underline transition">
            👍 Like ({likeCount})
          </button>
          <button onClick={toggleCommentInput} className="text-green-500 hover:underline transition">
            💬 Comment ({commentCount})
          </button>
          <button onClick={toggleShareOptions} className="text-purple-500 hover:underline transition">
            🔗 Share
          </button>
        </div>

        {/* Comment Input */}
        {showCommentInput && (
          <form onSubmit={handleCommentSubmit} className="mb-4 w-full">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="border rounded p-2 w-full mb-2 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition text-sm"
            >
              Post Comment
            </button>
          </form>
        )}

        {/* Comments Display */}
        {comments.length > 0 && (
          <ul className="mb-2 w-full">
            {visibleComments.map((comment, index) => (
              <li key={index} className="text-gray-700 text-sm sm:text-base mb-1 break-words">
                • {comment}
              </li>
            ))}
          </ul>
        )}

        {/* Toggle View More */}
        {comments.length > 3 && (
          <button onClick={toggleCommentsView} className="text-sm text-blue-500 hover:underline mb-4">
            {showAllComments ? 'View less' : 'View more'}
          </button>
        )}

        {/* Share Options */}
        {showShareOptions && (
          <div className="mb-2">
            <p className="text-gray-600 text-sm mb-1">Share on:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleShare('Facebook')}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
              >
                Facebook
              </button>
              <button
                onClick={() => handleShare('Twitter')}
                className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500 transition text-sm"
              >
                Twitter
              </button>
              <button
                onClick={() => handleShare('WhatsApp')}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-sm"
              >
                WhatsApp
              </button>
            </div>
          </div>
        )}

        {/* Share Message */}
        {shareMessage && (
          <p className="text-sm text-green-600 mt-2">{shareMessage}</p>
        )}
      </div>
    </section>
  );
};

export default AllDetail;
