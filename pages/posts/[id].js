import { getBlog } from '../../lib/api';
import { formatDate } from '../../lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BlogContent from '../../components/BlogContent';

//Načíta detail článku z API, vráti objekt s props, ktoré budú poslané do komponentu Post
export async function getServerSideProps({ params }) {
  const blog = await getBlog(params.id);
  return {
    props: {
      blog,
    },
  };
}

//Zobrazí titul a obsah článku
export default function Post({ blog }) {
  const router = useRouter();
  const { page } = router.query; // Získaj page z query

  if (!blog) {
    return (
      <div className="min-h-screen bg-background font-sans antialiased max-w-6xl m-auto">
        <div className="container mx-auto px-5">
          <header className="flex items-center justify-between mt-8 md:mt-16 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">Blog</h1>
            <nav>
              <div className="hidden md:flex items-center">
                <div className="ml-4 md:ml-8">
                  <Link href="/" className="hover:text-gray-900">
                    Home
                  </Link>
                </div>
                <div className="ml-4 md:ml-8">
                  <Link href={`/?page=${page}`} className="hover:text-gray-900">
                    Back
                  </Link>
                </div>
              </div>
            </nav>
          </header>
          <main className="max-w-prose mx-auto text-xl">
            <div>
              <div className="prose lg:prose-xl dark:prose-invert mx-auto lg:prose-h1:text-4xl mb-10 lg:mt-20 break-words">
                <div className="flex flex-col items-center h-screen bg-gray-100 dark:bg-background">
                  <div className="text-4xl font-bold text-gray-800 dark:text-white mb-4" >Blog not found</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

   return (
    <div className='min-h-screen bg-background font-sans antialiased  max-w-6xl m-auto '>
      <div className="container mx-auto px-5">
        <header className='flex items-center justify-between mt-8 md:mt-16 mb-12'>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">Blog</h1>
          <nav>
            <div className="hidden md:flex items-center">
              <div className="ml-4 md:ml-8">
                <Link href="/" className="hover:text-gray-900">Home</Link>
              </div>
              <div className="ml-4 md:ml-8">
                <Link href={`/?page=${page}`} className="hover:text-gray-900">Back</Link>
              </div>
            </div>
          </nav>
        </header>
        <main className="max-w-prose mx-auto text-xl">
          <div>
            <div classname="prose lg:prose-xl dark:prose-invert mx-auto lg:prose-h1:text-4xl mb-10 lg:mt-20 break-words">
              <BlogContent blog={blog} /> 
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}