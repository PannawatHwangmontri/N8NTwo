"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { products, categories, categoryEmoji, Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";

// ─── Icons ────────────────────────────────────────────────────────────────────
const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ display: "flex", gap: 2, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} filled={s <= Math.round(rating)} />)}
    </span>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (product.stock === 0) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card" style={{ display: "flex", flexDirection: "column" }}>
      <div style={{
        height: 160, background: "linear-gradient(135deg,#0f1d35,#1a2a45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 64, borderRadius: "16px 16px 0 0", position: "relative",
      }}>
        {categoryEmoji[product.category] ?? "📦"}
        {product.badge && (
          <span style={{
            position: "absolute", top: 12, left: 12,
            fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
            background: product.badge === "New" ? "linear-gradient(90deg,#2563eb,#06b6d4)"
              : product.badge === "Hot" ? "linear-gradient(90deg,#ea580c,#f97316)"
                : product.badge === "Best Seller" ? "linear-gradient(90deg,#7c3aed,#a855f7)"
                  : "linear-gradient(90deg,#059669,#10b981)",
            color: "#fff", letterSpacing: "0.03em",
          }}>{product.badge}</span>
        )}
      </div>
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", flex: 1, gap: 8 }}>
        <span style={{ fontSize: 11, color: "var(--accent-cyan)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {product.brand}
        </span>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4, flex: 1 }}>
          {product.name}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <StarRating rating={product.rating} />
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>({product.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: "var(--accent-blue-light)" }}>
            ฿{product.price.toLocaleString()}
          </span>
          <span className={product.stock > 0 ? "badge-in" : "badge-out"}
            style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>
            {product.stock > 0 ? `เหลือ ${product.stock}` : "หมด"}
          </span>
        </div>
        <button onClick={handleAdd} disabled={product.stock === 0} style={{
          marginTop: 8, width: "100%", padding: "10px", borderRadius: 10,
          border: "none", cursor: product.stock === 0 ? "not-allowed" : "pointer",
          fontWeight: 700, fontSize: 13, transition: "all 0.2s",
          background: product.stock === 0 ? "rgba(255,255,255,0.05)"
            : added ? "linear-gradient(135deg,#059669,#10b981)"
              : "linear-gradient(135deg,#1d4ed8,#2563eb)",
          color: product.stock === 0 ? "var(--text-muted)" : "#fff",
          letterSpacing: "0.02em",
        }}>
          {product.stock === 0 ? "สินค้าหมด" : added ? "✓ เพิ่มแล้ว!" : "หยิบใส่ตะกร้า"}
        </button>
      </div>
    </div>
  );
}

