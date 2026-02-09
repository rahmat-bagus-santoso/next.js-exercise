'use client';

import { useState } from 'react';

export default function ISROnDemandPage() {
  const [isRevalidating, setIsRevalidating] = useState(false);
  const [lastRevalidated, setLastRevalidated] = useState<string | null>(null);

  const handleRevalidate = async () => {
    setIsRevalidating(true);
    try {
      const res = await fetch('/api/revalidate?path=/fetching-examples/isr-on-demand');
      const data = await res.json();
      setLastRevalidated(new Date().toISOString());
      console.log('Revalidation result:', data);
    } catch (error) {
      console.error('Revalidation failed:', error);
    } finally {
      setIsRevalidating(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-pink-500/30">
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-12 border-b border-neutral-800 pb-8">
          <h1 className="text-3xl font-light tracking-tight text-white mb-3">ISR: On-Demand Revalidation</h1>
          <p className="text-neutral-400 max-w-2xl leading-relaxed">
            Trigger cache revalidation <strong className="text-pink-400 font-medium">manually via API</strong>.
            Perfect for CMS webhooks, admin actions, or real-time updates.
          </p>
        </header>

        <section className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-10 w-10 bg-pink-500/10 border border-pink-500/20 rounded-full flex items-center justify-center text-pink-400 font-semibold font-mono">!</div>
            <h2 className="text-xl font-medium text-neutral-200">On-Demand Revalidation Demo</h2>
          </div>

          <div className="bg-neutral-950/50 p-6 rounded-lg border border-neutral-800/50 mb-6">
            <h3 className="text-sm font-semibold text-pink-400 uppercase tracking-wider mb-4">Trigger Revalidation</h3>

            <button
              onClick={handleRevalidate}
              disabled={isRevalidating}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 shadow-lg ${isRevalidating
                  ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
                  : 'bg-pink-600 text-white hover:bg-pink-500 active:scale-95 shadow-pink-900/20'
                }`}
            >
              {isRevalidating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Revalidating...
                </span>
              ) : (
                'Revalidate Cache'
              )}
            </button>

            {lastRevalidated && (
              <div className="mt-4 text-xs text-pink-400/80 font-mono bg-pink-900/10 py-2 px-3 rounded border border-pink-900/20 inline-block">
                Last Revalidated: {lastRevalidated}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
              <h4 className="text-sm font-semibold text-pink-400 mb-3">revalidatePath()</h4>
              <p className="text-sm text-neutral-400 mb-3">Revalidates a specific route path.</p>
              <pre className="text-xs bg-neutral-950 p-3 rounded border border-neutral-800 overflow-x-auto">
                <code className="text-pink-300">{`revalidatePath('/blog/post-1')`}</code>
              </pre>
            </div>

            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
              <h4 className="text-sm font-semibold text-pink-400 mb-3">revalidateTag()</h4>
              <p className="text-sm text-neutral-400 mb-3">Revalidates all routes with a specific cache tag.</p>
              <pre className="text-xs bg-neutral-950 p-3 rounded border border-neutral-800 overflow-x-auto">
                <code className="text-pink-300">{`revalidateTag('blog-posts')`}</code>
              </pre>
            </div>
          </div>

          <div className="mt-6 p-4 bg-pink-900/10 border border-pink-700/30 rounded-lg">
            <h4 className="text-sm font-semibold text-pink-400 mb-2">Use Cases</h4>
            <ul className="text-sm text-neutral-400 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">•</span>
                <span><strong className="text-neutral-300">CMS Webhooks:</strong> Revalidate when content is published</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">•</span>
                <span><strong className="text-neutral-300">E-commerce:</strong> Update product pages when inventory changes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">•</span>
                <span><strong className="text-neutral-300">Admin Dashboard:</strong> Refresh data after admin makes changes</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-8 bg-neutral-900/30 border border-neutral-800 p-6 rounded-xl">
          <h3 className="text-lg font-medium text-neutral-200 mb-4">API Route Handler</h3>
          <pre className="text-xs bg-neutral-950 p-4 rounded-lg border border-neutral-800 overflow-x-auto">
            <code className="text-neutral-300">{`// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');
  
  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  }
  
  return NextResponse.json({ error: 'Path required' }, { status: 400 });
}`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
