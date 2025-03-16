import React, { useState } from 'react';
import axios from 'axios';

// Create axios instance outside component
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await api.post('/blog-posts', {
        title,
        content
      });

      if (response.status === 201) {
        alert('Post submitted successfully!');
        window.location.href = '/dashboard';
      }
    } catch (error) {
      let errorMessage = 'Failed to submit post. Please try again.';
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || 
          error.message || 
          'Network Error';
      }

      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4 w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md lg:max-w-6xl lg:mt-8">
      <h1 className="text-2xl font-bold text-center mb-4">Submit a Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="content">
            Content:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="5"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-green-500 text-white px-4 py-2 rounded-md transition duration-200 ${
              isSubmitting 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-green-600'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;