import { getPostBySlug } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';
import CommentSection from "@/components/CommentSection"; // Import default

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return <div className="pt-40 text-center">Artikel tidak ditemukan.</div>;
  }

  return (
    <article className="max-w-3xl mx-auto px-6 pt-40 pb-24">
      <Link href="/" className="text-gray-400 mb-10 inline-block hover:text-[#800080]">
        ← Back to Home
      </Link>
      
      <header className="mb-12">
        <h1 className="text-5xl font-bold text-[#800080] mb-8 leading-tight">
          {post.title}
        </h1>
      </header>

      <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-16 bg-gray-100 shadow-xl">
        <Image src={post.img} alt={post.title} fill priority className="object-cover" />
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 leading-loose">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      
      {/* Perbaikan di sini: gunakan variabel slug yang sudah di-await */}
      <CommentSection postSlug={slug} />
    </article>
  );
}