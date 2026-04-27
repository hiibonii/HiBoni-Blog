"use client";

import React, { useState } from 'react';

const StudioPage = () => {
  const [keyword, setKeyword] = useState("");
  const [generatedFiles, setGeneratedFiles] = useState<any[]>([]);

  const handleGenerate = async () => {
    if (!keyword) return;
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ keyword }),
    });
    const data = await res.json();
if (data.content) {
  setGeneratedFiles([data, ...generatedFiles]);
} else {
  alert("Gagal: " + (data.error || "Konten kosong"));
}
  };

  const downloadFile = (file: any) => {
    const blob = new Blob([file.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.slug}.md`;
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto pt-40 px-6 min-h-screen">
      <h1 className="text-4xl font-bold text-[#800080] mb-8">Content Studio</h1>
      <div className="flex gap-4 mb-10">
        <input 
          className="flex-1 border-b border-gray-200 py-2 outline-none focus:border-[#800080]"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword..."
        />
        <button onClick={handleGenerate} className="bg-[#800080] text-white px-6 py-2 rounded-full text-xs font-bold uppercase">
          Generate
        </button>
      </div>

      <div className="space-y-4">
        {generatedFiles.map((file, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-xl flex justify-between">
            <span>{file.slug}.md</span>
            <button onClick={() => downloadFile(file)} className="text-[#800080] font-bold text-xs uppercase">Download</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudioPage;

const downloadFile = (file: any) => {
  // Validasi: Jangan download jika konten kosong
  if (!file || !file.content) {
    alert("Konten artikel kosong, coba generate ulang.");
    return;
  }

  const blob = new Blob([file.content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  // Pastikan nama file ada, jika tidak gunakan fallback 'artikel-studio.md'
  const fileName = file.slug ? `${file.slug}.md` : `article-${Date.now()}.md`;
  
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  
  // Bersihkan memory
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};