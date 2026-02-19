"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
);

const MicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
);

const navLinks = [
    { href: "/", label: "หน้าแรก" },
    { href: "/products", label: "สินค้า" },
    { href: "/promotions", label: "โปรโมชั่น" },
];

interface NavbarProps {
    onVoiceOpen?: () => void;
}

export default function Navbar({ onVoiceOpen }: NavbarProps) {
    const { totalItems } = useCart();
    const pathname = usePathname();

    return (
        <nav style={{
            position: "sticky", top: 0, zIndex: 40,
            background: "rgba(10,14,26,0.92)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--border-subtle)",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
        }}>
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                <div style={{
                    width: 36, height: 36,
                    background: "linear-gradient(135deg,#1d4ed8,#06b6d4)",
                    borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18,
                }}>⚡</div>
                <span style={{ fontSize: 20, fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                    Tech<span style={{ color: "var(--accent-cyan)" }}>Vault</span>
                </span>
            </Link>

            {/* Nav links */}
            <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
                {navLinks.map((link) => {
                    const active = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                fontSize: 14, fontWeight: active ? 700 : 500,
                                color: active ? "var(--text-primary)" : "var(--text-secondary)",
                                textDecoration: "none",
                                borderBottom: active ? "2px solid var(--accent-blue)" : "2px solid transparent",
                                paddingBottom: 2,
                                transition: "all 0.2s",
                            }}
                        >{link.label}</Link>
                    );
                })}
            </div>

            {/* Right side */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {onVoiceOpen && (
                    <button
                        onClick={onVoiceOpen}
                        style={{
                            display: "flex", alignItems: "center", gap: 7,
                            background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
                            color: "#fff", border: "none", borderRadius: 10,
                            padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 13,
                            boxShadow: "0 0 16px rgba(37,99,235,0.3)",
                            transition: "all 0.2s",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <MicIcon /><span>Voice Search</span>
                    </button>
                )}

                {/* Cart */}
                <Link
                    href="/cart"
                    style={{
                        position: "relative",
                        background: pathname === "/cart" ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.06)",
                        border: `1px solid ${pathname === "/cart" ? "rgba(37,99,235,0.4)" : "var(--border-subtle)"}`,
                        borderRadius: 10, padding: "9px 10px",
                        color: "var(--text-secondary)",
                        display: "flex", alignItems: "center",
                        transition: "all 0.2s",
                        textDecoration: "none",
                    }}
                >
                    <CartIcon />
                    {totalItems > 0 && (
                        <span style={{
                            position: "absolute", top: -7, right: -7,
                            background: "var(--accent-blue)",
                            color: "#fff", fontSize: 10, fontWeight: 800,
                            minWidth: 18, height: 18, borderRadius: "50%",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            padding: "0 3px",
                        }}>{totalItems}</span>
                    )}
                </Link>
            </div>
        </nav>
    );
}
