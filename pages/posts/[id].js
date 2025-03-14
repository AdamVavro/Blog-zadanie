import { getBlog } from '../../lib/api';
import { formatDate } from '../../lib/utils';
import Link from 'next/link';

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
  //console.log('Blog prop:', blog);

  if (!blog) {
    return <div>Blog not found</div>;
  }

   return (
    <div>
      <h1>{blog.title}</h1>
      <p>Published: {formatDate(blog.created_at)}</p>
      <div dangerouslySetInnerHTML={{ __html: blog.main_content }} />
      <Link href="/">Home</Link>
    </div>
  );
}