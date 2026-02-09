export const dynamic = 'force-dynamic';

async function getDynamicData() {
  // cache: 'no-store' ensures this runs on every request
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch dynamic data');

  const data = await res.json();
  return { ...data, fetchedAt: new Date().toISOString() };
}

export default async function SSRDynamicPage() {
  const dynamicData = await getDynamicData();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-12 border-b border-neutral-800 pb-8">
          <h1 className="text-3xl font-light tracking-tight text-white mb-3">SSR: Dynamic Fetching</h1>
          <p className="text-neutral-400 max-w-2xl leading-relaxed">
            This page is dynamically rendered on <strong className="text-purple-400 font-medium">every request</strong>.
            The server fetches fresh data each time you access this route.
          </p>
        </header>

        <section className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-10 w-10 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-semibold font-mono">1</div>
            <h2 className="text-xl font-medium text-neutral-200">Dynamic Data Source</h2>
          </div>

          <div className="bg-neutral-950/50 p-6 rounded-lg border border-neutral-800/50 hover:border-neutral-700 transition-colors duration-300">
            <h3 className="text-lg font-medium text-white mb-3 tracking-wide">{dynamicData.title}</h3>
            <p className="text-neutral-400 mb-6 leading-relaxed font-light">{dynamicData.body}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-xs text-neutral-500 font-mono bg-neutral-900/50 py-2 px-3 rounded border border-neutral-800">
                ID: {dynamicData.id}
              </div>
              <div className="text-xs text-purple-400/80 font-mono bg-purple-900/10 py-2 px-3 rounded border border-purple-900/20 text-right">
                {dynamicData.fetchedAt}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-500 font-medium tracking-wide uppercase">Refresh to update</p>
          </div>
        </section>
      </div>
    </div>
  );
}
