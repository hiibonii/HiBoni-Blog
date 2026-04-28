"use client";

import { useState, useEffect } from "react";
import { auth, db, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

export default function CommentSection({ postSlug }: { postSlug: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);

  // Monitor status login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  // Ambil komentar secara real-time berdasarkan slug artikel
  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("postSlug", "==", postSlug),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [postSlug]);

  const handleLogin = async () => {
    try { await signInWithPopup(auth, googleProvider); } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;

    await addDoc(collection(db, "comments"), {
      postSlug,
      text: comment,
      userName: user.displayName,
      userImage: user.photoURL,
      createdAt: serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="mt-16 border-t border-gray-100 pt-10 max-w-2xl mx-auto font-poppins">
      <h3 className="text-xl font-semibold mb-6">Diskusi</h3>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tulis pendapatmu..."
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all text-sm"
            rows={3}
          />
          <div className="flex justify-between items-center mt-3">
             <span className="text-xs text-gray-500">Login sebagai {user.displayName}</span>
             <button type="submit" className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all">
               Kirim
             </button>
          </div>
        </form>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-2xl mb-8">
          <p className="text-sm text-gray-600 mb-4">Ingin ikut berdiskusi?</p>
          <button onClick={handleLogin} className="border border-gray-300 px-6 py-2 rounded-full text-sm font-medium hover:bg-white transition-all">
            Login dengan Google
          </button>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="flex space-x-4">
            <img src={c.userImage} alt={c.userName} className="w-10 h-10 rounded-full bg-gray-100" />
            <div>
              <p className="text-sm font-semibold">{c.userName}</p>
              <p className="text-sm text-gray-700 mt-1">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}