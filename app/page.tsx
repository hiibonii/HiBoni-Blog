import { getAllPosts } from '@/lib/posts';
import BlogFilter from '@/components/BlogFilter';
import SubscribeForm from '@/components/SubscribeForm'; // 1. Tambahkan Import ini

// app/page.tsx
export const metadata = {
  metadataBase: new URL('http://localhost:3000'), // Tambahkan ini
  title: "Hi Boni | Jurnal Masa Asbun",
  description: "Eksplorasi Ke-Asbunan dalam sebuah jurnal.",
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="max-w-6xl mx-auto px-6 pt-40 pb-24">
      {/* Header Alboni */}
      <header className="text-center mb-24 space-y-6">
        <h1 className="text-5xl md:text-8xl font-bold text-[#800080] tracking-tighter">
          Hi Boni!
        </h1>
        <p className="text-gray-400 text-sm tracking-[0.2em] uppercase font-medium">
          Asbun Jadi Jurnal
        </p>
      </header>

      {/* Daftar Blog dengan Filter & Search */}
      <BlogFilter allPosts={posts} />

    </main>
  );
}