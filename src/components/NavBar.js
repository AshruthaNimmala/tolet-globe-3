import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isContentCreator, setIsContentCreator] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setIsLoggedIn(true);
      setIsContentCreator(user.role === 'content-creator');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setIsContentCreator(false);
    navigate('/');
  };

  const handleAddBlog = () => {
    if (isContentCreator) {
      navigate('/create');
    } else {
      // If not logged in, redirect to login
      if (!isLoggedIn) {
        navigate('/login');
      } else {
        // If logged in but not a content creator, show alert
        alert('You need to be a content creator to add blogs.');
      }
    }
  };

  return (
    <Navbar bg="black" variant="dark" expand="lg" className="mb-4 navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-text">
          <i className="bi bi-journal-richtext me-2"></i>
          Dynamic Blog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              <i className="bi bi-house-door me-1"></i> Home
            </Nav.Link>
          </Nav>
          <Nav>
            <Button 
              variant="outline-info" 
              className="me-2 btn-custom"
              onClick={handleAddBlog}
            >
              <i className="bi bi-plus-circle me-1"></i> Add Blog
            </Button>
            {isLoggedIn ? (
              <Button variant="outline-light" className="btn-custom" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </Button>
            ) : (
              <Button variant="outline-light" className="btn-custom" as={Link} to="/login">
                <i className="bi bi-person me-1"></i> Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;