// ─── Voice Modal ──────────────────────────────────────────────────────────────
function VoiceModal({ isOpen, onClose, isListening, isLoading, text, answer, onToggle }: {
  isOpen: boolean; onClose: () => void; isListening: boolean;
  isLoading: boolean; text: string; answer: string; onToggle: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div onClick={(e) => e.stopPropagation()} className="animate-fadeInUp" style={{
        width: "100%", maxWidth: 480,
        background: "linear-gradient(145deg,#0f1d35,#111827)",
        border: "1px solid rgba(37,99,235,0.35)", borderRadius: 24, padding: 32,
        boxShadow: "0 0 60px rgba(37,99,235,0.2), 0 40px 80px rgba(0,0,0,0.6)",
        position: "relative",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          background: "rgba(255,255,255,0.07)", border: "none",
          borderRadius: 8, padding: "6px 8px", cursor: "pointer",
          color: "var(--text-secondary)", display: "flex",
        }}><CloseIcon /></button>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)",
            padding: "6px 14px", borderRadius: 20, marginBottom: 12,
          }}>
            <span style={{ fontSize: 12, color: "var(--accent-cyan)", fontWeight: 600 }}>🎙️ AI VOICE SEARCH</span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>ค้นหาด้วยเสียง</h2>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>พูดชื่อสินค้าที่ต้องการ เช่น "SSD 1TB" หรือ "RAM DDR5"</p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <button onClick={onToggle}
            className={isListening ? "voice-btn-listening" : "voice-btn-idle"}
            style={{
              width: 96, height: 96, borderRadius: "50%", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: isListening ? "linear-gradient(135deg,#dc2626,#ef4444)" : "linear-gradient(135deg,#1d4ed8,#2563eb)",
              color: "#fff", transition: "all 0.3s ease",
            }}>
            {isListening ? <span style={{ fontSize: 32 }}>⏹</span> : <MicIcon />}
          </button>
        </div>

        <p style={{
          textAlign: "center", fontSize: 13, fontWeight: 600,
          color: isListening ? "#f87171" : "var(--text-muted)",
          marginBottom: 20, letterSpacing: "0.04em", textTransform: "uppercase",
        }}>
          {isListening ? "● กำลังฟัง..." : "กดปุ่มเพื่อพูด"}
        </p>

        <div style={{
          background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-subtle)",
          borderRadius: 12, padding: "14px 16px", marginBottom: 14, minHeight: 56,
        }}>
          <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>สิ่งที่คุณพูด</p>
          <p style={{ fontSize: 15, fontWeight: 500, color: text ? "var(--text-primary)" : "var(--text-muted)" }}>{text || "..."}</p>
        </div>

        <div style={{
          background: answer ? "rgba(37,99,235,0.07)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${answer ? "rgba(37,99,235,0.3)" : "var(--border-subtle)"}`,
          borderRadius: 12, padding: "14px 16px", minHeight: 64, transition: "all 0.3s ease",
        }}>
          <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>คำตอบจาก AI</p>
          {isLoading ? (
            <div style={{ display: "flex", gap: 6, alignItems: "center", paddingTop: 4 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} className="dot-bounce" style={{
                  width: 8, height: 8, borderRadius: "50%", background: "var(--accent-blue-light)",
                  display: "inline-block", animationDelay: `${i * 0.15}s`,
                }} />
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 14, fontWeight: 500, color: answer ? "var(--text-primary)" : "var(--text-muted)", whiteSpace: "pre-line", lineHeight: 1.6 }}>
              {answer || "รอฟังคำสั่งซื้อสินค้าของคุณ..."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "th-TH";
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
          if (event.results[i].isFinal) handleVoiceCommand(transcript);
        }
        setText(transcript);
      };
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const handleVoiceCommand = async (transcript: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://pannawathwangmontri05.app.n8n.cloud/webhook/it-shop-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript,
          products: products.map(({ id, name, price, stock, category, brand }) => ({
            id, name, price, stock, category, brand,
          })),
        }),
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch {
      setAnswer("ไม่สามารถเชื่อมต่อกับระบบได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setAnswer(""); setText("");
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const openVoiceModal = () => {
    setAnswer(""); setText("");
    setVoiceModalOpen(true);
  };

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
      || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Navbar onVoiceOpen={openVoiceModal} />

      <main style={{ padding: "0 24px 60px", maxWidth: 1280, margin: "0 auto" }}>

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section style={{ textAlign: "center", padding: "64px 16px 48px", position: "relative" }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600, height: 300,
            background: "radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.25)",
            padding: "6px 16px", borderRadius: 20, marginBottom: 20,
          }}>
            <span style={{ fontSize: 12, color: "var(--accent-cyan)", fontWeight: 700, letterSpacing: "0.06em" }}>
              🎙️ VOICE-POWERED AI SEARCH
            </span>
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, lineHeight: 1.2,
            color: "var(--text-primary)", marginBottom: 14, letterSpacing: "-0.03em",
          }}>
            อุปกรณ์ IT ที่ใช่<br />
            <span style={{ background: "linear-gradient(90deg,#2563eb,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ค้นหาง่ายด้วยเสียง
            </span>
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-muted)", maxWidth: 500, margin: "0 auto 32px" }}>
            พูดชื่อสินค้าที่ต้องการ — AI จะค้นหาและแนะนำสินค้าที่เหมาะสมให้คุณทันที
          </p>

          {/* Search bar */}
          <div style={{
            display: "flex", gap: 0, maxWidth: 560, margin: "0 auto",
            background: "var(--bg-card)", border: "1px solid var(--border-subtle)",
            borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
          }}>
            <div style={{ padding: "14px 14px 14px 18px", color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
              <SearchIcon />
            </div>
            <input
              type="text" placeholder="ค้นหาสินค้า เช่น SSD, RAM, Mouse..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 15, color: "var(--text-primary)", padding: "14px 0" }}
            />
            <button onClick={openVoiceModal} style={{
              padding: "14px 20px", background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
              border: "none", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center",
            }}><MicIcon /></button>
          </div>
        </section>

        {/* ── Quick links ─────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 40, flexWrap: "wrap" }}>
          {[
            { href: "/promotions", label: "🔥 ดูโปรโมชั่น", style: "linear-gradient(135deg,#ea580c,#f97316)" },
            { href: "/products", label: "🖥️ สินค้าทั้งหมด", style: "linear-gradient(135deg,#7c3aed,#a855f7)" },
            { href: "/cart", label: "🛒 ตะกร้าสินค้า", style: "linear-gradient(135deg,#059669,#10b981)" },
          ].map((q) => (
            <Link key={q.href} href={q.href} style={{
              padding: "10px 22px", borderRadius: 12,
              background: q.style, color: "#fff",
              fontWeight: 700, fontSize: 14, textDecoration: "none",
              boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
              transition: "opacity 0.2s",
            }}>{q.label}</Link>
          ))}
        </div>

        {/* ── Category Filter ──────────────────────────────────────── */}
        <section style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`cat-pill ${activeCategory === cat.id ? "active" : ""}`}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 18px", borderRadius: 24,
                  background: activeCategory === cat.id ? "var(--accent-blue)" : "var(--bg-card)",
                  color: activeCategory === cat.id ? "#fff" : "var(--text-secondary)",
                  border: `1px solid ${activeCategory === cat.id ? "var(--accent-blue)" : "var(--border-subtle)"}`,
                  fontWeight: 600, fontSize: 13, cursor: "pointer",
                }}
              >
                <span>{cat.icon}</span><span>{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Section header ───────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)" }}>
            สินค้าแนะนำ
            <span style={{ fontSize: 14, fontWeight: 400, color: "var(--text-muted)", marginLeft: 8 }}>
              ({filtered.length} รายการ)
            </span>
          </h2>
          <Link href="/products" style={{ fontSize: 13, color: "var(--accent-blue-light)", textDecoration: "none", fontWeight: 600 }}>
            ดูทั้งหมด →
          </Link>
        </div>

        {/* ── Product Grid ─────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 16 }}>ไม่พบสินค้าที่ตรงกับการค้นหา</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </main>

      {/* ── Floating Voice FAB ───────────────────────────────────────── */}
      <button onClick={openVoiceModal} className="voice-btn-idle animate-float"
        title="เปิด Voice Search"
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 30,
          width: 64, height: 64, borderRadius: "50%",
          background: "linear-gradient(135deg,#1d4ed8,#06b6d4)",
          border: "none", cursor: "pointer", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 30px rgba(37,99,235,0.4)",
        }}
      ><MicIcon /></button>

      {/* ── Voice Modal ──────────────────────────────────────────────── */}
      <VoiceModal
        isOpen={voiceModalOpen}
        onClose={() => { setVoiceModalOpen(false); recognitionRef.current?.stop(); }}
        isListening={isListening}
        isLoading={isLoading}
        text={text}
        answer={answer}
        onToggle={toggleListening}
      />
    </>
  );
}