'use client';

import useSWR from 'swr';
import { useState } from 'react';

// Standard fetcher for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CSRPage() {
  const [clickCount, setClickCount] = useState(0);

  // useSWR(key, fetcher)
  // This hook handles caching, revalidation, focus tracking, etc. automatically.
  const { data, error, isLoading, mutate } = useSWR(
    'https://jsonplaceholder.typicode.com/todos/1',
    fetcher
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-12 border-b border-neutral-800 pb-8">
          <h1 className="text-3xl font-light tracking-tight text-white mb-3">Client-Side Rendering (CSR)</h1>
          <p className="text-neutral-400 max-w-2xl leading-relaxed">
            Fetching data on the client using <code className="bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-indigo-400 font-mono text-sm">useSWR</code>
            (Stale-While-Revalidate).
          </p>
        </header>

        <section className="space-y-6">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl shadow-2xl backdrop-blur-sm p-8">
            <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-6">Fetched Data</h2>

            {/* STATE HANDLING */}
            {error && (
              <div className="p-4 bg-red-900/10 border border-red-900/30 rounded text-red-400 text-sm">
                Failed to load data. API might be down.
              </div>
            )}

            {isLoading && (
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-neutral-800 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-neutral-800 rounded"></div>
                    <div className="h-4 bg-neutral-800 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            )}

            {data && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="p-6 bg-neutral-950/50 rounded-lg border border-neutral-800/50 hover:border-indigo-500/20 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-indigo-400 uppercase font-bold tracking-wide">Todo Item</p>
                    <span className="text-xs text-neutral-600 font-mono">ID: {data.id}</span>
                  </div>
                  <p className="text-xl font-light text-white mb-4">{data.title}</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${data.completed
                      ? 'bg-emerald-900/20 text-emerald-400 border-emerald-900/30'
                      : 'bg-amber-900/20 text-amber-400 border-amber-900/30'}`}>
                      {data.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* INTERACTIVITY DEMO */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="mt-1 p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <div>
                <h3 className="font-medium text-white text-lg">Interactivity & Revalidation</h3>
                <p className="text-sm text-neutral-400 mt-1 leading-relaxed max-w-xl">
                  SWR automatically caches this data. If you navigate away and come back, it loads instantly from cache, then revalidates in the background.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setClickCount(c => c + 1);
                  mutate(); // Trigger a re-fetch manually
                }}
                className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/20 active:scale-95 duration-100"
              >
                Revalidate Data {clickCount > 0 && <span className="ml-1 opacity-80">({clickCount})</span>}
              </button>

              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 bg-transparent border border-neutral-700 text-neutral-300 text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors active:scale-95 duration-100"
              >
                Full Page Reload
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
