import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Folder lo sudah benar menunjuk ke 'content'
const postsDirectory = path.join(process.cwd(), 'content');

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return [];
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    // Di sinilah kita pasang jaring pengaman aslinya (fallback)
    // Kalau data di file .md kosong atau salah ketik, sistem akan otomatis mengisinya
    return {
      slug,
      title: data.title || "Untitled",
      category: data.category || "Uncategorized",
      img: data.img || "/placeholder.jpg", // Pastikan lo punya gambar darurat kalau lupa pasang banner
      id: data.id || Date.now(),
      date: data.date || new Date().toISOString().split('T')[0], 
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Kita beri pengaman juga di halaman detail
    return {
      slug,
      content,
      title: data.title || "Untitled",
      category: data.category || "Uncategorized",
      img: data.img || "/placeholder.jpg",
      date: data.date || "",
    };
  } catch (e) {
    return null;
  }
}