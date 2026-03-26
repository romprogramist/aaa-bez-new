"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Partner = {
  id: string;
  name: string;
  description: string | null;
  logo: string;
  order: number;
};

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchPartners = () => {
    fetch("/api/partners")
      .then((r) => r.json())
      .then(setPartners);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) return;

    setUploading(true);

    // 1. Upload logo
    const formData = new FormData();
    formData.append("file", file);
    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const { path } = await uploadRes.json();

    // 2. Create partner entry
    await fetch("/api/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, logo: path }),
    });

    setName("");
    setDescription("");
    setFile(null);
    setUploading(false);
    fetchPartners();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить партнёра?")) return;
    await fetch(`/api/partners?id=${id}`, { method: "DELETE" });
    fetchPartners();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-3xl font-bold">
            Управление партнёрами
          </h1>
          <div className="flex gap-4">
            <a
              href="/admin/assortment"
              className="text-white/40 text-sm hover:text-white transition-colors"
            >
              Ассортимент
            </a>
            <a
              href="/admin/documents"
              className="text-white/40 text-sm hover:text-white transition-colors"
            >
              Документы
            </a>
          </div>
        </div>

        {/* Upload form */}
        <form
          onSubmit={handleUpload}
          className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 mb-10"
        >
          <h2 className="text-white text-lg font-semibold mb-6">
            Добавить партнёра
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-white/50 text-sm block mb-2">
                Название <span className="text-[#f5d100]">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Название компании..."
                className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#f5d100] transition-colors"
                required
              />
            </div>
            <div>
              <label className="text-white/50 text-sm block mb-2">
                Описание
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Краткое описание деятельности..."
                className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#f5d100] transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-white/50 text-sm block mb-2">
              Логотип <span className="text-[#f5d100]">*</span>
            </label>
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

        {/* Partner list */}
        <h2 className="text-white text-lg font-semibold mb-4">
          Текущие партнёры ({partners.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map((p) => (
            <div
              key={p.id}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 group"
            >
              <div className="relative h-16 mb-4">
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-white text-sm font-medium">{p.name}</h3>
                  {p.description && (
                    <p className="text-white/30 text-xs mt-1 line-clamp-2">
                      {p.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer text-lg flex-shrink-0"
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
