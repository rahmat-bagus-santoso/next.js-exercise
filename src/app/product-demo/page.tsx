// ============================================
// 📁 FILE: page.tsx (MAIN PAGE)
// ============================================
// Ini adalah file UTAMA - Parent component
// Baca file dalam urutan ini:
// 1. types.ts      → Definisi tipe data
// 2. page.tsx      → File ini (TODO 1-5)
// 3. ProductForm   → Form component (TODO 6-7)
// 4. ProductList   → List component (TODO 8)
// ============================================

"use client";

// ============================================
// TODO 1: Import Dependencies
// ============================================
// axios: Library untuk HTTP request (GET, POST, PUT, DELETE)
// useState: Hook untuk menyimpan data yang bisa berubah
// useEffect: Hook untuk menjalankan kode saat komponen mount
import axios from "axios";
import { useEffect, useState } from "react";

// Import types dari file types.ts
import { Product, FormData } from "./types";

// Import components yang sudah kita buat
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

// ============================================
// TODO 2: API URL Constant
// ============================================
// Simpan URL di satu tempat agar mudah diubah
// MockAPI adalah layanan gratis untuk membuat fake REST API
const API_URL = "https://64ca45bd700d50e3c7049e2f.mockapi.io/product";

// ============================================
// MAIN COMPONENT
// ============================================
export default function ProductDemoPage() {
  // ============================================
  // TODO 3: State Management
  // ============================================
  // useState<Type>(initialValue) membuat state dengan tipe tertentu
  // [value, setValue] = useState() → value untuk baca, setValue untuk ubah

  // State 1: Daftar products dari API
  const [products, setProducts] = useState<Product[]>([]);

  // State 2: Loading indicator
  const [loading, setLoading] = useState(true);

  // State 3: Toggle tampilkan form (true = tampil, false = sembunyi)
  const [showForm, setShowForm] = useState(false);

  // State 4: Product yang sedang diedit
  // null = mode Create, Product = mode Edit
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // State 5: Loading saat submit form
  const [submitting, setSubmitting] = useState(false);

  // ============================================
  // TODO 4: Fetch Products (READ)
  // ============================================
  // useEffect dengan [] = jalankan SEKALI saat component pertama muncul
  // Ini tempat yang tepat untuk fetch data dari API
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fungsi untuk mengambil semua products dari API
  // async/await untuk handle operasi asynchronous
  const fetchProducts = async () => {
    try {
      setLoading(true);

      // axios.get(url) = HTTP GET request
      // Mengembalikan response dengan data di response.data
      const response = await axios.get(API_URL);

      // Simpan data ke state
      setProducts(response.data);
    } catch (error) {
      // Jika error, tampilkan pesan
      console.error("Error fetching products:", error);
      alert("Gagal mengambil data products!");
    } finally {
      // finally SELALU dijalankan, baik sukses maupun error
      setLoading(false);
    }
  };

  // ============================================
  // TODO 5: CRUD Functions
  // ============================================

  // ----- CREATE: Tambah product baru -----
  const createProduct = async (data: FormData) => {
    try {
      setSubmitting(true);

      // axios.post(url, data) = HTTP POST request
      // Mengirim data baru ke API
      const response = await axios.post(API_URL, data);

      // Tambahkan product baru ke daftar
      // [...products, newProduct] = spread operator + item baru
      setProducts([...products, response.data]);

      // Reset state form
      setShowForm(false);
      setEditingProduct(null);

      alert("✅ Product berhasil ditambahkan!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("❌ Gagal menambahkan product!");
    } finally {
      setSubmitting(false);
    }
  };

  // ----- UPDATE: Edit product yang ada -----
  const updateProduct = async (data: FormData) => {
    // Guard: pastikan ada product yang diedit
    if (!editingProduct) return;

    try {
      setSubmitting(true);

      // axios.put(url, data) = HTTP PUT request
      // URL ditambah ID: /product/123
      const response = await axios.put(
        `${API_URL}/${editingProduct.id}`,
        data
      );

      // Update daftar products dengan data baru
      // map() untuk replace item yang diedit
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? response.data : p
        )
      );

      // Reset state form
      setShowForm(false);
      setEditingProduct(null);

      alert("✅ Product berhasil diupdate!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("❌ Gagal mengupdate product!");
    } finally {
      setSubmitting(false);
    }
  };

  // ----- DELETE: Hapus product -----
  const deleteProduct = async (id: string) => {
    // window.confirm() = popup konfirmasi bawaan browser
    // Return true jika OK, false jika Cancel
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus product ini?"
    );

    if (!confirmed) return;

    try {
      // axios.delete(url) = HTTP DELETE request
      await axios.delete(`${API_URL}/${id}`);

      // Hapus dari daftar dengan filter
      // filter() mengembalikan array TANPA item yang dihapus
      setProducts(products.filter((p) => p.id !== id));

      alert("✅ Product berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("❌ Gagal menghapus product!");
    }
  };

  // ============================================
  // HANDLER FUNCTIONS
  // ============================================
  // Fungsi-fungsi pembantu untuk UI

  // Handler saat form disubmit
  // Tentukan apakah CREATE atau UPDATE berdasarkan editingProduct
  const handleFormSubmit = (data: FormData) => {
    if (editingProduct) {
      updateProduct(data);
    } else {
      createProduct(data);
    }
  };

  // Handler untuk tombol "Tambah Product Baru"
  const handleAddNew = () => {
    setEditingProduct(null); // Pastikan mode Create
    setShowForm(true); // Tampilkan form
  };

  // Handler untuk tombol Edit di ProductList
  const handleEdit = (product: Product) => {
    setEditingProduct(product); // Set product yang diedit
    setShowForm(true); // Tampilkan form
  };

  // Handler untuk tombol Cancel di form
  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // ============================================
  // RENDER UI
  // ============================================
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🛒 Product Demo</h1>
          <p className="text-gray-400">
            Belajar CRUD dengan Next.js, Axios, dan React Hook Form
          </p>
        </div>

        {/* TOMBOL ADD NEW - sembunyi saat form tampil */}
        {!showForm && (
          <button
            onClick={handleAddNew}
            className="mb-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            + Tambah Product Baru
          </button>
        )}

        {/* FORM SECTION - tampil berdasarkan showForm */}
        {/* Conditional rendering: {condition && <Component />} */}
        {showForm && (
          <ProductForm
            onSubmit={handleFormSubmit}
            editingProduct={editingProduct}
            onCancel={handleCancel}
            isSubmitting={submitting}
          />
        )}

        {/* PRODUCT LIST */}
        <ProductList
          products={products}
          loading={loading}
          onEdit={handleEdit}
          onDelete={deleteProduct}
        />

        {/* FOOTER INFO */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p className="mb-2">
            API:{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-xs">
              {API_URL}
            </code>
          </p>
          <p className="text-xs">
            📚 Baca kode dalam urutan: types.ts → page.tsx → ProductForm.tsx →
            ProductList.tsx
          </p>
        </div>
      </div>
    </div>
  );
}
