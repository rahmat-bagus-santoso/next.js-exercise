export interface DemoProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: 'In Stock' | 'Low Stock' | 'Sold Out';
  lastUpdated: string;
}

// Initial Data - Tech/Apple Vibe
let products: DemoProduct[] = [
  {
    id: 1,
    name: "Vision Pro Max",
    price: 3499.00,
    stock: 8,
    category: "Wearables",
    status: "In Stock",
    lastUpdated: new Date().toISOString()
  },
  {
    id: 2,
    name: "Pro Studio Display XDR",
    price: 1599.00,
    stock: 15,
    category: "Displays",
    status: "In Stock",
    lastUpdated: new Date().toISOString()
  },
  {
    id: 3,
    name: "Magic Keyboard Flux",
    price: 199.00,
    stock: 2,
    category: "Accessories",
    status: "Low Stock",
    lastUpdated: new Date().toISOString()
  },
  {
    id: 4,
    name: "Ceramic Shield Case",
    price: 49.00,
    stock: 0,
    category: "Accessories",
    status: "Sold Out",
    lastUpdated: new Date().toISOString()
  },
  {
    id: 5,
    name: "AirPods Ultra",
    price: 549.00,
    stock: 24,
    category: "Audio",
    status: "In Stock",
    lastUpdated: new Date().toISOString()
  }
];

export const demoDb = {
  products: {
    getAll: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      return [...products];
    },
    add: async (product: Omit<DemoProduct, 'id' | 'lastUpdated'>) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const newProduct: DemoProduct = {
        ...product,
        id: Math.max(...products.map(p => p.id), 0) + 1,
        lastUpdated: new Date().toISOString()
      };
      products.push(newProduct);
      return newProduct;
    },
    update: async (id: number, updates: Partial<DemoProduct>) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const index = products.findIndex(p => p.id === id);
      if (index === -1) return null;
      
      products[index] = { ...products[index], ...updates, lastUpdated: new Date().toISOString() };
      return products[index];
    },
    delete: async (id: number) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      products = products.filter(p => p.id !== id);
      return true;
    }
  }
};
