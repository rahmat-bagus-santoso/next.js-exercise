// ============================================
// 📁 FILE: ProductList.tsx
// ============================================
// Component untuk menampilkan daftar products dalam tabel
// Component ini "dumb" - hanya terima data dan tampilkan
// ============================================

"use client";

import { Product } from "./types";

// ============================================
// DEFINISI PROPS
// ============================================
// Props yang diterima dari parent (page.tsx)

interface ProductListProps {
  // Array of products untuk ditampilkan
  products: Product[];

  // Status loading saat fetch data
  loading: boolean;

  // Callback saat tombol Edit diklik
  // Mengirim product yang ingin diedit ke parent
  onEdit: (product: Product) => void;

  // Callback saat tombol Delete diklik
  // Mengirim ID product yang ingin dihapus ke parent
  onDelete: (id: string) => void;
}

// ============================================
// TODO 8: Component ProductList
// ============================================
export default function ProductList({
  products,
  loading,
  onEdit,
  onDelete,
}: ProductListProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">📦 Daftar Products</h2>

      {/* ============================================ */}
      {/* CONDITIONAL RENDERING */}
      {/* ============================================ */}
      {/* Tampilkan UI berbeda berdasarkan kondisi */}

      {/* Kondisi 1: Sedang loading */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-400">⏳ Loading...</p>
        </div>
      ) : // Kondisi 2: Data kosong
        products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">
              📭 Belum ada product. Tambahkan yang pertama!
            </p>
          </div>
        ) : (
          // Kondisi 3: Ada data - tampilkan tabel
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* TABLE HEAD */}
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-700">
                  <th className="pb-3 pr-4">ID</th>
                  <th className="pb-3 pr-4">Nama Product</th>
                  <th className="pb-3 pr-4">Harga</th>
                  <th className="pb-3">Aksi</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {/* 
                ============================================
                MAP = LOOP untuk menampilkan data
                ============================================
                products.map() akan mengulang setiap item di array
                dan mengembalikan JSX untuk setiap item
                
                PENTING: key={product.id} wajib ada!
                React menggunakan key untuk track perubahan
              */}
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    {/* Kolom ID */}
                    <td className="py-3 pr-4 text-gray-400">#{product.id}</td>

                    {/* Kolom Nama Product */}
                    <td className="py-3 pr-4 font-medium">{product.product}</td>

                    {/* Kolom Harga - format sebagai currency */}
                    <td className="py-3 pr-4 text-green-400">
                      ${parseFloat(product.price).toFixed(2)}
                    </td>

                    {/* Kolom Aksi - tombol Edit dan Delete */}
                    <td className="py-3">
                      <div className="flex gap-2">
                        {/* 
                        Tombol Edit
                        onClick={() => onEdit(product)}
                        - Panggil onEdit dengan product ini sebagai parameter
                        - Parent akan set form ke mode Edit
                      */}
                        <button
                          onClick={() => onEdit(product)}
                          className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm transition-colors"
                        >
                          ✏️ Edit
                        </button>

                        {/* 
                        Tombol Delete
                        onClick={() => onDelete(product.id)}
                        - Panggil onDelete dengan ID product
                        - Parent akan handle konfirmasi dan delete
                      */}
                        <button
                          onClick={() => onDelete(product.id)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {/* Footer dengan total count */}
      {!loading && products.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700 text-gray-400 text-sm">
          Total: {products.length} products
        </div>
      )}
    </div>
  );
}
