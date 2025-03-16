import { getBlogs } from '../lib/api';
import Link from 'next/link';
import { formatDate } from '../lib/utils';

//Načíta dáta z API, vráti objekt s props, ktoré budú poslané do komponentu Home
export async function getServerSideProps({ query }) {

  //stránkovanie
  const page = parseInt(query.page) || 1; // Stránka z query parametra alebo 1
  const pageSize = 6; // Počet článkov na stránku
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

  const formatCategories = (category) => {
    if (!category) {
        return '';
    }
    return `#${category}`;
  };

  return (
    <div className='min-h-screen bg-background font-sans antialiased  max-w-6xl m-auto '>
      <div className="container mx-auto px-5 mb-10">
        <header className='flex items-center justify-between mt-8 md:mt-16 mb-12'>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">Blog</h1>
        </header>
        {/* <p className="text-sm text-gray-500 mb-2">Number of links: {blogs.length}</p> */}
        <main>
          <ul>
            <div className="grid grid-cols-1 gap-16 lg:gap-28 md:grid-cols-2 md:my-16 my-8">
              {blogs.map((blog) => (
                <div className="break-words">
                  <li key={blog.id} className='grid grid-cols-1 gap-3 md:col-span-2 mt-4'>
                    <img src={blog.user.profile_pic} alt="Profile Picture" className="w-full h-[281px] object-cover mb-2" />
                    <Link href={`/posts/${blog.id}?page=${currentPage}`}className="font-sans font-semibold tracking-tighter text-primary text-2xl md:text-3xl">
                    {blog.title} 
                    </Link>
                    <p className='prose lg:prose-lg italic tracking-tighter text-muted-foreground text-gray-500'>{formatDate(blog.created_at)}</p>
                    <p className="text-gray-500">{blog.summary}</p>
                    <p className="text-sm text-gray-500">{formatCategories(blog.category)}</p>
                  </li>
                </div>
              ))}
            </div>
          </ul>
          <nav className='mx-auto flex w-full justify-center'>{/* stránkovanie */}
            {currentPage !== 1 && 
              <Link href={`/?page=1`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-gray-500  hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5">{'<<'}&nbsp;&nbsp;</Link>}    
            {currentPage > 1 && (
              <Link href={`/?page=${currentPage - 1}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-gray-500  hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5">{'< '}Previous&nbsp;&nbsp;</Link>
            )}
            {getPageNumbers().map((pageNumber) => (
              <Link
                key={pageNumber}
                href={`/?page=${pageNumber}`}
                className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-gray-500  hover:text-accent-foreground h-10 w-10 ${
                  currentPage === pageNumber
                    ? 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-gray-500 bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10' // Štýly pre aktívnu stránku
                    : ''
                }`}
              >
                {pageNumber}
              </Link>
            ))}
            {currentPage < totalPages && (
              <Link href={`/?page=${currentPage + 1}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-gray-500 hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5">Next{' >'}&nbsp;</Link>
            )}
            {currentPage !== totalPages && (
              <Link href={`/?page=${totalPages}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-gray-500  hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5">{'>>'}&nbsp;</Link>
            )}
          </nav>
        </main>
        <footer className="mt-8 md:mt-16 mb-12">
          <div className="text-sm text-muted-foreground text-gray-500">© xvavroa 2025</div>
        </footer>  
      </div>
    </div>
  );
}