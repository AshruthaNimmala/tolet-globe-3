import React, { useState, useEffect } from 'react';
import { Container, Row, Button, ButtonGroup, Spinner } from 'react-bootstrap';
import BlogCard from '../components/BlogCard';
import Pagination from '../components/Pagination';
import { getBlogs } from '../services/blogService';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('latest'); // 'latest' or 'trending'
  
  // Fetch blogs when component mounts or when page/filter changes
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await getBlogs(currentPage, 6, filter);
        setBlogs(response.blogs);
        setTotalPages(response.totalPages);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blogs. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, [currentPage, filter]);
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  };
  
  // Handle filter change
  const handleFilterChange = (newFilter) => {
    if (newFilter !== filter) {
      setFilter(newFilter);
      setCurrentPage(1); // Reset to first page when filter changes
    }
  };
  
  return (
    <>
      <div className="home-header py-5 mb-5">
        <Container>
          <h1 className="display-4 text-center mb-3">Dynamic Blog Platform</h1>
          <p className="lead text-center mb-4">Discover the latest articles and trending topics</p>
          
          {/* Filter buttons */}
          <div className="filter-buttons">
            <ButtonGroup>
              <Button 
                variant={filter === 'latest' ? 'primary' : 'outline-primary'} 
                onClick={() => handleFilterChange('latest')}
                className="px-4"
              >
                <i className="bi bi-clock me-2"></i>
                Latest
              </Button>
              <Button 
                variant={filter === 'trending' ? 'primary' : 'outline-primary'} 
                onClick={() => handleFilterChange('trending')}
                className="px-4"
              >
                <i className="bi bi-graph-up-arrow me-2"></i>
                Trending
              </Button>
            </ButtonGroup>
          </div>
        </Container>
      </div>
      
      <Container>
      
      {/* Error message */}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}
      
      {/* Loading spinner */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {/* Blog cards */}
          <Row>
            {blogs.length > 0 ? (
              blogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            ) : (
              <div className="col-12 text-center my-5">
                <p>No blogs found.</p>
              </div>
            )}
          </Row>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}
    </Container>
    </>
  );
};

export default HomePage;