import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowDown, MessageCircle, User, Clock } from 'lucide-react';

interface Question {
  id: number;
  title: string;
  description: string;
  tags: string[];
  author: string;
  authorAvatar?: string;
  votes: number;
  answers: number;
  views: number;
  createdAt: string;
}

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const timeAgo = (date: string) => {
    const now = new Date();
    const questionDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - questionDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="flex flex-col items-center space-y-2 min-w-0">
          <button className="p-1 rounded hover:bg-gray-100 transition-colors">
            <ArrowUp className="h-5 w-5 text-gray-400 hover:text-green-500" />
          </button>
          <span className="text-lg font-semibold text-gray-700">{question.votes}</span>
          <button className="p-1 rounded hover:bg-gray-100 transition-colors">
            <ArrowDown className="h-5 w-5 text-gray-400 hover:text-red-500" />
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <Link 
            to={`/question/${question.id}`}
            className="block group"
          >
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {question.title}
            </h3>
          </Link>
          
          <p className="mt-2 text-gray-600 text-sm line-clamp-2">
            {question.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{question.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{timeAgo(question.createdAt)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{question.answers} answers</span>
              </div>
              <span>{question.views} views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;