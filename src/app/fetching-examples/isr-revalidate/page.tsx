async function getRevalidatedData() {
  // ISR: Revalidate this data every 10 seconds
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/5', {
    next: { revalidate: 10 }, // Revalidate every 10 seconds
  });

  if (!res.ok) throw new Error('Failed to fetch data');

  const data = await res.json();
  return { ...data, cachedAt: new Date().toISOString() };
}

export default async function ISRRevalidatePage() {
  const isrData = await getRevalidatedData();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-amber-500/30">
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-12 border-b border-neutral-800 pb-8">
          <h1 className="text-3xl font-light tracking-tight text-white mb-3">ISR: Incremental Static Regeneration</h1>
          <p className="text-neutral-400 max-w-2xl leading-relaxed">
            This page uses <strong className="text-amber-400 font-medium">time-based revalidation</strong>.
            Data is cached and refreshed in the background every 10 seconds.
          </p>
        </header>

        <div className="mb-8 p-4 bg-amber-900/10 border border-amber-700/30 rounded-lg text-amber-500/90 text-sm flex items-start gap-3">
          <div className="mt-0.5 min-w-[4px] h-[4px] bg-amber-500 rounded-full"></div>
          <div>
            <strong className="block mb-1 text-amber-400">Revalidation Window: 10 seconds</strong>
            After the revalidation window, the next request triggers a background regeneration.
            <div className="mt-2 font-mono text-xs text-amber-600 uppercase tracking-widest">
              Cached At: {isrData.cachedAt}
            </div>
          </div>
        </div>

        <section className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-10 w-10 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center text-amber-400 font-semibold font-mono">R</div>
            <h2 className="text-xl font-medium text-neutral-200">Revalidated Data Source</h2>
          </div>

          <div className="bg-neutral-950/50 p-6 rounded-lg border border-neutral-800/50 hover:border-neutral-700 transition-colors duration-300">
            <h3 className="text-lg font-medium text-white mb-3 tracking-wide">{isrData.title}</h3>
            <p className="text-neutral-400 mb-6 leading-relaxed font-light">{isrData.body}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-xs text-neutral-500 font-mono bg-neutral-900/50 py-2 px-3 rounded border border-neutral-800">
                ID: {isrData.id}
              </div>
              <div className="text-xs text-amber-400/80 font-mono bg-amber-900/10 py-2 px-3 rounded border border-amber-900/20 text-right">
                {isrData.cachedAt}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
              <h4 className="text-sm font-semibold text-amber-400 mb-3">How ISR Works</h4>
              <ol className="text-sm text-neutral-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-mono text-xs mt-0.5">1.</span>
                  <span>First request: Serve cached page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-mono text-xs mt-0.5">2.</span>
                  <span>After 10s: Next request triggers regeneration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-mono text-xs mt-0.5">3.</span>
                  <span>Background: New page is generated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-mono text-xs mt-0.5">4.</span>
                  <span>Subsequent requests: Serve new cached page</span>
                </li>
              </ol>
            </div>

            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
              <h4 className="text-sm font-semibold text-neutral-300 mb-3">Best Used For</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-neutral-800 text-neutral-400 text-xs rounded-full border border-neutral-700">Product Listings</span>
                <span className="px-3 py-1 bg-neutral-800 text-neutral-400 text-xs rounded-full border border-neutral-700">News Articles</span>
                <span className="px-3 py-1 bg-neutral-800 text-neutral-400 text-xs rounded-full border border-neutral-700">Blog Index</span>
                <span className="px-3 py-1 bg-neutral-800 text-neutral-400 text-xs rounded-full border border-neutral-700">Search Results</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-900/10 border border-blue-700/30 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-400 mb-2">💡 Try It Out</h4>
            <p className="text-sm text-neutral-400">
              Refresh this page multiple times. Notice the timestamp stays the same within the 10-second window,
              then updates after revalidation completes.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
