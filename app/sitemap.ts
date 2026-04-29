import { MetadataRoute } from 'next';
// Import fungsi untuk mengambil semua artikel dari file konfigurasi lo
import { getAllPosts } from '@/lib/posts'; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alboni.com'; // Pastikan domain ini benar saat live

  // Ambil semua data artikel secara dinamis
  const allPosts = getAllPosts();

  // 1. Link untuk halaman utama
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // 2. Link otomatis untuk semua detail blog
  const blogPosts: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    // Pastikan field tanggal di data lo bernama 'date' atau sesuaikan dengan properti yang ada
    lastModified: new Date(post.date || new Date()), 
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Gabungkan semua rute
  return [...routes, ...blogPosts];
}