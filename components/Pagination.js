import Link from 'next/link';

//funkcia na zobrazenie stránkovania 
export default function Pagination({ currentPage, totalPages }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className="mx-auto flex w-full justify-center">
      {currentPage !== 1 && (
        <Link href={`/?page=1`} className="pagination-nav-link">
          {'<<'}&nbsp;&nbsp;
        </Link>
      )}
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`} className="pagination-nav-link">
          {'< '}Previous&nbsp;&nbsp;
        </Link>
      )}
      {getPageNumbers().map((pageNumber) => (
        <Link
          key={pageNumber}
          href={`/?page=${pageNumber}`}
          className={`pagination-page-link ${currentPage === pageNumber ? 'active' : ''}`}
        >
          {pageNumber}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={`/?page=${currentPage + 1}`} className="pagination-nav-link">
          Next{' >'}&nbsp;
        </Link>
      )}
      {currentPage !== totalPages && (
        <Link href={`/?page=${totalPages}`} className="pagination-nav-link">
          {'>>'}&nbsp;
        </Link>
      )}
    </nav>
  );
}