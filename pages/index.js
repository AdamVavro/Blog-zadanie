import { getBlogs } from '../lib/api';
import Link from 'next/link';

//Načíta dáta z API, vráti objekt s props, ktoré budú poslané do komponentu Home
export async function getStaticProps() {
  const blogs = await getBlogs();
  return {
    props: {
      blogs,
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
            <Link href={`/posts/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}