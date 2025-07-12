import React from 'react';
import { useState } from 'react';
import QuestionCard from '../components/QuestionCard';

const HomePage: React.FC = () => {
  const [sortBy, setSortBy] = useState('relevant');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const questionsPerPage = 5;

  // Mock data - replace with API calls
  const allQuestions = [
    {
      id: 1,
      title: "How to center a div using CSS Flexbox?",
      description: "I'm trying to center a div both horizontally and vertically using CSS Flexbox. I've tried various approaches but none seem to work perfectly. What's the best way to achieve this?",
      tags: ["css", "flexbox", "html", "frontend"],
      author: "Sarah Johnson",
      votes: 15,
      answers: 3,
      views: 234,
      createdAt: "2024-01-10T10:30:00Z"
    },
    {
      id: 2,
      title: "React useState vs useReducer - when to use which?",
      description: "I'm confused about when to use useState and when to use useReducer in React. Can someone explain the differences and provide examples of when each is more appropriate?",
      tags: ["react", "hooks", "javascript", "state-management"],
      author: "Mike Chen",
      votes: 28,
      answers: 7,
      views: 456,
      createdAt: "2024-01-09T15:45:00Z"
    },
    {
      id: 3,
      title: "Best practices for Node.js error handling",
      description: "What are the best practices for handling errors in Node.js applications? I'm particularly interested in async/await error handling and global error handling strategies.",
      tags: ["node.js", "error-handling", "javascript", "backend"],
      author: "Alex Rivera",
      votes: 22,
      answers: 5,
      views: 312,
      createdAt: "2024-01-09T09:20:00Z"
    },
    {
      id: 4,
      title: "MongoDB vs PostgreSQL for a new project",
      description: "I'm starting a new web application and trying to decide between MongoDB and PostgreSQL. The app will have user profiles, posts, and comments. Which database would be better suited for this use case?",
      tags: ["mongodb", "postgresql", "database", "architecture"],
      author: "Emma Wilson",
      votes: 31,
      answers: 12,
      views: 678,
      createdAt: "2024-01-08T14:15:00Z"
    },
    {
      id: 5,
      title: "How to implement authentication in a React app?",
      description: "I need to add user authentication to my React application. Should I use JWT tokens, sessions, or something else? What's the most secure and user-friendly approach?",
      tags: ["react", "authentication", "security", "jwt"],
      author: "David Kim",
      votes: 19,
      answers: 8,
      views: 445,
      createdAt: "2024-01-08T11:30:00Z"
    },
    {
      id: 6,
      title: "TypeScript generics explained with examples",
      description: "I'm struggling to understand TypeScript generics. Can someone provide practical examples of when and how to use them effectively?",
      tags: ["typescript", "generics", "javascript", "types"],
      author: "Lisa Zhang",
      votes: 25,
      answers: 6,
      views: 389,
      createdAt: "2024-01-07T16:20:00Z"
    },
    {
      id: 7,
      title: "Docker containerization best practices",
      description: "What are the best practices for containerizing applications with Docker? Looking for tips on optimization, security, and deployment strategies.",
      tags: ["docker", "containerization", "devops", "deployment"],
      author: "John Martinez",
      votes: 33,
      answers: 9,
      views: 567,
      createdAt: "2024-01-07T12:45:00Z"
    },
    {
      id: 8,
      title: "GraphQL vs REST API - which to choose?",
      description: "I'm designing a new API and trying to decide between GraphQL and REST. What are the pros and cons of each approach?",
      tags: ["graphql", "rest", "api", "backend"],
      author: "Anna Rodriguez",
      votes: 27,
      answers: 11,
      views: 423,
      createdAt: "2024-01-06T14:30:00Z"
    }
  ];

  const sortOptions = [
    { label: 'Relevant', value: 'relevant' },
    { label: 'Latest', value: 'latest' },
    { label: 'Top', value: 'top' }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(allQuestions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = allQuestions.slice(startIndex, endIndex);
  const hasMoreQuestions = currentPage < totalPages;

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handleLoadMore = () => {
    if (hasMoreQuestions && !loading) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setLoading(false);
      }, 500);
    }
  };
  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Questions</h1>
          <p className="text-gray-600 mt-1">{allQuestions.length} questions found</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`relative px-4 py-2 text-sm rounded-md transition-all duration-300 overflow-hidden group ${
                  sortBy === option.value 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900 bg-white border border-gray-300'
                }`}
              >
                <span className="relative z-10">{option.label}</span>
                {sortBy !== option.value && (
                  <div className="absolute inset-0 bg-blue-600 transform translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                )}
                {sortBy !== option.value && (
                  <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    {option.label}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {currentQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>

      {/* Dynamic Load more button */}
      {hasMoreQuestions && (
        <div className="mt-8 text-center">
          <button 
            onClick={handleLoadMore}
            disabled={loading}
            className="relative bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md transition-all duration-300 overflow-hidden group hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">
              {loading ? 'Loading...' : `Load more questions (${allQuestions.length - endIndex} remaining)`}
            </span>
            <div className="absolute inset-0 bg-blue-600 transform translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              {loading ? 'Loading...' : `Load more questions (${allQuestions.length - endIndex} remaining)`}
            </span>
          </button>
        </div>
      )}
      
      {!hasMoreQuestions && allQuestions.length > questionsPerPage && (
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">You've reached the end of the questions list</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;