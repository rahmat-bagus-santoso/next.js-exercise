async function getStaticData() {
  // Default cache behavior (force-cache) fetches data at BUILD TIME
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/3', {
    cache: 'force-cache', // This is the default - data is cached indefinitely
  });

  if (!res.ok) throw new Error('Failed to fetch static data');

  const data = await res.json();
  return { ...data, generatedAt: new Date().toISOString() };
}

export default async function SSGStaticPage() {
  const staticData = await getStaticData();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-green-500/30">
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-12 border-b border-neutral-800 pb-8">
          <h1 className="text-3xl font-light tracking-tight text-white mb-3">SSG: Static Site Generation</h1>
          <p className="text-neutral-400 max-w-2xl leading-relaxed">
            This page is generated at <strong className="text-green-400 font-medium">build time</strong>.
            The data is fetched once and cached forever until the next build.
          </p>
        </header>

        <section className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-10 w-10 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center text-green-400 font-semibold font-mono">S</div>
            <h2 className="text-xl font-medium text-neutral-200">Static Data Source</h2>
          </div>

          <div className="bg-neutral-950/50 p-6 rounded-lg border border-neutral-800/50 hover:border-neutral-700 transition-colors duration-300">
            <h3 className="text-lg font-medium text-white mb-3 tracking-wide">{staticData.title}</h3>
            <p className="text-neutral-400 mb-6 leading-relaxed font-light">{staticData.body}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-xs text-neutral-500 font-mono bg-neutral-900/50 py-2 px-3 rounded border border-neutral-800">
                ID: {staticData.id}
              </div>
              <div className="text-xs text-green-400/80 font-mono bg-green-900/10 py-2 px-3 rounded border border-green-900/20 text-right">
                {staticData.generatedAt}
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-green-900/10 border border-green-700/30 rounded-lg">
            <h4 className="text-sm font-semibold text-green-400 mb-2">How It Works</h4>
            <ul className="text-sm text-neutral-400 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Data is fetched during <code className="bg-neutral-800 px-1.5 py-0.5 rounded text-green-300 font-mono text-xs">next build</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>HTML is pre-rendered and served from CDN/cache</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Refresh the page - timestamp won't change until rebuild</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
            <h4 className="text-sm font-semibold text-neutral-300 mb-2">Best Used For</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-neutral-800 text-neutral-400 text-xs rounded-full border border-neutral-700">Marketing Pages</span>
              <span className="px-3 py-1 bg-neutral-800 text-neutral-400 text-xs rounded-full border border-neutral-700">Blog Posts</span>
              <span className="px-3 py-1 bg-neutral-800 text-neutral-400 text-xs rounded-full border border-neutral-700">Documentation</span>
              <span className="px-3 py-1 bg-neutral-800 text-neutral-400 text-xs rounded-full border border-neutral-700">Portfolio Sites</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
