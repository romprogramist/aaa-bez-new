"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Document = {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
};

export default function AdminDocuments() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchDocs = () => {
    fetch("/api/documents")
      .then((r) => r.json())
      .then(setDocs);
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);

    // 1. Upload file
    const formData = new FormData();
    formData.append("file", file);
    const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
    const { path } = await uploadRes.json();

    // 2. Create document entry
    await fetch("/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, image: path }),
    });

    setTitle("");
    setDescription("");
    setFile(null);
    setUploading(false);
    fetchDocs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить документ?")) return;
    await fetch(`/api/documents?id=${id}`, { method: "DELETE" });
    fetchDocs();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-3xl font-bold">Управление документами</h1>
          <div className="flex gap-4">
            <a
              href="/admin/partners"
              className="text-white/40 text-sm hover:text-white transition-colors"
            >
              Партнёры
            </a>
            <a
              href="/admin/assortment"
              className="text-white/40 text-sm hover:text-white transition-colors"
            >
              Ассортимент
            </a>
          </div>
        </div>

        {/* Upload form */}
        <form
          onSubmit={handleUpload}
          className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 mb-10"
        >
          <h2 className="text-white text-lg font-semibold mb-6">Добавить документ</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-white/50 text-sm block mb-2">Название</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Сертификат..."
                className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#f5d100] transition-colors"
                required
              />
            </div>
            <div>
              <label className="text-white/50 text-sm block mb-2">Описание</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Краткое описание..."
                className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#f5d100] transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-white/50 text-sm block mb-2">Файл (изображение)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-3 text-white/60 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-[#f5d100] file:text-[#1a0c0a] file:px-4 file:py-2 file:text-sm file:font-semibold file:cursor-pointer"
              required
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="px-8 py-3 rounded-lg text-sm font-semibold cursor-pointer disabled:opacity-50 transition-all hover:shadow-[0_4px_20px_rgba(245,209,0,0.3)]"
            style={{ backgroundColor: "#f5d100", color: "#1a0c0a" }}
          >
            {uploading ? "Загрузка..." : "Добавить"}
          </button>
        </form>

        {/* Document list */}
        <h2 className="text-white text-lg font-semibold mb-4">
          Текущие документы ({docs.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden group"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={doc.image}
                  alt={doc.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white text-sm font-medium">{doc.title}</h3>
                  {doc.description && (
                    <p className="text-white/30 text-xs mt-0.5">{doc.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer text-lg"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
