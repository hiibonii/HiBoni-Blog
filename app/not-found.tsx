"use client"; // Wajib pakai ini karena kita menggunakan interaksi kursor/browser

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white text-black selection:bg-purple-200">
      
      {/* Area Interaktif */}
      <div className="flex space-x-4 md:space-x-8 cursor-grab active:cursor-grabbing z-10">
        <motion.h1 
          drag 
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.7} // Seberapa jauh bisa ditarik melampaui batas
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="text-8xl md:text-[12rem] font-bold text-gray-900 hover:text-purple-600 transition-colors duration-300"
        >
          4
        </motion.h1>
        
        <motion.h1 
          drag 
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.7}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="text-8xl md:text-[12rem] font-bold text-gray-900 hover:text-purple-600 transition-colors duration-300"
        >
          0
        </motion.h1>
        
        <motion.h1 
          drag 
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.7}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="text-8xl md:text-[12rem] font-bold text-gray-900 hover:text-purple-600 transition-colors duration-300"
        >
          4
        </motion.h1>
      </div>

      {/* Teks Minimalis */}
      <div className="mt-8 text-center z-0">
        <p className="text-lg text-gray-500 uppercase tracking-widest font-medium mb-6">
          Halaman tidak ditemukan
        </p>
        <Link 
          href="/" 
          className="px-6 py-3 border border-gray-200 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all rounded-full"
        >
          Kembali ke Beranda
        </Link>
      </div>
      
    </div>
  );
}