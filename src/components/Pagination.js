import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If total pages is less than or equal to maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate start and end of the middle section
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're at the beginning or end
      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always include last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <BootstrapPagination className="justify-content-center my-4">
      <BootstrapPagination.First 
        onClick={() => onPageChange(1)} 
        disabled={currentPage === 1}
      />
      <BootstrapPagination.Prev 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      />
      
      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <BootstrapPagination.Ellipsis key={`ellipsis-${index}`} disabled />
        ) : (
          <BootstrapPagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </BootstrapPagination.Item>
        )
      ))}
      
      <BootstrapPagination.Next 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      />
      <BootstrapPagination.Last 
        onClick={() => onPageChange(totalPages)} 
        disabled={currentPage === totalPages}
      />
    </BootstrapPagination>
  );
};

export default Pagination;