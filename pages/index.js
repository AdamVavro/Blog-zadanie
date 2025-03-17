import { getBlogs } from '../lib/api';
import BlogListItem from '../components/BlogListItem';
import Pagination from '../components/Pagination';
import { formatDate } from '../lib/utils';

//Načíta dáta z API, vráti objekt s props, ktoré budú poslané do komponentu Home
export async function getServerSideProps({ query }) {

  //stránkovanie
  const page = parseInt(query.page) || 1;
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
  };
}

//Prijíma props blogs, currentPage, totalPages a vytvára odkaz na detail článku
export default function Home({ blogs, currentPage, totalPages }) {
  return (
    <div className='min-h-screen bg-background font-sans antialiased  max-w-6xl m-auto '>
      <div className="container mx-auto px-5 mb-10">
        <header className='flex items-center justify-between mt-8 md:mt-16 mb-12'>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">Blog</h1>
        </header>
        {/* <p className="text-sm text-gray-500 mb-2">Number of links: {blogs.length}</p> */}
        <main>
          <ul className="grid grid-cols-1 gap-16 lg:gap-28 md:grid-cols-2 md:my-16 my-8">
            {blogs.map((blog) => (
              <BlogListItem key={blog.id} blog={blog} currentPage={currentPage} />
            ))}
          </ul>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </main>
        <footer className="mt-8 md:mt-16 mb-12">
          <div className="text-sm text-muted-foreground text-gray-500">© xvavroa 2025</div>
        </footer>  
      </div>
    </div>
  );
}