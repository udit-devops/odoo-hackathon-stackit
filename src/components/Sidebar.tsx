import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, HelpCircle, Tag, TrendingUp, Users } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Questions', href: '/', icon: HelpCircle },
    { name: 'Tags', href: '/tags', icon: Tag },
    { name: 'Users', href: '/users', icon: Users },
  ];

  const popularTags = [
    { name: 'javascript', count: 1234 },
    { name: 'react', count: 987 },
    { name: 'python', count: 856 },
    { name: 'node.js', count: 743 },
    { name: 'css', count: 621 },
    { name: 'html', count: 534 },
    { name: 'typescript', count: 456 },
    { name: 'mongodb', count: 321 },
  ];

  const trendingQuestions = [
    {
      id: 1,
      title: "How to optimize React performance?",
      answers: 15,
      votes: 234
    },
    {
      id: 2,
      title: "Best practices for API design",
      answers: 8,
      votes: 189
    },
    {
      id: 3,
      title: "Understanding async/await in JavaScript",
      answers: 12,
      votes: 156
    }
  ];
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-3 py-2 text-sm font-medium border-l-4 transition-colors`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Popular Tags
          </h3>
          <div className="mt-3 space-y-1">
            {popularTags.map((tag) => (
              <Link
                key={tag.name}
                to={`/tags/${tag.name}`}
                className="group flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  #{tag.name}
                </div>
                <span className="text-xs text-gray-500">{tag.count}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <TrendingUp className="inline-block w-4 h-4 mr-1" />
            Trending
          </h3>
          <div className="mt-3 space-y-3">
            {trendingQuestions.map((question) => (
              <Link
                key={question.id}
                to={`/question/${question.id}`}
                className="block px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                  {question.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {question.answers} answers • {question.votes} votes
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;