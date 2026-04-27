"use client";
import { useState } from 'react';

export default function SubscribeForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
    setEmail("");
    // Tutup modal otomatis setelah 2 detik jika sukses
    setTimeout(() => {
      setIsOpen(false);
      setStatus("idle");
    }, 2500);
  };

  return (
    <>
      {/* Tombol Pemicu (Bisa diletakkan di mana saja) */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#800080] hover:opacity-50 transition-all cursor-pointer"
      >
        Subscribe to Journal
      </button>

      {/* Overlay & Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6">
          {/* Backdrop (Latar belakang gelap transparan) */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Konten Modal */}
          <div className="relative bg-white w-full max-w-lg p-12 md:p-20 rounded-[3rem] shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Tombol Close */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-10 text-gray-300 hover:text-black text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              Close
            </button>

            {status === "success" ? (
              <div className="text-center py-10">
                <p className="text-[#800080] font-bold italic text-lg leading-relaxed">
                  Welcome to the circle. <br /> You&apos;re now subscribed.
                </p>
              </div>
            ) : (
              <div className="space-y-10">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-[#800080] tracking-tighter">Stay Inspired.</h2>
                  <p className="text-gray-400 text-sm">Dapatkan update visual mingguan langsung di inbox kamu.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex items-center border-b border-gray-100 focus-within:border-[#800080] transition-all">
                  <input
                    type="email"
                    required
                    placeholder="yourname@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent py-4 px-2 text-sm focus:outline-none text-gray-600 placeholder:text-gray-200"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="py-4 px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#800080] cursor-pointer"
                  >
                    {status === "loading" ? "..." : "Join"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}