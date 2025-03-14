import { getBlogs } from '../lib/api';
import Link from 'next/link';
import { formatDate, getExcerpt } from '../lib/utils';

//Načíta dáta z API, vráti objekt s props, ktoré budú poslané do komponentu Home
export async function getServerSideProps({ query }) {

  //stránkovanie
  const page = parseInt(query.page) || 1; // Stránka z query parametra alebo 1
  const pageSize = 15; // Počet článkov na stránku
  const blogs = await getBlogs();

  // zmena formátu dátumu a zoradenie článkov podľa dátumu publikovania (created_at)
  const sortedBlogs = blogs.sort((a, b) => {
     return new Date(formatDate(b.created_at)) - new Date(formatDate(a.created_at));
  });

  //Vypočítava indexy pre články, ktoré sa majú zobraziť na aktuálnej stránke.
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedBlogs = sortedBlogs.slice(startIndex, endIndex);//Vytvára pole paginatedBlogs, ktoré obsahuje len články pre aktuálnu stránku.

  const totalPages = Math.ceil(sortedBlogs.length / pageSize);

  return {
    props: {
      blogs: paginatedBlogs,
      currentPage: page,
      totalPages: totalPages,
    },
    //revalidate: 10, // Voliteľné: revalidácia dát každých 10 sekúnd
  };
}

//Prijíma props blogs a vytvára odkaz na detail článku
export default function Home({ blogs, currentPage, totalPages }) {
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
    <div>

      <h1>Blog</h1>

      <p>Number of links: {blogs.length}</p>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/posts/${blog.id}`}>
            {blog.title} ({formatDate(blog.created_at)})
            </Link>
            <p>{getExcerpt(blog.main_content)}</p>
          </li>
        ))}
      </ul>

       <div>
        {currentPage !== 1 && <Link href={`/?page=1`}>First</Link>}    
        {currentPage > 1 && (
          <Link href={`/?page=${currentPage - 1}`}>{'<'}</Link>
        )}
        {getPageNumbers().map((pageNumber) => (
          <Link
            key={pageNumber}
            href={`/?page=${pageNumber}`}
            style={{
              fontWeight: currentPage === pageNumber ? 'bold' : 'normal',
            }}
          >
            {pageNumber}
          </Link>
        ))}
        {currentPage < totalPages && (
          <Link href={`/?page=${currentPage + 1}`}>{'>'}</Link>
        )}
        {currentPage !== totalPages && (
          <Link href={`/?page=${totalPages}`}>Last</Link>
        )}
      </div>
    </div>
  );
}