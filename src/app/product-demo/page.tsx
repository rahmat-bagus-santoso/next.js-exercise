"use client";

// ===========================================
// TODO 1: Imports
// ===========================================
import axios from "axios";
import { useEffect, useState } from "react";
import { Product, FormData } from "./types";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

// ===========================================
// TODO 2: API URL
// ===========================================
const API_URL = "https://64ca45bd700d50e3c7049e2f.mockapi.io/product";

export default function ProductDemoPage() {
  // ===========================================
  // TODO 3: State
  // ===========================================
  // Sample data for demo purposes
  // const MOCK_PRODUCTS: Product[] = [
  //   { id: "1", createdAt: "2026-01-01", product: "Wireless Headphones", price: "149.99" },
  //   { id: "2", createdAt: "2026-01-02", product: "Mechanical Keyboard", price: "189.00" },
  //   { id: "3", createdAt: "2026-01-03", product: "4K Monitor", price: "449.99" },
  // ];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // ===========================================
  // TODO 4: Fetch products on page load
  // ===========================================
  // For demo: Using mock data, no API call needed
  // Uncomment below to fetch from real API:
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch:", error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // ===========================================
  // TODO 5: CRUD functions
  // ===========================================

  // CREATE - add new product
  const createProduct = async (data: FormData) => {
    try {
      setSubmitting(true);
      const response = await axios.post(API_URL, data);
      setProducts([...products, response.data]);
      setShowForm(false);
      alert("Product added successfully");
    } catch (error) {
      console.error("Failed to create:", error);
      alert("Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  // UPDATE - edit existing product
  const updateProduct = async (data: FormData) => {
    if (!editingProduct) return;

    try {
      setSubmitting(true);
      const response = await axios.put(`${API_URL}/${editingProduct.id}`, data);
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? response.data : p)),
      );
      setShowForm(false);
      setEditingProduct(null);
      alert("Product updated successfully");
    } catch (error) {
      console.error("Failed to update:", error);
      alert("Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  // DELETE - remove product
  const deleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Failed to delete product");
    }
  };

  // ===========================================
  // Handlers
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

  // Calculate simple stats
  const totalValue = products.reduce(
    (sum, p) => sum + parseFloat(p.price || "0"),
    0,
  );

  // ===========================================
  // Render
  // ===========================================
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
              Product Dashboard
            </h1>
            <p className="text-zinc-400 text-sm">
              Manage your inventory and pricing
            </p>
          </div>

          {/* Stats Summary */}
          <div className="flex gap-6 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
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

        {/* Action Bar */}
        {!showForm && (
          <div className="mb-8 flex justify-end">
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-indigo-900/20 hover:shadow-indigo-900/40 active:scale-95"
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

        {/* Form Section - sleek card design */}
        {showForm && (
          <div className="mb-8 p-1">
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
          <p>Next.js CRUD Demo • MockAPI • Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
