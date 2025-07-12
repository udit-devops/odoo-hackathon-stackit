import React, { useState } from 'react';
import { Users, Award, Calendar, MapPin } from 'lucide-react';

const UsersPage: React.FC = () => {
  const [sortBy, setSortBy] = useState('reputation');

  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      reputation: 2456,
      questionsAsked: 23,
      answersGiven: 67,
      joinedAt: '2023-06-15',
      location: 'San Francisco, CA',
      bio: 'Full-stack developer passionate about React and Node.js'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike@example.com',
      reputation: 1987,
      questionsAsked: 18,
      answersGiven: 89,
      joinedAt: '2023-04-22',
      location: 'New York, NY',
      bio: 'Frontend specialist with expertise in modern JavaScript frameworks'
    },
    {
      id: 3,
      name: 'Alex Rivera',
      email: 'alex@example.com',
      reputation: 1654,
      questionsAsked: 31,
      answersGiven: 45,
      joinedAt: '2023-08-10',
      location: 'Austin, TX',
      bio: 'Backend developer focused on scalable architectures'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      email: 'emma@example.com',
      reputation: 1432,
      questionsAsked: 15,
      answersGiven: 52,
      joinedAt: '2023-03-18',
      location: 'Seattle, WA',
      bio: 'DevOps engineer and cloud architecture enthusiast'
    },
    {
      id: 5,
      name: 'David Kim',
      email: 'david@example.com',
      reputation: 1298,
      questionsAsked: 27,
      answersGiven: 38,
      joinedAt: '2023-07-05',
      location: 'Los Angeles, CA',
      bio: 'Mobile developer specializing in React Native'
    },
    {
      id: 6,
      name: 'Lisa Zhang',
      email: 'lisa@example.com',
      reputation: 1156,
      questionsAsked: 12,
      answersGiven: 41,
      joinedAt: '2023-09-12',
      location: 'Boston, MA',
      bio: 'Data scientist and machine learning engineer'
    }
  ];

  const sortOptions = [
    { label: 'Reputation', value: 'reputation' },
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">Browse our community members</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{user.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{user.bio}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span>{user.reputation} reputation</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {formatDate(user.joinedAt)}</span>
                  </div>
                </div>
                
                {user.location && (
                  <div className="flex items-center space-x-1 text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-blue-600 font-medium">{user.questionsAsked} questions</span>
                  <span className="text-green-600 font-medium">{user.answersGiven} answers</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;