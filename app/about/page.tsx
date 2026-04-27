import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: "About | Hi Boni",
  description: "Realita yang pengen gue catet tapi nggak cocok masuk ke format cerita.",
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 pt-40 pb-24">
      {/* Header Section */}
      <section className="mb-20">
        <h1 className="text-5xl md:text-7xl font-bold text-[#800080] tracking-tighter mb-8">
          The Story <br />Behind Everything...
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
          Gue udah punya tempat sendiri buat nulis cerita fiksi atau narasi panjang—biasanya
          gue taro semua di Kaskus. Tapi, hidup kan nggak cuma soal cerita orang.
          Kadang ada hal-hal realita yang pengen gue catet tapi nggak cocok masuk ke format "cerita".
        </p>
        <br></br>
        <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
          Di sini nggak ada struktur yang kaku. Kadang bisa aja gue nulis teknis banget, kadang cuma satu paragraf singkat yang nggak penting-penting amat.</p><br></br>
        <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">  
          Blog ini ibarat buku catatan yang biasanya gue simpen di laci, tapi sekarang gue biarin kebuka buat siapa aja yang pengen baca.
          Nggak ada tekanan buat jadi inspiratif atau edukatif, yang penting gue seneng aja nulisnya.</p><br></br>
        <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">Make yourself at home. Kalau ada yang menarik, silakan baca. Kalau nggak, ya... mungkin lo bakal nemu yang lebih seru di thread Kaskus gue.
          <br></br><br></br>Cheers!
        </p>
      </section>
      

      {/* Call to Action / Contact */}
      <section className="border-t border-gray-100 pt-20 text-center">
        <h3 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-8">Let&apos;s Connect</h3>
        <div className="flex justify-center gap-8 text-[#800080] font-bold">
          <a href="#" className="hover:underline">LinkedIn</a>
          <a href="#" className="hover:underline">Instagram</a>
          <a href="#" className="hover:underline">Email</a>
        </div>
      </section>
    </main>
  );
}