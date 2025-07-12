import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import AskQuestionPage from './pages/AskQuestionPage';
import QuestionDetailsPage from './pages/QuestionDetailsPage';
import TagsPage from './pages/TagsPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="flex max-w-7xl mx-auto">
            <Sidebar />
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tags" element={<TagsPage />} />
                <Route path="/tags/:tagName" element={<TagsPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route 
                  path="/ask" 
                  element={
                    <ProtectedRoute>
                      <AskQuestionPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/question/:id" element={<QuestionDetailsPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;