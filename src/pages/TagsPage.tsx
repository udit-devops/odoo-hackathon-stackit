import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tag, TrendingUp, Users } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';

const TagsPage: React.FC = () => {
  const { tagName } = useParams<{ tagName?: string }>();
  const [sortBy, setSortBy] = useState('popular');

  // Mock data for all tags
  const allTags = [
    { name: 'javascript', count: 1234, description: 'For questions about JavaScript programming language' },
    { name: 'react', count: 987, description: 'For questions about React.js library' },
    { name: 'python', count: 856, description: 'For questions about Python programming language' },
    { name: 'node.js', count: 743, description: 'For questions about Node.js runtime' },
    { name: 'css', count: 621, description: 'For questions about CSS styling' },
    { name: 'html', count: 534, description: 'For questions about HTML markup' },
    { name: 'typescript', count: 456, description: 'For questions about TypeScript' },
    { name: 'mongodb', count: 321, description: 'For questions about MongoDB database' },
    { name: 'express', count: 298, description: 'For questions about Express.js framework' },
    { name: 'vue', count: 267, description: 'For questions about Vue.js framework' },
    { name: 'angular', count: 234, description: 'For questions about Angular framework' },
    { name: 'php', count: 198, description: 'For questions about PHP programming' },
  ];

  // Mock questions for specific tag
  const tagQuestions = [
    {
      id: 1,
      title: "How to handle async/await in JavaScript?",
      description: "I'm having trouble understanding how async/await works in JavaScript. Can someone explain with examples?",
      tags: ["javascript", "async", "promises"],
      author: "John Doe",
      votes: 23,
      answers: 5,
      views: 456,
      createdAt: "2024-01-10T10:30:00Z"
    },
    {
      id: 2,
      title: "Best practices for JavaScript error handling",
      description: "What are the recommended approaches for handling errors in JavaScript applications?",
      tags: ["javascript", "error-handling", "best-practices"],
      author: "Jane Smith",
      votes: 18,
      answers: 3,
      views: 234,
      createdAt: "2024-01-09T15:45:00Z"
    }
  ];

  const sortOptions = [
    { label: 'Popular', value: 'popular' },
    { label: 'Name', value: 'name' },
    { label: 'New', value: 'new' }
  ];

  if (tagName) {
    // Show questions for specific tag
    const tag = allTags.find(t => t.name === tagName);
    
    return (
      <div className="max-w-4xl">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Tag className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">#{tagName}</h1>
          </div>
          {tag && (
            <p className="text-gray-600 mb-4">{tag.description}</p>
          )}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>{tag?.count || 0} questions</span>
            </span>
            <span className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>Asked by {Math.floor((tag?.count || 0) * 0.7)} users</span>
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {tagQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      </div>
    );
  }

  // Show all tags
  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tags</h1>
          <p className="text-gray-600 mt-1">Browse questions by tags</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allTags.map((tag) => (
          <div
            key={tag.name}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => window.location.href = `/tags/${tag.name}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                #{tag.name}
              </span>
              <span className="text-sm text-gray-500">{tag.count}</span>
            </div>
            <p className="text-sm text-gray-600">{tag.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsPage;