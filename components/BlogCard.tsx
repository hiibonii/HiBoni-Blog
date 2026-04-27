import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import ini

export default function BlogCard({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block cursor-pointer">
      <article>
        {/* Container harus memiliki class 'relative' agar 'fill' bekerja */}
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-gray-100">
          <Image 
            src={post.img} 
            alt={post.title}
            fill // Engine akan otomatis menyesuaikan ukuran dengan container
            sizes="(max-width: 768px) 100vw, 33vw" // Memberi tahu browser ukuran yang pas
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
          />
        </div>
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            {post.category}
          </span>
          <h2 className="text-xl font-bold text-[#800080] leading-tight group-hover:underline decoration-1 underline-offset-4">
            {post.title}
          </h2>
          <p className="text-gray-500 mt-2 line-clamp-2">
  {/* Gunakan fallback string kosong kalau description kebetulan belum diisi */}
  {post.description || "Klik untuk membaca selengkapnya..."}
</p>
        </div>
      </article>
    </Link>
  );
}