// Shared product data used across all pages

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    brand: string;
    rating: number;
    reviews: number;
    badge?: string;
}

export const products: Product[] = [
    { id: 1, name: "Samsung 990 Pro NVMe SSD 2TB", price: 4290, stock: 12, category: "ssd", brand: "Samsung", rating: 4.9, reviews: 384, badge: "Best Seller" },
    { id: 2, name: "Corsair Vengeance DDR5 32GB Kit", price: 5800, stock: 7, category: "ram", brand: "Corsair", rating: 4.8, reviews: 215, badge: "New" },
    { id: 3, name: "Logitech G Pro X Superlight 2", price: 4500, stock: 5, category: "mouse", brand: "Logitech", rating: 4.9, reviews: 671, badge: "Top Rated" },
    { id: 4, name: "Keychron Q1 Pro QMK Keyboard", price: 5990, stock: 0, category: "keyboard", brand: "Keychron", rating: 4.7, reviews: 142 },
    { id: 5, name: "WD Black SN850X NVMe 1TB", price: 2890, stock: 20, category: "ssd", brand: "WD", rating: 4.8, reviews: 527 },
    { id: 6, name: "G.SKILL Trident Z5 RGB DDR5 16GB", price: 2700, stock: 9, category: "ram", brand: "G.SKILL", rating: 4.6, reviews: 98 },
    { id: 7, name: "ASUS ROG Gladius III AimPoint", price: 3200, stock: 3, category: "mouse", brand: "ASUS ROG", rating: 4.7, reviews: 203, badge: "Hot" },
    { id: 8, name: "SteelSeries Apex Pro TKL", price: 5490, stock: 0, category: "keyboard", brand: "SteelSeries", rating: 4.8, reviews: 310 },
    { id: 9, name: "Crucial T700 PCIe 5.0 NVMe 2TB", price: 6500, stock: 4, category: "ssd", brand: "Crucial", rating: 4.7, reviews: 89, badge: "New" },
    { id: 10, name: "Kingston Fury Beast DDR5 32GB", price: 4100, stock: 15, category: "ram", brand: "Kingston", rating: 4.5, reviews: 176 },
    { id: 11, name: "Razer DeathAdder V3 Pro", price: 3890, stock: 8, category: "mouse", brand: "Razer", rating: 4.6, reviews: 449 },
    { id: 12, name: "Ducky One 3 SF 65%", price: 4750, stock: 2, category: "keyboard", brand: "Ducky", rating: 4.9, reviews: 267, badge: "Top Rated" },
];

export const categories = [
    { id: "all", label: "ทั้งหมด", icon: "🖥️" },
    { id: "ssd", label: "SSD", icon: "💾" },
    { id: "ram", label: "RAM", icon: "🧠" },
    { id: "mouse", label: "เมาส์", icon: "🖱️" },
    { id: "keyboard", label: "คีย์บอร์ด", icon: "⌨️" },
];

export const categoryEmoji: Record<string, string> = {
    ssd: "💾", ram: "🧠", mouse: "🖱️", keyboard: "⌨️",
};
