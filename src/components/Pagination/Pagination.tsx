import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './pagination.module.css';
import { MAX_ITEMS_LIMIT } from '../../utils/const';
import IPaginationProps from '../../model/Pagination';

const Pagination: React.FC<IPaginationProps> = ({
  totalItems,
  limit,
  currentPage,
  onPageChange,
}): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.min(
    Math.ceil(totalItems / limit),
    Math.ceil(MAX_ITEMS_LIMIT / limit)
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      searchParams.set('page', page.toString());
      setSearchParams(searchParams);
      onPageChange(page);
    }
  };

  const goToFirstPage = () => {
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    onPageChange(1);
  };

  const renderPageNumbers = () => {
    const pages = [];

    pages.push(
      <button
        key={1}
        className={currentPage === 1 ? styles.active : ''}
        onClick={goToFirstPage}
      >
        1
      </button>
    );

    if (currentPage > 2) {
      pages.push(<span key="start-dots">...</span>);
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={currentPage === i ? styles.active : ''}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 1) {
      pages.push(<span key="end-dots">. . .</span>);
    }

    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          className={currentPage === totalPages ? styles.active : ''}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
