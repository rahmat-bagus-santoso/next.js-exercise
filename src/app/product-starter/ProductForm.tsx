"use client";

// ===========================================
// TODO 6: Form component imports
// ===========================================
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Product, FormData } from "./types";

interface ProductFormProps {
  onSubmit: (data: FormData) => void;
  editingProduct: Product | null;
  onCancel: () => void;
  isSubmitting: boolean;
}

// ===========================================
// TODO 7: Form component
// ===========================================
export default function ProductForm({
  onSubmit,
  editingProduct,
  onCancel,
  isSubmitting,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // TODO 6: Fill form when editing, clear when creating new
  // HINTS:
  // - This runs when editingProduct changes
  // - If editingProduct exists: reset({ product: editingProduct.product, price: editingProduct.price })
  // - If editingProduct is null: reset({ product: "", price: "" })
  useEffect(() => {
    console.log("TODO 6: Implement form reset logic");
    // Your code here...

  }, [editingProduct, reset]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
      <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white tracking-tight">
          {editingProduct ? "Edit Product Details" : "Create New Product"}
        </h2>
        <button onClick={onCancel} className="text-zinc-500 hover:text-zinc-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Product name */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">
                Product Name
              </label>
              <input
                {...register("product", { required: "Name is required" })}
                placeholder="e.g. Wireless Headphones"
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
              />
              {errors.product && (
                <p className="text-rose-500 text-xs ml-1">{errors.product.message}</p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">
                Price (USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">$</span>
                <input
                  {...register("price", { required: "Price is required" })}
                  placeholder="0.00"
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-lg pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
                />
              </div>
              {errors.price && (
                <p className="text-rose-500 text-xs ml-1">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3 border-t border-zinc-800/50 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-lg text-zinc-400 font-medium hover:text-white hover:bg-zinc-800 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-indigo-900/20 disabled:opacity-50 text-sm ml-auto"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
