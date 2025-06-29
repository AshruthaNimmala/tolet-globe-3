import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { getBlogById, likeBlog } from '../services/blogService';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liking, setLiking] = useState(false);
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const blogData = await getBlogById(id);
        setBlog(blogData);
        setLoading(false);
      } catch (err) {
        setError('Blog not found or failed to load.');
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);
  
  const handleLike = async () => {
    try {
      setLiking(true);
      const updatedBlog = await likeBlog(id);
      setBlog(updatedBlog);
      setLiking(false);
    } catch (err) {
      setError('Failed to like the blog. Please try again.');
      setLiking(false);
    }
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  // Format date to a readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container className="my-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Button variant="primary" onClick={handleGoBack}>
          Go Back
        </Button>
      </Container>
    );
  }
  
  if (!blog) {
    return (
      <Container className="my-5">
        <div className="alert alert-warning" role="alert">
          Blog not found.
        </div>
        <Button variant="primary" onClick={handleGoBack}>
          Go Back
        </Button>
      </Container>
    );
  }
  
  return (
    <Container>
      <Button variant="outline-info" className="mb-4" onClick={handleGoBack}>
        <i className="bi bi-arrow-left me-1"></i> Back
      </Button>
      
      <div className="blog-header">
        <Container>
          <h1 className="display-4">{blog.title}</h1>
          <div className="blog-meta mt-3">
            <span className="me-3">
              <i className="bi bi-person"></i> {blog.author}
            </span>
            <span className="me-3">
              <i className="bi bi-calendar"></i> {formatDate(blog.createdAt)}
            </span>
            <span className="me-3">
              <i className="bi bi-eye"></i> {blog.views} views
            </span>
            <span>
              <i className="bi bi-heart"></i> {blog.likes} likes
            </span>
          </div>
        </Container>
      </div>
      
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <div className="blog-image-container mb-4">
            <img 
              src={blog.image || 'https://via.placeholder.com/800x400?text=Blog+Image'} 
              alt={blog.title}
              className="img-fluid rounded blog-detail-image"
            />
          </div>
          
          <div className="blog-content">
            {/* Split paragraphs and render them properly */}
            {blog.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="d-flex justify-content-between align-items-center mt-5">
            <Button 
              variant="outline-info" 
              onClick={handleLike}
              disabled={liking}
              className="btn-like"
            >
              {liking ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Liking...
                </>
              ) : (
                <>
                  <i className="bi bi-heart-fill me-2"></i> Like this post
                </>
              )}
            </Button>
            
            <div>
              <Button variant="outline-secondary" onClick={handleGoBack} className="btn-dark-custom">
                <i className="bi bi-arrow-left-circle me-1"></i> Back to Blogs
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogDetailsPage;