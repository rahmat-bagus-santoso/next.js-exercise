"use client";

// ===========================================
// TODO 1: Imports ✅
// ===========================================
import axios from "axios";
import { useEffect, useState } from "react";
import { Product, FormData } from "./types";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

// ===========================================
// TODO 2: API URL ✅
// ===========================================
// for testing api we can use thunder client / postman
const API_URL = "https://64ca45bd700d50e3c7049e2f.mockapi.io/product";

export default function ProductStarterPage() {
  // ===========================================
  // TODO 3: State ✅
  // ===========================================
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // ===========================================
  // TODO 4: Fetch products on page load ✅
  // ===========================================
  useEffect(() => {
    fetchProducts();
  }, []);
  // TODO 4: Fetch all products from API
  // HINTS:
  // - Use try/catch for error handling
  // - Set loading to true before fetch
  // - Use axios.get(API_URL) to get data
  // - Response data is in response.data
  // - Use setProducts() to save the data
  // - Set loading to false when done (use finally)

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProducts(response.data);
      setLoading(false);
      setShowForm(false);
    } catch (error) {
      console.log("error fetch data nih bos", error);
      alert("error fetch data");
    } finally {
      setLoading(false);
    }
  };

  // ===========================================
  // TODO 5: CRUD functions
  // ===========================================

  // TODO 5.1: Create new product
  // HINTS:
  // - Set submitting to true
  // - Use axios.post(API_URL, data) to send data
  // - New product is in response.data
  // - Add to products array: setProducts([...products, response.data])
  // - Hide form: setShowForm(false)
  // - Show success message: alert("Product added!")
  const createProduct = async (data: FormData) => {
    try {
      setSubmitting(true);
      const response = await axios.post(API_URL, data);
      console.log("response", response.data);
      fetchProducts();
    } catch (error) {
      console.log("error", error);
    }
  };

  // untuk update bisa menggunakan put atau patch
  // seharusnya put ketika mengupdate data dia akan mengirimkan kembali semua data
  // patch hanya mengupdate sebagian data saja
  // TODO 5.2: Update existing product
  // HINTS:
  // - Check if editingProduct exists, if not return
  // - Use axios.put(API_URL + "/" + editingProduct.id, data)
  // - Update products array using map():
  //   setProducts(products.map(p => p.id === editingProduct.id ? response.data : p))
  // - Reset: setShowForm(false), setEditingProduct(null)
  const updateProduct = async (data: FormData) => {
    try {
      setSubmitting(true);
      const response = await axios.put(
        `${API_URL}/${editingProduct?.id}`,
        data,
      );
      console.log("response", response.data);
      fetchProducts();
    } catch (error) {
      console.log("error", error);
    }
  };
  // TODO 5.3: Delete product ✅
  // HINTS:
  // - Ask for confirmation: if (!window.confirm("Delete?")) return
  // - Use axios.delete(API_URL + "/" + id)
  // - Remove from array: setProducts(products.filter(p => p.id !== id))

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure want delete the data?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (error) {
      console.log("error", error);
    }
  };

  // ===========================================
  // Handlers (already done for you)
  // ===========================================
  const handleSubmit = (data: FormData) => {
    if (editingProduct) {
      updateProduct(data);
    } else {
      createProduct(data);
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // Calculate stats
  const totalValue = products.reduce(
    (sum, p) => sum + parseFloat(p.price || "0"),
    0,
  );

  // ===========================================
  // Render (already done for you)
  // ===========================================
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
              Product Starter
            </h1>
            <p className="text-zinc-400 text-sm">
              Follow the TODOs to build this CRUD app
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-6 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
            <div>
              <p className="text-xs text-zinc-500 uppercase font-semibold tracking-wider">
                Total Products
              </p>
              <p className="text-xl font-bold text-white">{products.length}</p>
            </div>
            <div className="w-px bg-zinc-800"></div>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-semibold tracking-wider">
                Total Value
              </p>
              <p className="text-xl font-bold text-indigo-400">
                $
                {totalValue.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Add Button */}
        {!showForm && (
          <div className="mb-8 flex justify-end">
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-indigo-900/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              Add New Product
            </button>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="mb-8">
            <ProductForm
              onSubmit={handleSubmit}
              editingProduct={editingProduct}
              onCancel={handleCancel}
              isSubmitting={submitting}
            />
          </div>
        )}

        {/* Product List */}
        <ProductList
          products={products}
          loading={loading}
          onEdit={handleEdit}
          onDelete={deleteProduct}
        />

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
          <p>Starter Template • Check product-demo for answers</p>
        </div>
      </div>
    </div>
  );
}
