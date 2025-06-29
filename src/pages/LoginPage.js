import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../services/blogService';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Check if user is already logged in
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      // Redirect to home if already logged in
      navigate('/');
    }
  }, [navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const user = await loginUser({ username, password });
      
      // Save user info to localStorage
      localStorage.setItem('userInfo', JSON.stringify(user));
      
      setLoading(false);
      
      // Redirect to the page they were trying to access, or home
      const from = location.state?.from || '/';
      navigate(from);
    } catch (err) {
      setError('Invalid username or password. Please try again.');
      setLoading(false);
    }
  };
  
  return (
    <Container className="my-5">
      <div className="login-form">
        <h2>Login</h2>
        
        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              Demo accounts: 'creator' (content creator) or 'user' (regular user)
            </Form.Text>
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              Demo password: 'password'
            </Form.Text>
          </Form.Group>
          
          <Button 
            variant="info" 
            type="submit" 
            className="w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Logging in...
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right me-2"></i> Login
              </>
            )}
          </Button>
        </Form>
        
        <div className="text-center mt-3">
          <Button 
            variant="link" 
            onClick={() => navigate('/')}
            className="text-decoration-none text-info"
          >
            <i className="bi bi-house-door me-1"></i> Back to Home
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;