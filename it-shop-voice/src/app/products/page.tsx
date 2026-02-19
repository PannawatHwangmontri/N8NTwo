"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { products, categories, categoryEmoji } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/products";

const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
);

function StarRating({ rating }: { rating: number }) {
    return (
        <span style={{ display: "flex", gap: 2, alignItems: "center" }}>
            {[1, 2, 3, 4, 5].map(s => <StarIcon key={s} filled={s <= Math.round(rating)} />)}
        </span>
    );
}

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
                height: 150, background: "linear-gradient(135deg,#0f1d35,#1a2a45)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 56, borderRadius: "16px 16px 0 0", position: "relative",
            }}>
                {categoryEmoji[product.category] ?? "📦"}
                {product.badge && (
                    <span style={{
                        position: "absolute", top: 10, left: 10, fontSize: 10, fontWeight: 700,
                        padding: "3px 8px", borderRadius: 6,
                        background: product.badge === "New" ? "linear-gradient(90deg,#2563eb,#06b6d4)"
                            : product.badge === "Hot" ? "linear-gradient(90deg,#ea580c,#f97316)"
                                : product.badge === "Best Seller" ? "linear-gradient(90deg,#7c3aed,#a855f7)"
                                    : "linear-gradient(90deg,#059669,#10b981)",
                        color: "#fff", letterSpacing: "0.03em",
                    }}>{product.badge}</span>
                )}
            </div>
            <div style={{ padding: "14px", display: "flex", flexDirection: "column", flex: 1, gap: 6 }}>
                <span style={{ fontSize: 11, color: "var(--accent-cyan)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {product.brand}
                </span>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4, flex: 1 }}>
                    {product.name}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <StarRating rating={product.rating} />
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>({product.reviews})</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: "var(--accent-blue-light)" }}>
                        ฿{product.price.toLocaleString()}
                    </span>
                    <span className={product.stock > 0 ? "badge-in" : "badge-out"}
                        style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>
                        {product.stock > 0 ? `เหลือ ${product.stock}` : "หมด"}
                    </span>
                </div>
                <button onClick={handleAdd} disabled={product.stock === 0} style={{
                    marginTop: 6, width: "100%", padding: "9px", borderRadius: 10,
                    border: "none", cursor: product.stock === 0 ? "not-allowed" : "pointer",
                    fontWeight: 700, fontSize: 13, transition: "all 0.2s",
                    background: product.stock === 0 ? "rgba(255,255,255,0.05)"
                        : added ? "linear-gradient(135deg,#059669,#10b981)"
                            : "linear-gradient(135deg,#1d4ed8,#2563eb)",
                    color: product.stock === 0 ? "var(--text-muted)" : "#fff",
                }}>
                    {product.stock === 0 ? "สินค้าหมด" : added ? "✓ เพิ่มแล้ว!" : "หยิบใส่ตะกร้า"}
                </button>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "rating">("default");

    let filtered = products.filter((p) => {
        const matchCat = activeCategory === "all" || p.category === activeCategory;
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
            || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

    return (
        <>
            <Navbar />
            <main style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px 80px" }}>

                {/* Page header */}
                <div style={{ marginBottom: 32 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 900, color: "var(--text-primary)", marginBottom: 6 }}>
                        🖥️ สินค้าทั้งหมด
                    </h1>
                    <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
                        อุปกรณ์ IT คุณภาพสูงสำหรับ Gaming, Workstation, และ Everyday Use
                    </p>
                </div>

                {/* Filters row */}
                <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
                    {/* Search */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: 8,
                        background: "var(--bg-card)", border: "1px solid var(--border-subtle)",
                        borderRadius: 12, padding: "10px 14px", flex: "1 1 220px",
                    }}>
                        <span style={{ color: "var(--text-muted)", display: "flex" }}><SearchIcon /></span>
                        <input
                            type="text" placeholder="ค้นหาสินค้า..." value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ background: "none", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 14, width: "100%" }}
                        />
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                        style={{
                            background: "var(--bg-card)", border: "1px solid var(--border-subtle)",
                            borderRadius: 12, padding: "10px 14px", color: "var(--text-primary)",
                            fontSize: 13, cursor: "pointer", outline: "none",
                        }}
                    >
                        <option value="default">เรียงตาม: ค่าเริ่มต้น</option>
                        <option value="price-asc">ราคา: น้อย → มาก</option>
                        <option value="price-desc">ราคา: มาก → น้อย</option>
                        <option value="rating">คะแนนรีวิวสูงสุด</option>
                    </select>
                </div>

                {/* Category pills */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`cat-pill ${activeCategory === cat.id ? "active" : ""}`}
                            style={{
                                display: "flex", alignItems: "center", gap: 6,
                                padding: "7px 16px", borderRadius: 24,
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

                {/* Count */}
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
                    แสดง {filtered.length} รายการ
                </p>

                {/* Grid */}
                {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                        <p>ไม่พบสินค้าที่ตรงกับการค้นหา</p>
                    </div>
                ) : (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                        gap: 18,
                    }}>
                        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
                    </div>
                )}
            </main>
        </>
    );
}
