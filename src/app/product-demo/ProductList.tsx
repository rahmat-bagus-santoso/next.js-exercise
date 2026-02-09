"use client";

import { Product } from "./types";

// Props = data passed from parent
interface ProductListProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

// ===========================================
// TODO 8: List component
// ===========================================
export default function ProductList({
  products,
  loading,
  onEdit,
  onDelete,
}: ProductListProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
      {/* Loading State */}
      {loading && (
        <div className="p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-zinc-500">Loading your inventory...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="p-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800/50 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No products found</h3>
          <p className="text-zinc-500 max-w-sm mx-auto">
            Your inventory is empty. Click the "Add New Product" button to get started.
          </p>
        </div>
      )}

      {/* Data Table */}
      {!loading && products.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-900/50 border-b border-zinc-800">
              <tr>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-zinc-500 w-20">ID</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-zinc-500">Product Name</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-zinc-500 text-right">Price</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-zinc-500 text-right w-48">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="group hover:bg-zinc-800/40 transition-colors"
                >
                  <td className="py-4 px-6 text-zinc-600 font-mono text-xs">
                    #{product.id}
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-zinc-200 group-hover:text-white transition-colors">
                      {product.product}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-zinc-300">
                    ${parseFloat(product.price).toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 text-zinc-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-all"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                      </button>
                      <div className="w-px h-8 bg-zinc-800 mx-1 self-center"></div>
                      <button
                        onClick={() => onDelete(product.id)}
                        className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
