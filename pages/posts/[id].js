import { getBlog } from '../../lib/api';
import { formatDate } from '../../lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';

//Načíta detail článku z API, vráti objekt s props, ktoré budú poslané do komponentu Post
export async function getServerSideProps({ params }) {
  //console.log('Params ID:', params.id);
  const blog = await getBlog(params.id);
  return {
    props: {
      blog,
    },
  };
}

//Zobrazí titul a obsah článku
export default function Post({ blog }) {
  const router = useRouter(); // Pridaj useRouter
  const { page } = router.query; // Získaj page z query
  //console.log('Blog prop:', blog);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const extractContent = (content) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    const h1 = tempDiv.querySelector('h1');
    const h1Content = h1 ? h1.outerHTML : '';

    if (h1) {
        h1.remove();
    }

    let restContent = tempDiv.innerHTML.trim();

    // Pridaj className k elementom <p>
    restContent = restContent.replace(/<p>/g, '<p class="my-6 text-[#D1D5DB] tracking-tighter lg:prose-xl">');

    return {
        h1Content,
        restContent,
    };
  };

  const { h1Content, restContent } = extractContent(blog.main_content);

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
              <h1 className="text-4xl md:text-4xl font-bold tracking-tighter leading-tight mb-8 text-white">
                <div dangerouslySetInnerHTML={{ __html: h1Content }} />
              </h1>
              <div className="blog-content mx-auto">
                <img src={blog.featured_image} alt={blog.title} className="mb-10"/>
                <div dangerouslySetInnerHTML={{ __html: restContent }} />
                <p className="prose lg:prose-lg italic tracking-tighter text-muted-foreground text-gray-500 my-10">{formatDate(blog.created_at)}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}