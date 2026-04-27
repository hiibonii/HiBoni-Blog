"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Kita beri toleransi 10px saja agar perubahan terasa cepat
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 inset-x-0 transition-all duration-500 ease-in-out px-6
        /* z-[100] memastikan navbar di atas segalanya */
        z-[100] 
        ${isScrolled 
          ? 'bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-md py-3' 
          : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
  <Link href="/" className="hover:opacity-70 transition-opacity block">
    <Image 
      src="/HiBoni.png" 
      alt="HiBoni Logo" 
      width={32}  // Ukuran width dalam pixel (setara w-8 di Tailwind)
      height={32} // Ukuran height dalam pixel (setara h-8 di Tailwind)
      className="object-contain" // Memastikan gambar tidak terpotong
      priority // Wajib untuk logo navbar agar dirender paling pertama
    />
  </Link>
        
        <div className="flex gap-8 items-center">
          <Link href="/about" className="hover:text-[#800080] transition-colors">
  About
</Link>
          
        </div>
      </div>
    </nav>
  );
}