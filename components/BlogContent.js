import { formatDate } from '../lib/utils';

//vytvorí obsah detailu článku
export default function BlogContent({ blog }) {
  const extractContent = (content) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    const h1 = tempDiv.querySelector('h1');
    const h1Content = h1 ? h1.outerHTML : '';

    if (h1) h1.remove();

    let restContent = tempDiv.innerHTML.trim();
    restContent = restContent.replace(/<p>/g, '<p class="my-6 text-[#D1D5DB] tracking-tighter lg:prose-xl">');

    return { h1Content, restContent };
  };

  const { h1Content, restContent } = extractContent(blog.main_content);

  return (
    <div className="blog-content mx-auto">
      <h1 className="text-4xl md:text-4xl font-bold tracking-tighter leading-tight mb-8 text-white">
        <div dangerouslySetInnerHTML={{ __html: h1Content }} />
      </h1>
      <img src={blog.featured_image} alt={blog.title} className="mb-10" />
      <div dangerouslySetInnerHTML={{ __html: restContent }} />
      <p className="prose lg:prose-lg italic tracking-tighter text-muted-foreground text-gray-500 my-10">{formatDate(blog.created_at)}</p>
    </div>
  );
}