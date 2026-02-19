"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";

const deals = [
    {
        id: 1, title: "Flash Sale: SSD ลดสูงสุด 30%",
        desc: "Samsung 990 Pro, WD Black SN850X และอีกหลายรุ่น ลดราคาพิเศษวันนี้เท่านั้น",
        emoji: "💾", color: "linear-gradient(135deg,#1d4ed8,#06b6d4)",
        tag: "⚡ FLASH SALE", expires: "สิ้นสุด 23 ก.พ. 2569",
        discount: "ลด 30%",
    },
    {
        id: 2, title: "Bundle Deal: RAM + SSD คู่ราคาพิเศษ",
        desc: "ซื้อ RAM + SSD คู่กันรับส่วนลดพิเศษ 500 บาท พร้อมจัดส่งฟรีทุกออเดอร์",
        emoji: "🧠", color: "linear-gradient(135deg,#7c3aed,#a855f7)",
        tag: "🎁 BUNDLE", expires: "สิ้นสุด 28 ก.พ. 2569",
        discount: "ลด ฿500",
    },
    {
        id: 3, title: "Gaming Peripheral Week",
        desc: "เมาส์ Gaming และ Keyboard Mechanical ราคาพิเศษ พร้อม Razer DeathAdder V3 Pro",
        emoji: "🖱️", color: "linear-gradient(135deg,#ea580c,#f97316)",
        tag: "🎮 GAMING WEEK", expires: "สิ้นสุด 25 ก.พ. 2569",
        discount: "ลด 20%",
    },
    {
        id: 4, title: "ส่งฟรีทุกออเดอร์ ไม่มีขั้นต่ำ",
        desc: "ทุกการสั่งซื้อในเดือนนี้ จัดส่งฟรีทั่วประเทศ ไม่มีขั้นต่ำ รับสินค้าภายใน 2-3 วัน",
        emoji: "🚚", color: "linear-gradient(135deg,#059669,#10b981)",
        tag: "🚚 FREE SHIPPING", expires: "ตลอดเดือน ก.พ. 2569",
        discount: "ฟรี",
    },
];

const coupons = [
    { code: "TECH30", desc: "ส่วนลด 30% สำหรับสินค้า SSD", type: "SSD only" },
    { code: "NEWMEMBER", desc: "ส่วนลด 100 บาท สำหรับสมาชิกใหม่", type: "ทุกสินค้า" },
    { code: "BUNDLE500", desc: "ซื้อ 2 ชิ้นขึ้นไป ลด 500 บาท", type: "2+ ชิ้น" },
];

export default function PromotionsPage() {
    const { totalItems } = useCart();

    return (
        <>
            <Navbar />
            <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)",
                        padding: "6px 16px", borderRadius: 20, marginBottom: 16,
                    }}>
                        <span style={{ fontSize: 12, color: "#fb923c", fontWeight: 700, letterSpacing: "0.06em" }}>
                            🔥 HOT DEALS
                        </span>
                    </div>
                    <h1 style={{ fontSize: 32, fontWeight: 900, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "-0.02em" }}>
                        โปรโมชั่นประจำเดือน
                    </h1>
                    <p style={{ fontSize: 15, color: "var(--text-muted)" }}>
                        ดีลพิเศษที่คัดสรรมาเพื่อสาย IT โดยเฉพาะ อัปเดตทุกสัปดาห์
                    </p>
                </div>

                {/* Deal cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))", gap: 20, marginBottom: 48 }}>
                    {deals.map((deal) => (
                        <div key={deal.id} className="product-card animate-fadeInUp" style={{ display: "flex", gap: 0, overflow: "hidden" }}>
                            {/* Color stripe */}
                            <div style={{
                                width: 6, flexShrink: 0,
                                background: deal.color,
                            }} />
                            <div style={{ padding: "22px 24px", flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div style={{
                                            width: 52, height: 52, borderRadius: 14,
                                            background: deal.color, display: "flex",
                                            alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0,
                                        }}>{deal.emoji}</div>
                                        <div>
                                            <span style={{
                                                display: "inline-block", fontSize: 10, fontWeight: 700,
                                                padding: "2px 8px", borderRadius: 6,
                                                background: "rgba(249,115,22,0.15)", color: "#fb923c",
                                                border: "1px solid rgba(249,115,22,0.25)",
                                                letterSpacing: "0.05em", marginBottom: 4,
                                            }}>{deal.tag}</span>
                                            <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)" }}>{deal.title}</h3>
                                        </div>
                                    </div>
                                    <span style={{
                                        fontSize: 14, fontWeight: 900, padding: "6px 12px",
                                        background: deal.color, color: "#fff",
                                        borderRadius: 10, flexShrink: 0,
                                    }}>{deal.discount}</span>
                                </div>
                                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 14 }}>{deal.desc}</p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>📅 {deal.expires}</span>
                                    <Link href="/products" style={{
                                        fontSize: 12, fontWeight: 700, color: "var(--accent-blue-light)",
                                        textDecoration: "none", padding: "6px 14px",
                                        border: "1px solid rgba(37,99,235,0.35)", borderRadius: 8,
                                        transition: "all 0.2s",
                                    }}>ดูสินค้า →</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coupon codes */}
                <div style={{
                    background: "var(--bg-card)", border: "1px solid var(--border-subtle)",
                    borderRadius: 20, padding: 28,
                }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>
                        🎟️ โค้ดส่วนลด
                    </h2>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
                        คัดลอกโค้ดแล้วใช้ตอนชำระเงิน
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
                        {coupons.map((c) => (
                            <div key={c.code} style={{
                                background: "rgba(37,99,235,0.07)", border: "1px dashed rgba(37,99,235,0.35)",
                                borderRadius: 14, padding: "16px 18px",
                                display: "flex", alignItems: "center", gap: 14,
                            }}>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>{c.type}</p>
                                    <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>{c.desc}</p>
                                </div>
                                <button
                                    onClick={() => navigator.clipboard?.writeText(c.code)}
                                    style={{
                                        background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
                                        border: "none", borderRadius: 8, padding: "8px 14px",
                                        color: "#fff", fontWeight: 800, fontSize: 13,
                                        cursor: "pointer", letterSpacing: "0.05em", flexShrink: 0,
                                    }}
                                >{c.code}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
