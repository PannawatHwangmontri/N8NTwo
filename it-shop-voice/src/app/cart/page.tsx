"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { categoryEmoji } from "@/lib/products";
import { useState } from "react";

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
);

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
    const [orderPlaced, setOrderPlaced] = useState(false);

    if (orderPlaced) {
        return (
            <>
                <Navbar />
                <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                    <div className="animate-fadeInUp" style={{
                        textAlign: "center", maxWidth: 480,
                        background: "var(--bg-card)", border: "1px solid rgba(16,185,129,0.3)",
                        borderRadius: 24, padding: "48px 32px",
                        boxShadow: "0 0 40px rgba(16,185,129,0.1)",
                    }}>
                        <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                        <h2 style={{ fontSize: 26, fontWeight: 900, color: "var(--text-primary)", marginBottom: 8 }}>สั่งซื้อสำเร็จ!</h2>
                        <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>
                            ขอบคุณที่ซื้อสินค้ากับ TechVault ทีมงานจะดำเนินการจัดส่งให้คุณโดยเร็ว
                        </p>
                        <Link href="/" style={{
                            display: "inline-block",
                            background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
                            color: "#fff", borderRadius: 12, padding: "12px 28px",
                            fontWeight: 700, fontSize: 14, textDecoration: "none",
                        }}>กลับหน้าแรก</Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                    <div>
                        <h1 style={{ fontSize: 28, fontWeight: 900, color: "var(--text-primary)", marginBottom: 4 }}>
                            🛒 ตะกร้าสินค้า
                        </h1>
                        <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
                            {totalItems > 0 ? `${totalItems} รายการในตะกร้า` : "ยังไม่มีสินค้าในตะกร้า"}
                        </p>
                    </div>
                    {items.length > 0 && (
                        <button onClick={clearCart} style={{
                            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
                            color: "#f87171", borderRadius: 10, padding: "8px 16px",
                            cursor: "pointer", fontSize: 13, fontWeight: 600,
                        }}>ล้างตะกร้า</button>
                    )}
                </div>

                {items.length === 0 ? (
                    /* Empty state */
                    <div style={{
                        textAlign: "center", padding: "80px 0",
                        background: "var(--bg-card)", border: "1px solid var(--border-subtle)",
                        borderRadius: 20,
                    }}>
                        <div style={{ fontSize: 64, marginBottom: 16, opacity: 0.5 }}>🛒</div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>ตะกร้าว่างเปล่า</h3>
                        <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>ยังไม่มีสินค้าในตะกร้าของคุณ</p>
                        <Link href="/products" style={{
                            background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
                            color: "#fff", borderRadius: 12, padding: "12px 28px",
                            fontWeight: 700, fontSize: 14, textDecoration: "none", display: "inline-block",
                        }}>เลือกซื้อสินค้า</Link>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
                        {/* Items list */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {items.map((item) => (
                                <div key={item.product.id} className="product-card animate-fadeInUp" style={{
                                    display: "flex", alignItems: "center", gap: 16, padding: 16,
                                }}>
                                    {/* Emoji thumbnail */}
                                    <div style={{
                                        width: 72, height: 72, flexShrink: 0,
                                        background: "linear-gradient(135deg,#0f1d35,#1a2a45)",
                                        borderRadius: 12, display: "flex", alignItems: "center",
                                        justifyContent: "center", fontSize: 32,
                                    }}>
                                        {categoryEmoji[item.product.category] ?? "📦"}
                                    </div>

                                    {/* Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: 11, color: "var(--accent-cyan)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>
                                            {item.product.brand}
                                        </p>
                                        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {item.product.name}
                                        </p>
                                        <p style={{ fontSize: 18, fontWeight: 800, color: "var(--accent-blue-light)" }}>
                                            ฿{(item.product.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>

                                    {/* Quantity controls */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 0, background: "rgba(255,255,255,0.05)", borderRadius: 10, overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            style={{ width: 36, height: 36, background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}
                                        >−</button>
                                        <span style={{ width: 32, textAlign: "center", fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            disabled={item.quantity >= item.product.stock}
                                            style={{ width: 36, height: 36, background: "none", border: "none", color: item.quantity >= item.product.stock ? "var(--text-muted)" : "var(--text-primary)", cursor: item.quantity >= item.product.stock ? "not-allowed" : "pointer", fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}
                                        >+</button>
                                    </div>

                                    {/* Remove */}
                                    <button
                                        onClick={() => removeFromCart(item.product.id)}
                                        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "8px", cursor: "pointer", color: "#f87171", display: "flex" }}
                                    ><TrashIcon /></button>
                                </div>
                            ))}
                        </div>

                        {/* Order summary */}
                        <div style={{
                            background: "var(--bg-card)", border: "1px solid var(--border-subtle)",
                            borderRadius: 20, padding: 24, position: "sticky", top: 80,
                        }}>
                            <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", marginBottom: 20 }}>สรุปคำสั่งซื้อ</h2>

                            {items.map((item) => (
                                <div key={item.product.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                                    <span style={{ fontSize: 13, color: "var(--text-secondary)", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {item.product.name} ×{item.quantity}
                                    </span>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                                        ฿{(item.product.price * item.quantity).toLocaleString()}
                                    </span>
                                </div>
                            ))}

                            <div style={{ borderTop: "1px solid var(--border-subtle)", marginTop: 16, paddingTop: 16 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                    <span style={{ fontSize: 13, color: "var(--text-muted)" }}>ค่าจัดส่ง</span>
                                    <span style={{ fontSize: 13, color: "#34d399", fontWeight: 600 }}>ฟรี</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                                    <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>ยอดรวม</span>
                                    <span style={{ fontSize: 20, fontWeight: 900, color: "var(--accent-blue-light)" }}>
                                        ฿{totalPrice.toLocaleString()}
                                    </span>
                                </div>

                                <Link
                                    href="/checkout"
                                    style={{
                                        display: "block", textAlign: "center",
                                        background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
                                        color: "#fff", borderRadius: 12, padding: "13px",
                                        fontWeight: 700, fontSize: 15, textDecoration: "none",
                                        boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
                                    }}
                                >ดำเนินการชำระเงิน →</Link>

                                <Link
                                    href="/products"
                                    style={{
                                        display: "block", textAlign: "center", marginTop: 10,
                                        color: "var(--text-muted)", fontSize: 13, textDecoration: "none",
                                    }}
                                >← ซื้อสินค้าต่อ</Link>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
