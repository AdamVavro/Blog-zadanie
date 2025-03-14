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

    const restContent = tempDiv.innerHTML.trim();

    return {
        h1Content,
        restContent,
    };
  };

  const { h1Content, restContent } = extractContent(blog.main_content);

   return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: h1Content }} />
      <img src={blog.featured_image} alt={blog.title} />
      <div dangerouslySetInnerHTML={{ __html: restContent }} />
      <p>Published: {formatDate(blog.created_at)}</p>
      <Link href="/">Home</Link>
      <Link href={`/?page=${page}`}>Back</Link>
    </div>
  );
}