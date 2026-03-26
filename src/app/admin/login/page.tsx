"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    if (res.ok) {
      router.push("/admin/partners");
    } else {
      setError("Неверный логин или пароль");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1
            className="text-white text-3xl font-bold uppercase tracking-tight"
            style={{ fontFamily: "'Neutral Face', sans-serif" }}
          >
            Админ-панель
          </h1>
          <p className="text-white/40 text-sm mt-2">
            Введите данные для входа
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8"
        >
          <div className="mb-5">
            <label className="text-white/50 text-sm block mb-2">Логин</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Логин..."
              className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#f5d100] transition-colors"
              required
              autoFocus
            />
          </div>

          <div className="mb-6">
            <label className="text-white/50 text-sm block mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль..."
              className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#f5d100] transition-colors"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-sm font-semibold cursor-pointer disabled:opacity-50 transition-all hover:shadow-[0_4px_20px_rgba(245,209,0,0.3)]"
            style={{ backgroundColor: "#f5d100", color: "#1a0c0a" }}
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
