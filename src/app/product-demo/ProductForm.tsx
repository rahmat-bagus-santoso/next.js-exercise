// ============================================
// 📁 FILE: ProductForm.tsx
// ============================================
// Component untuk form Create/Edit product
// Menggunakan React Hook Form untuk handle form
// ============================================

"use client";

// ============================================
// TODO 6: Import untuk Form Component
// ============================================
// useForm: Hook utama dari react-hook-form
// UseFormRegister, FieldErrors: Tipe TypeScript untuk form
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Product, FormData } from "./types";

// ============================================
// DEFINISI PROPS
// ============================================
// Props adalah data yang dikirim dari parent (page.tsx) ke component ini
// Ini seperti "parameter" untuk component

interface ProductFormProps {
  // Callback function saat form disubmit
  // Parent akan handle CREATE atau UPDATE
  onSubmit: (data: FormData) => void;

  // Product yang sedang diedit (null jika mode Create)
  editingProduct: Product | null;

  // Callback function saat tombol Cancel diklik
  onCancel: () => void;

  // Status loading saat submit
  isSubmitting: boolean;
}

// ============================================
// TODO 7: Component ProductForm
// ============================================
export default function ProductForm({
  onSubmit,
  editingProduct,
  onCancel,
  isSubmitting,
}: ProductFormProps) {
  // ============================================
  // SETUP REACT HOOK FORM
  // ============================================
  // useForm() memberikan kita tools untuk mengelola form:
  // - register: menghubungkan input ke form
  // - handleSubmit: menangani submit dengan validasi
  // - reset: mengosongkan atau mengisi ulang form
  // - formState.errors: object berisi error validasi
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // ============================================
  // EFEK: Isi form saat editingProduct berubah
  // ============================================
  // useEffect ini akan jalan setiap kali editingProduct berubah
  // Jika ada product yang diedit, isi form dengan datanya
  // Jika tidak ada (null), kosongkan form
  useEffect(() => {
    if (editingProduct) {
      // Mode Edit: isi form dengan data product
      reset({
        product: editingProduct.product,
        price: editingProduct.price,
      });
    } else {
      // Mode Create: kosongkan form
      reset({
        product: "",
        price: "",
      });
    }
  }, [editingProduct, reset]);

  // ============================================
  // RENDER FORM UI
  // ============================================
  return (
    <div className="mb-6 bg-gray-800 rounded-lg p-6">
      {/* Header form - berubah sesuai mode */}
      <h2 className="text-xl font-semibold mb-4">
        {editingProduct ? "✏️ Edit Product" : "➕ Tambah Product Baru"}
      </h2>

      {/* 
        Form dengan handleSubmit dari react-hook-form
        handleSubmit akan:
        1. Mencegah reload halaman (preventDefault)
        2. Validasi semua input
        3. Jika valid, panggil onSubmit dengan data form
      */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* INPUT: Nama Product */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Nama Product
          </label>
          {/* 
            {...register("product", { required: "..." })}
            - Menghubungkan input ke form dengan nama "product"
            - required: validasi wajib diisi
          */}
          <input
            {...register("product", {
              required: "Nama product wajib diisi",
            })}
            placeholder="Contoh: Laptop Gaming"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          {/* Tampilkan error jika ada */}
          {errors.product && (
            <p className="text-red-400 text-sm mt-1">{errors.product.message}</p>
          )}
        </div>

        {/* INPUT: Harga */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Harga</label>
          <input
            {...register("price", {
              required: "Harga wajib diisi",
            })}
            placeholder="Contoh: 15000000"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          {errors.price && (
            <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* TOMBOL: Submit dan Cancel */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {isSubmitting ? "Menyimpan..." : "💾 Simpan"}
          </button>
          {/* 
            type="button" penting! 
            Tanpa ini, tombol akan dianggap submit dan trigger form
          */}
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
