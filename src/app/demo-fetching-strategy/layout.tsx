import type { Metadata } from 'next';
import DemoSidebar from '@/components/polished/Sidebar';
import "../globals.css"; // Ensure globals are loaded

export const metadata: Metadata = {
  title: 'Next.js Fetching Strategies Demo',
  description: 'Premium showcase of CSR, SSR, SSG, and ISR',
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flat-theme min-h-screen bg-[#09090b] text-slate-100 font-sans antialiased">
      <div className="flex">
        <DemoSidebar />
        <main className="flex-1 ml-72 h-screen overflow-y-auto">
          <div className="p-8 max-w-6xl mx-auto space-y-8 pb-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
