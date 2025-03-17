import Link from 'next/link';
import { formatDate } from '../lib/utils';

//funkcia na zobrazenie jedného blogového príspevku v zozname príspevkov na hlavnej stránke.
export default function BlogListItem({ blog, currentPage }) {
    const formatCategories = (category) => {
      if (!category) return '';
      return `#${category}`;
    };

    return (
        <div className="break-words">
          <li className="grid grid-cols-1 gap-3 md:col-span-2 mt-4">
            <img src={blog.user.profile_pic} alt="Profile Picture" className="w-full h-[281px] object-cover mb-2" />
            <Link href={`/posts/${blog.id}?page=${currentPage}`} className="font-sans font-semibold tracking-tighter text-primary text-2xl md:text-3xl">
              {blog.title}
            </Link>
            <p className="prose lg:prose-lg italic tracking-tighter text-muted-foreground text-gray-500">{formatDate(blog.created_at)}</p>
            <p className="text-gray-500">{blog.summary}</p>
            <p className="text-sm text-gray-500">{formatCategories(blog.category)}</p>
          </li>
        </div>
      );
    }