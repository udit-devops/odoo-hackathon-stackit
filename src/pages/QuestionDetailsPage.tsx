import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowUp, ArrowDown, MessageCircle, User, Clock, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';

const QuestionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newAnswer, setNewAnswer] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Mock data - replace with API call based on id
  const question = {
    id: parseInt(id || '1'),
    title: "How to center a div using CSS Flexbox?",
    description: `I'm trying to center a div both horizontally and vertically using CSS Flexbox. I've tried various approaches but none seem to work perfectly.

Here's what I currently have:

\`\`\`css
.container {
  display: flex;
  height: 100vh;
}

.centered {
  margin: auto;
}
\`\`\`

But this doesn't seem to work as expected. What's the best way to achieve perfect centering with Flexbox?`,
    tags: ["css", "flexbox", "html", "frontend"],
    author: "Sarah Johnson",
    votes: 15,
    views: 234,
    createdAt: "2024-01-10T10:30:00Z"
  };

  const answers = [
    {
      id: 1,
      content: `The simplest way to center a div both horizontally and vertically using Flexbox is:

\`\`\`css
.container {
  display: flex;
  justify-content: center;  /* horizontal centering */
  align-items: center;      /* vertical centering */
  height: 100vh;           /* full viewport height */
}
\`\`\`

This approach is more explicit and reliable than using \`margin: auto\`. The \`justify-content: center\` centers the item horizontally, while \`align-items: center\` centers it vertically.`,
      author: "Mike Chen",
      votes: 12,
      isAccepted: true,
      createdAt: "2024-01-10T11:15:00Z"
    },
    {
      id: 2,
      content: `Another approach is to use \`place-items: center\` if you're using CSS Grid, but for Flexbox specifically, you can also use:

\`\`\`css
.container {
  display: flex;
  min-height: 100vh;
}

.centered {
  margin: auto;
}
\`\`\`

Make sure you're using \`min-height\` instead of just \`height\` for better responsiveness. Your original code was close, but \`min-height\` is often more flexible.`,
      author: "Alex Rivera",
      votes: 8,
      isAccepted: false,
      createdAt: "2024-01-10T12:30:00Z"
    },
    {
      id: 3,
      content: `For modern browsers, you can also use the newer \`place-content\` property:

\`\`\`css
.container {
  display: flex;
  place-content: center;
  min-height: 100vh;
}
\`\`\`

This is a shorthand that combines \`justify-content\` and \`align-content\`. However, browser support might be limited compared to the traditional approach.`,
      author: "Emma Wilson",
      votes: 5,
      isAccepted: false,
      createdAt: "2024-01-10T14:45:00Z"
    }
  ];

  const timeAgo = (date: string) => {
    const now = new Date();
    const questionDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - questionDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    console.log('Submitting answer:', newAnswer);
    alert('Answer submitted successfully!');
    setNewAnswer('');
  };

  return (
    <div className="max-w-4xl">
      {/* Question */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{question.title}</h1>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>Asked by {question.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{timeAgo(question.createdAt)}</span>
          </div>
          <span>{question.views} views</span>
        </div>

        <div className="flex items-start space-x-6">
          <div className="flex flex-col items-center space-y-2">
            <button className="p-2 rounded hover:bg-gray-100 transition-colors">
              <ArrowUp className="h-6 w-6 text-gray-400 hover:text-green-500" />
            </button>
            <span className="text-2xl font-bold text-gray-700">{question.votes}</span>
            <button className="p-2 rounded hover:bg-gray-100 transition-colors">
              <ArrowDown className="h-6 w-6 text-gray-400 hover:text-red-500" />
            </button>
          </div>

          <div className="flex-1">
            <div className="prose max-w-none">
              {question.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph.includes('```') ? (
                    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                      <code>{paragraph.replace(/```css|```/g, '')}</code>
                    </pre>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Answers */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {answers.length} Answer{answers.length !== 1 ? 's' : ''}
        </h2>

        <div className="space-y-6">
          {answers.map((answer) => (
            <div
              key={answer.id}
              className={`bg-white rounded-lg border p-6 ${
                answer.isAccepted ? 'border-green-200 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-6">
                <div className="flex flex-col items-center space-y-2">
                  <button className="p-2 rounded hover:bg-gray-100 transition-colors">
                    <ArrowUp className="h-5 w-5 text-gray-400 hover:text-green-500" />
                  </button>
                  <span className="text-xl font-semibold text-gray-700">{answer.votes}</span>
                  <button className="p-2 rounded hover:bg-gray-100 transition-colors">
                    <ArrowDown className="h-5 w-5 text-gray-400 hover:text-red-500" />
                  </button>
                  {answer.isAccepted && (
                    <div className="flex flex-col items-center">
                      <Check className="h-6 w-6 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">Accepted</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="prose max-w-none">
                    {answer.content.split('\n\n').map((paragraph, index) => (
                      <div key={index} className="mb-4">
                        {paragraph.includes('```') ? (
                          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                            <code>{paragraph.replace(/```css|```/g, '')}</code>
                          </pre>
                        ) : (
                          <p className="text-gray-700 leading-relaxed">{paragraph}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{answer.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{timeAgo(answer.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Answer Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Answer</h3>
        
        {isAuthenticated ? (
          <form onSubmit={handleSubmitAnswer}>
            <div className="mb-4">
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                rows={8}
                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your answer here... You can use Markdown for formatting."
                required
              />
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Post Your Answer
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              You need to be signed in to post an answer.
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Sign In to Answer
            </button>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </div>
  );
};

export default QuestionDetailsPage;