import { MetadataRoute } from 'next';

// Masukkan data post kamu di sini (atau import jika sudah dipisah ke file tersendiri)
const ALL_POSTS = [
  { slug: "arbitrary-arrest", lastMod: '2026-04-26' },
  { slug: "freedom", lastMod: '2026-04-26' },
  { slug: "the-art", lastMod: '2026-04-26' },
  { slug: "modern", lastMod: '2026-04-26' },
  { slug: "minimalist", lastMod: '2026-04-26' },
  { slug: "building-scalable", lastMod: '2026-04-26' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alboni.com'; // Ganti dengan domain asli kamu nanti

  // 1. Link untuk halaman utama
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  // 2. Link otomatis untuk semua detail blog
  const blogPosts = ALL_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastMod || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...blogPosts];
}