import { getBlogs } from '../lib/api';
import Link from 'next/link';
import { formatDate } from '../lib/utils';

//Načíta dáta z API, vráti objekt s props, ktoré budú poslané do komponentu Home
export async function getStaticProps() {
  const blogs = await getBlogs();

  // zmena formátu dátumu a zoradenie článkov podľa dátumu publikovania (created_at)
  const sortedBlogs = blogs.sort((a, b) => {
     return new Date(formatDate(b.created_at)) - new Date(formatDate(a.created_at));
  });

  return {
    props: {
      blogs: sortedBlogs,
    },
    //revalidate: 10, // Voliteľné: revalidácia dát každých 10 sekúnd
  };
}

//Prijíma props blogs a vytvára odkaz na detail článku
export default function Home({ blogs }) {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/posts/${blog.id}`}>
            {blog.title} ({formatDate(blog.created_at)})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}