"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BarChart3, Box, HelpCircle, Newspaper, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/demo-fetching-strategy", icon: BarChart3, desc: "SSR Analytics" },
  { name: "Inventory", href: "/demo-fetching-strategy/inventory", icon: Box, desc: "CSR + CRUD" },
  { name: "Help Center", href: "/demo-fetching-strategy/help", icon: HelpCircle, desc: "SSG Articles" },
  { name: "Blog", href: "/demo-fetching-strategy/blog", icon: Newspaper, desc: "ISR Updates" },
];

export default function DemoSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#09090b] border-r border-[#27272a] z-50 flex flex-col justify-between p-4">
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 px-2 py-2">
          <div className="h-8 w-8 rounded-md bg-white text-black flex items-center justify-center font-bold">
            <Home className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-white">Nexus Demo</h1>
            <p className="text-xs text-zinc-500">Next.js 16 Features</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="block">
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 text-sm",
                  isActive
                    ? "bg-zinc-800 text-white font-medium"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                )}>
                  <item.icon className="h-4 w-4" />
                  <div className="flex flex-col text-left">
                    <span>{item.name}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="px-2">
        <div className="p-3 rounded-md border border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-zinc-400">System Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
