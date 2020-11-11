import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaAngleDoubleRight, FaAngleRight, FaAngleDoubleLeft, FaAngleLeft } from 'react-icons/fa';

import { Page } from './pagination.styles';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  visiblePagesCount: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  visiblePagesCount,
}) => {
  const history = useHistory();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const half = Math.ceil(visiblePagesCount / 2);
  const pages = [];

  if (totalPages <= visiblePagesCount || currentPage <= half) {
    const limit = totalPages <= visiblePagesCount ? totalPages : visiblePagesCount;
    for (let i = 1; i <= limit; i++) {
      pages.push(i);
    }
  } else if (currentPage > half) {
    if (currentPage + half < totalPages) {
      for (let i = currentPage - half + 1; i <= currentPage + half; i++) {
        pages.push(i);
      }
    } else {
      for (let i = totalPages - visiblePagesCount + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
  }

  return (
    <>
      <Page
        disabled={currentPage === 1}
        onClick={() => history.push(`/?page=1`)}
        variant="outline-primary"
      >
        <FaAngleDoubleLeft />
      </Page>
      <Page
        disabled={currentPage === 1}
        onClick={() => history.push(`/?page=${currentPage - 1}`)}
        variant="outline-primary"
      >
        <FaAngleLeft />
      </Page>
      &nbsp;&nbsp;
      {pages.map((page) => (
        <Page
          onClick={() => history.push(`/?page=${page}`)}
          key={page}
          variant={page === currentPage ? 'primary' : 'outline-primary'}
        >
          {page}
        </Page>
      ))}
      &nbsp;&nbsp;
      <Page
        disabled={currentPage === totalPages}
        onClick={() => history.push(`/?page=${currentPage + 1}`)}
        variant="outline-primary"
      >
        <FaAngleRight />
      </Page>
      <Page
        disabled={currentPage === totalPages}
        onClick={() => history.push(`/?page=${totalPages}`)}
        variant="outline-primary"
      >
        <FaAngleDoubleRight />
      </Page>
    </>
  );
};
