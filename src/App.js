import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import NavBar from './components/NavBar';

// Pages
import HomePage from './pages/HomePage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import CreateBlogPage from './pages/CreateBlogPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog/:id" element={<BlogDetailsPage />} />
            <Route path="/create" element={<CreateBlogPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <footer className="bg-black text-white text-center py-4 footer-custom">
          <div className="container">
            <div className="mb-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none me-3 footer-icon">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none me-3 footer-icon">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none me-3 footer-icon">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none footer-icon">
                <i className="bi bi-github"></i>
              </a>
            </div>
            <p className="mb-0">© 2025 Dynamic Blog Platform. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
