import { Suspense } from 'react';

// Another faster component to show they load independently
async function FastUser() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch('https://jsonplaceholder.typicode.com/users/5', { cache: 'no-store' });
  const user = await res.json();

  return (
    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Fast Component</p>
        <p className="font-semibold text-neutral-200">{user.name}</p>
      </div>
      <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      </div>
    </div>
  )
}

// A slow fetching component
async function SlowPost() {
  // Simulate a 4-second delay
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const res = await fetch('https://jsonplaceholder.typicode.com/posts/10', { cache: 'no-store' });
  const post = await res.json();

  return (
    <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800 shadow-xl animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-xl text-neutral-100 tracking-tight leading-snug">{post.title}</h3>
        <span className="shrink-0 px-2 py-1 bg-blue-900/30 text-blue-400 text-xs rounded border border-blue-900/50">4s Delay</span>
      </div>
      <p className="text-neutral-400 leading-relaxed">{post.body}</p>
      <div className="mt-6 pt-6 border-t border-neutral-800 text-xs text-neutral-600 flex justify-end font-mono">
        Streamed content loaded
      </div>
    </div>
  );
}

export default function SSRStreamingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-12 border-b border-neutral-800 pb-8">
          <h1 className="text-3xl font-light tracking-tight text-white mb-3">SSR: Streaming with Suspense</h1>
          <p className="text-neutral-400 max-w-2xl leading-relaxed">
            This page shell loads instantly. Heavy components "stream in" as they become ready, preventing the whole page from blocking.
          </p>
        </header>

        <section className="space-y-8">
          {/* Fast Component */}
          <div>
            <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-3 pl-1">1. Fast Request (1s)</h2>
            <Suspense fallback={<div className="h-24 bg-neutral-900/50 rounded-lg animate-pulse border border-neutral-800/50"></div>}>
              <FastUser />
            </Suspense>
          </div>

          {/* Slow Component */}
          <div>
            <div className="flex items-center gap-2 mb-3 pl-1">
              <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-widest">2. Slow Request (4s)</h2>
              <div className="animate-spin h-3 w-3 border-2 border-blue-500/50 border-t-transparent rounded-full opacity-50"></div>
            </div>

            <Suspense fallback={<PostSkeleton />}>
              <SlowPost />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  );
}

function PostSkeleton() {
  return (
    <div className="p-8 rounded-xl border border-neutral-800 bg-neutral-900/30">
      <div className="h-8 bg-neutral-800 rounded w-3/4 mb-6 animate-pulse"></div>
      <div className="space-y-3">
        <div className="h-4 bg-neutral-800/60 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-neutral-800/60 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-neutral-800/60 rounded w-2/3 animate-pulse"></div>
      </div>
    </div>
  );
}
