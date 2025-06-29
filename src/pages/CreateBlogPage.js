import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createBlog } from '../services/blogService';

const CreateBlogPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isContentCreator, setIsContentCreator] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in and is a content creator
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setIsAuthenticated(true);
      setIsContentCreator(user.role === 'content-creator');
    } else {
      setIsAuthenticated(false);
      setIsContentCreator(false);
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim() || !content.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Get user info for author name
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      const blogData = {
        title,
        content,
        image: image || 'https://via.placeholder.com/800x400?text=Blog+Image',
        author: userInfo.name
      };
      
      const newBlog = await createBlog(blogData);
      setLoading(false);
      
      // Redirect to the new blog
      navigate(`/blog/${newBlog.id}`);
    } catch (err) {
      setError('Failed to create blog. Please try again.');
      setLoading(false);
    }
  };
  
  // If not authenticated, show login message
  if (!isAuthenticated) {
    return (
      <Container className="my-5">
        <Alert variant="warning">
          <Alert.Heading>Authentication Required</Alert.Heading>
          <p>
            You need to be logged in to create a blog post.
          </p>
          <hr />
          <div className="d-flex justify-content-between">
            <Button variant="primary" onClick={() => navigate('/login')}>
              Go to Login
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }
  
  // If authenticated but not a content creator, show permission message
  if (!isContentCreator) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          <Alert.Heading>Permission Denied</Alert.Heading>
          <p>
            You need to have content creator privileges to create blog posts.
          </p>
          <hr />
          <Button variant="outline-secondary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Alert>
      </Container>
    );
  }
  
  return (
    <Container>
      <h1 className="text-center mb-4">Create New Blog Post</h1>
      
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit} className="blog-form">
        <Form.Group className="mb-3">
          <Form.Label>Blog Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Cover Image URL (optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Form.Text className="text-muted">
            Leave blank to use a default image.
          </Form.Text>
        </Form.Group>
        
        <Form.Group className="mb-4">
          <Form.Label>Blog Content</Form.Label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="rich-text-editor"
            modules={{
              toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
              ]
            }}
          />
        </Form.Group>
        
        <div className="d-flex justify-content-between">
          <Button variant="info" type="submit" disabled={loading} className="px-4">
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
                Publishing...
              </>
            ) : (
              <>
                <i className="bi bi-send me-2"></i> Publish Blog Post
              </>
            )}
          </Button>
          
          <Button 
            variant="outline-secondary" 
            onClick={() => navigate('/')}
            disabled={loading}
            className="btn-dark-custom"
          >
            <i className="bi bi-x-circle me-1"></i> Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateBlogPage;