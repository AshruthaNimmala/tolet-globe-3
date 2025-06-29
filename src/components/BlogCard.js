import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  // Function to truncate text to a specific length
  const truncateText = (text, maxLength) => {
    // Remove HTML tags if any
    const plainText = text.replace(/<[^>]+>/g, '');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substr(0, maxLength) + '...';
  };

  // Format date to a readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Col md={4} className="mb-4">
      <Card className="blog-card h-100">
        <div className="blog-card-img-container">
          <Card.Img 
            variant="top" 
            src={blog.image || 'https://via.placeholder.com/300x200?text=Blog+Image'} 
            alt={blog.title}
            className="blog-card-img"
          />
        </div>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <div className="blog-meta mb-2">
            <span className="me-3">
              <i className="bi bi-person-fill"></i> {blog.author}
            </span>
            <span>
              <i className="bi bi-calendar-event"></i> {formatDate(blog.createdAt)}
            </span>
          </div>
          <Card.Text>
            {truncateText(blog.content, 100)}
          </Card.Text>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <small className="text-muted me-3">
                <i className="bi bi-eye-fill"></i> {blog.views}
              </small>
              <small className="text-muted">
                <i className="bi bi-heart-fill"></i> {blog.likes}
              </small>
            </div>
            <Link to={`/blog/${blog.id}`} className="btn btn-info btn-sm">
              <i className="bi bi-arrow-right me-1"></i> Read More
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BlogCard;