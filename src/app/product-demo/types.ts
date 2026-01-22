// ============================================
// 📁 FILE: types.ts
// ============================================
// Baca file ini PERTAMA sebelum file lainnya!
// Di sini kita mendefinisikan "bentuk" data yang akan digunakan
// ============================================

// ============================================
// APA ITU INTERFACE?
// ============================================
// Interface adalah "cetakan" atau "blueprint" untuk data
// TypeScript menggunakan ini untuk memastikan data kita sesuai format
// Contoh: Product HARUS punya id, createdAt, product, dan price

/**
 * Product - Data product dari API
 *
 * Contoh data dari API:
 * {
 *   "id": "1",
 *   "createdAt": "2026-01-22T04:46:00.371Z",
 *   "product": "Laptop Gaming",
 *   "price": "15000000"
 * }
 */
export interface Product {
  id: string; // ID unik dari API (string, bukan number)
  createdAt: string; // Tanggal dibuat (format ISO string)
  product: string; // Nama product
  price: string; // Harga (string dari API, bukan number)
}

/**
 * FormData - Data yang dikirim saat submit form
 *
 * Hanya perlu product dan price karena:
 * - id: dibuat otomatis oleh API
 * - createdAt: dibuat otomatis oleh API
 */
export interface FormData {
  product: string;
  price: string;
}

// ============================================
// TIPS UNTUK PEMULA
// ============================================
// 1. "export" artinya interface ini bisa dipakai di file lain
// 2. Nama interface biasanya PascalCase (huruf besar di awal)
// 3. Gunakan interface untuk semua data yang memiliki struktur tetap
