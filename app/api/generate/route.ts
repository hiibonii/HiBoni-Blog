import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();
    
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Groq API Key belum dikonfigurasi." }, { status: 500 });
    }

    // Triknya di sini: Kita arahkan library OpenAI ke server Groq
    const groq = new OpenAI({ 
      apiKey: apiKey,
      baseURL: "https://api.groq.com/openai/v1" 
    });

    const prompt = `Tulis sebuah artikel blog profesional dalam format Markdown tentang: "${keyword}".
      
      Gaya Penulisan:
      Bayangkan sebuah film indie dengan sinematografi yang fokus pada detail kecil, suasana "berdebu" tapi hangat.
      1. Narasi Sensorik & Atmosferik: Deskripsikan tekstur (baut, gembok, kabel), aroma (pengap ruko, besi berkarat), dan suara (decit rolling door, deru motor). Show, Don't Tell.
      2. Dialog Otentik: Gunakan "Gue/Lo", Jakarta-sentris, sarkas tapi manis.
      3. Observasi Teknis Detail: Berikan detail mekanis yang dalam (cara kerja genset, radio, editing video).
      4. Psikologis: Kedalaman emosional tanpa cengeng, ada sentuhan trauma atau nostalgia.
      5. Gritty, Technical, and Intimate.
      
      Struktur:
      Gunakan sub-judul ##. Jangan gunakan # untuk judul.
      Panjang minimal 2500 karakter.`;

    const completion = await groq.chat.completions.create({
      // Menggunakan model LLaMA 3 70B yang sangat pintar
      model: "llama-3.3-70b-versatile", 
      messages: [
        { 
          role: "system", 
          content: "Kamu adalah seorang Penulis profesional dengan gaya tulisan yang Gritty, Technical, and Intimate. Sering menggunakan kata ganti gue/lo" 
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      temperature: 0.7,
    });

    const generatedText = completion.choices[0].message.content;

    if (!generatedText) {
      return NextResponse.json({ error: "AI memberikan respon kosong." }, { status: 500 });
    }

    const id = Math.random().toString(36).substring(2, 10).toUpperCase();
    const slug = keyword.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-') || `post-${id}`;
    const date = new Date().toISOString().split('T')[0];

    const markdownContent = `---
id: "${id}"
title: "${keyword}"
slug: "${slug}"
category: "Technology"
img: "https://picsum.photos/seed/${id}/1200/800"
date: "${date}"
---

${generatedText}`;

    return NextResponse.json({ id, slug, content: markdownContent });

  } catch (error: any) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}