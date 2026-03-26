"use client";

import { useEffect, useState } from "react";

type Customer = {
  id: string;
  name: string;
  order: number;
};

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [name, setName] = useState("");
  const [adding, setAdding] = useState(false);

  const fetchCustomers = () => {
    fetch("/api/customers")
      .then((r) => r.json())
      .then(setCustomers);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setAdding(true);

    await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setName("");
    setAdding(false);
    fetchCustomers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить заказчика?")) return;
    await fetch(`/api/customers?id=${id}`, { method: "DELETE" });
    fetchCustomers();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-3xl font-bold">
            Управление заказчиками
          </h1>
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
            <a
              href="/admin/documents"
              className="text-white/40 text-sm hover:text-white transition-colors"
            >
              Документы
            </a>
          </div>
        </div>

        {/* Add form */}
        <form
          onSubmit={handleAdd}
          className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 mb-10"
        >
          <h2 className="text-white text-lg font-semibold mb-6">
            Добавить заказчика
          </h2>

          <div className="mb-6">
            <label className="text-white/50 text-sm block mb-2">
              Название компании <span className="text-[#f5d100]">*</span>
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

          <button
            type="submit"
            disabled={adding}
            className="px-8 py-3 rounded-lg text-sm font-semibold cursor-pointer disabled:opacity-50 transition-all hover:shadow-[0_4px_20px_rgba(245,209,0,0.3)]"
            style={{ backgroundColor: "#f5d100", color: "#1a0c0a" }}
          >
            {adding ? "Добавление..." : "Добавить"}
          </button>
        </form>

        {/* Customer list */}
        <h2 className="text-white text-lg font-semibold mb-4">
          Текущие заказчики ({customers.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map((c) => (
            <div
              key={c.id}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 group"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-white text-sm font-medium">{c.name}</h3>
                <button
                  onClick={() => handleDelete(c.id)}
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
