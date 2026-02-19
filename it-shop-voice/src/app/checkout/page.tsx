"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";

const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: "1px solid var(--border-subtle)", borderRadius: 10,
    padding: "11px 14px", color: "var(--text-primary)", fontSize: 14,
    outline: "none", transition: "border 0.2s",
};

const labelStyle = {
    fontSize: 12, fontWeight: 600, color: "var(--text-muted)",
    textTransform: "uppercase" as const, letterSpacing: "0.05em",
    display: "block", marginBottom: 6,
};

export default function CheckoutPage() {
    const { items, totalPrice, totalItems, clearCart } = useCart();
    const router = useRouter();
    const [step, setStep] = useState<"form" | "success">("form");
    const [couponCode, setCouponCode] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "", email: "", phone: "",
        address: "", province: "", zip: "",
        payment: "promptpay",
    });

    const discount = couponApplied ? 500 : 0;
    const finalPrice = Math.max(0, totalPrice - discount);

    const updateForm = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

    const applyCoupon = () => {
        if (couponCode.trim().toUpperCase() === "BUNDLE500") {
            setCouponApplied(true);
        }
    };

    const handleOrder = async () => {
        if (!form.name || !form.email || !form.phone || !form.address) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1800)); // simulate API
        clearCart();
        setLoading(false);
        setStep("success");
    };

    if (totalItems === 0 && step === "form") {
        return (
            <>
                <Navbar />
                <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 56, marginBottom: 12 }}>🛒</div>
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>ตะกร้าว่างเปล่า</h2>
                        <p style={{ color: "var(--text-muted)", marginBottom: 20 }}>กรุณาเพิ่มสินค้าก่อนชำระเงิน</p>
                        <button onClick={() => router.push("/products")} style={{
                            background: "linear-gradient(135deg,#1d4ed8,#2563eb)", color: "#fff",
                            border: "none", borderRadius: 12, padding: "12px 28px",
                            fontWeight: 700, fontSize: 14, cursor: "pointer",
                        }}>เลือกซื้อสินค้า</button>
                    </div>
                </div>
            </>
        );
    }

    if (step === "success") {
        return (
            <>
                <Navbar />
                <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                    <div className="animate-fadeInUp" style={{
                        textAlign: "center", maxWidth: 460,
                        background: "var(--bg-card)", border: "1px solid rgba(16,185,129,0.3)",
                        borderRadius: 24, padding: "48px 32px",
                        boxShadow: "0 0 40px rgba(16,185,129,0.1)",
                    }}>
                        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                        <h2 style={{ fontSize: 26, fontWeight: 900, color: "var(--text-primary)", marginBottom: 8 }}>สั่งซื้อสำเร็จ!</h2>
                        <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 8 }}>
                            ขอบคุณที่ซื้อสินค้ากับ <strong style={{ color: "var(--accent-cyan)" }}>TechVault</strong><br />
                            คุณจะได้รับอีเมลยืนยันที่ <strong style={{ color: "var(--text-primary)" }}>{form.email}</strong>
                        </p>
                        <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 28 }}>
                            🚚 คาดว่าสินค้าจะถึงมือคุณภายใน 2-3 วันทำการ
                        </p>
                        <button onClick={() => router.push("/")} style={{
                            background: "linear-gradient(135deg,#1d4ed8,#2563eb)", color: "#fff",
                            border: "none", borderRadius: 12, padding: "12px 28px",
                            fontWeight: 700, fontSize: 14, cursor: "pointer",
                        }}>กลับหน้าแรก</button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main style={{ maxWidth: 980, margin: "0 auto", padding: "40px 24px 80px" }}>
                <h1 style={{ fontSize: 26, fontWeight: 900, color: "var(--text-primary)", marginBottom: 28 }}>
                    💳 ชำระเงิน
                </h1>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
                    {/* Form */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                        {/* Shipping */}
                        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: 18, padding: 24 }}>
                            <h2 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginBottom: 18 }}>📦 ข้อมูลการจัดส่ง</h2>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                                {[
                                    { key: "name", label: "ชื่อ-นามสกุล", placeholder: "สมหมาย ใจดี", colSpan: 2 },
                                    { key: "email", label: "อีเมล", placeholder: "example@email.com" },
                                    { key: "phone", label: "เบอร์โทร", placeholder: "08x-xxx-xxxx" },
                                    { key: "address", label: "ที่อยู่", placeholder: "บ้านเลขที่ ถนน แขวง/ตำบล", colSpan: 2 },
                                    { key: "province", label: "จังหวัด", placeholder: "กรุงเทพมหานคร" },
                                    { key: "zip", label: "รหัสไปรษณีย์", placeholder: "10110" },
                                ].map((f) => (
                                    <div key={f.key} style={{ gridColumn: f.colSpan === 2 ? "1/-1" : undefined }}>
                                        <label style={labelStyle}>{f.label}</label>
                                        <input
                                            type="text" placeholder={f.placeholder}
                                            value={form[f.key as keyof typeof form]}
                                            onChange={(e) => updateForm(f.key, e.target.value)}
                                            style={inputStyle}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment */}
                        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: 18, padding: 24 }}>
                            <h2 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginBottom: 18 }}>💳 วิธีชำระเงิน</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {[
                                    { id: "promptpay", label: "PromptPay", icon: "📱" },
                                    { id: "card", label: "บัตรเครดิต/เดบิต", icon: "💳" },
                                    { id: "transfer", label: "โอนเงินผ่านธนาคาร", icon: "🏦" },
                                ].map((opt) => (
                                    <label key={opt.id} style={{
                                        display: "flex", alignItems: "center", gap: 12,
                                        background: form.payment === opt.id ? "rgba(37,99,235,0.1)" : "rgba(255,255,255,0.03)",
                                        border: `1px solid ${form.payment === opt.id ? "rgba(37,99,235,0.4)" : "var(--border-subtle)"}`,
                                        borderRadius: 12, padding: "12px 16px", cursor: "pointer", transition: "all 0.2s",
                                    }}>
                                        <input type="radio" name="payment" value={opt.id}
                                            checked={form.payment === opt.id}
                                            onChange={() => updateForm("payment", opt.id)}
                                            style={{ accentColor: "var(--accent-blue)" }}
                                        />
                                        <span style={{ fontSize: 18 }}>{opt.icon}</span>
                                        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{opt.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Coupon */}
                        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: 18, padding: 24 }}>
                            <h2 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginBottom: 14 }}>🎟️ โค้ดส่วนลด</h2>
                            <div style={{ display: "flex", gap: 10 }}>
                                <input
                                    type="text" placeholder="กรอกโค้ด เช่น BUNDLE500"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    disabled={couponApplied}
                                    style={{ ...inputStyle, flex: 1 }}
                                />
                                <button onClick={applyCoupon} disabled={couponApplied} style={{
                                    padding: "11px 20px", borderRadius: 10, border: "none", cursor: couponApplied ? "default" : "pointer",
                                    background: couponApplied ? "rgba(16,185,129,0.2)" : "linear-gradient(135deg,#1d4ed8,#2563eb)",
                                    color: couponApplied ? "#34d399" : "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0,
                                }}>
                                    {couponApplied ? "✓ ใช้แล้ว" : "ใช้โค้ด"}
                                </button>
                            </div>
                            {couponApplied && (
                                <p style={{ fontSize: 12, color: "#34d399", marginTop: 8 }}>🎉 ส่วนลด -฿500 ถูกนำไปใช้แล้ว</p>
                            )}
                        </div>
                    </div>

                    {/* Order summary */}
                    <div style={{
                        background: "var(--bg-card)", border: "1px solid var(--border-subtle)",
                        borderRadius: 18, padding: 22, position: "sticky", top: 80,
                    }}>
                        <h2 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginBottom: 18 }}>สรุปออเดอร์</h2>

                        {items.map((item) => (
                            <div key={item.product.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, gap: 8 }}>
                                <span style={{ fontSize: 12, color: "var(--text-secondary)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {item.product.name} ×{item.quantity}
                                </span>
                                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", flexShrink: 0 }}>
                                    ฿{(item.product.price * item.quantity).toLocaleString()}
                                </span>
                            </div>
                        ))}

                        <div style={{ borderTop: "1px solid var(--border-subtle)", marginTop: 14, paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>ราคาสินค้า</span>
                                <span style={{ fontSize: 13, color: "var(--text-primary)" }}>฿{totalPrice.toLocaleString()}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>ค่าจัดส่ง</span>
                                <span style={{ fontSize: 13, color: "#34d399", fontWeight: 600 }}>ฟรี</span>
                            </div>
                            {couponApplied && (
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: 13, color: "#34d399" }}>ส่วนลดโค้ด</span>
                                    <span style={{ fontSize: 13, color: "#34d399", fontWeight: 600 }}>-฿{discount.toLocaleString()}</span>
                                </div>
                            )}
                            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                                <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>ยอดรวม</span>
                                <span style={{ fontSize: 22, fontWeight: 900, color: "var(--accent-blue-light)" }}>
                                    ฿{finalPrice.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleOrder}
                            disabled={loading}
                            style={{
                                marginTop: 18, width: "100%", padding: "13px",
                                background: loading ? "rgba(37,99,235,0.5)" : "linear-gradient(135deg,#1d4ed8,#2563eb)",
                                border: "none", borderRadius: 12, color: "#fff",
                                fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer",
                                boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                            }}
                        >
                            {loading ? (
                                <>
                                    <span className="dot-bounce" style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", display: "inline-block" }} />
                                    <span className="dot-bounce" style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", display: "inline-block", animationDelay: "0.15s" }} />
                                    <span className="dot-bounce" style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", display: "inline-block", animationDelay: "0.3s" }} />
                                </>
                            ) : "ยืนยันคำสั่งซื้อ →"}
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}
