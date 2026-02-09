async function getUser() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users/1', { cache: 'no-store' });
  // Simulate network delay to make parallel easier to appreciate vs sequential
  await new Promise(r => setTimeout(r, 1000));
  return res.json();
}

async function getPost() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/2', { cache: 'no-store' });
  // Simulate network delay
  await new Promise(r => setTimeout(r, 1000));
  return res.json();
}

export default async function SSRParallelPage() {
  const startTime = Date.now();

  // PARALLEL FETCHING PATTERN
  // 1. Start both requests immediately
  const userPromise = getUser();
  const postPromise = getPost();

  // 2. Await them together using Promise.all
  // Total time will be max(userRequest, postRequest), not sum(userRequest, postRequest)
  const [user, post] = await Promise.all([userPromise, postPromise]);

  const totalTime = Date.now() - startTime;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-emerald-500/30">
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-12 border-b border-neutral-800 pb-8">
          <h1 className="text-3xl font-light tracking-tight text-white mb-3">SSR: Parallel Data Fetching</h1>
          <p className="text-neutral-400 max-w-2xl leading-relaxed">
            This page demonstrates how to fetch data in parallel to minimize "waterfalls" and reduce total loading time.
          </p>
        </header>

        <div className="mb-8 p-4 bg-yellow-900/10 border border-yellow-700/30 rounded-lg text-yellow-500/90 text-sm flex items-start gap-3">
          <div className="mt-0.5 min-w-[4px] h-[4px] bg-yellow-500 rounded-full"></div>
          <div>
            <strong className="block mb-1 text-yellow-400">Performance Simulation Active</strong>
            We added a simulated 1s delay to each request. Sequential fetching would take ~2s. Parallel takes ~1s.
            <div className="mt-2 font-mono text-xs text-yellow-600 uppercase tracking-widest">
              Actual Render Time: {totalTime}ms
            </div>
          </div>
        </div>

        <section className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-10 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-semibold font-mono">2</div>
            <h2 className="text-xl font-medium text-neutral-200">Fetched in Parallel</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-950/50 p-6 rounded-lg border border-neutral-800/50 hover:border-emerald-500/20 transition-all duration-300 group">
              <h3 className="text-sm font-semibold text-emerald-500 tracking-wider uppercase mb-4 border-b border-neutral-800 pb-2">User Data</h3>
              <div className="space-y-3 text-sm text-neutral-400">
                <p className="flex justify-between"><span className="text-neutral-500">Name</span> <span className="text-neutral-300 font-medium">{user.name}</span></p>
                <p className="flex justify-between"><span className="text-neutral-500">Email</span> <span className="text-neutral-300">{user.email}</span></p>
                <p className="flex justify-between"><span className="text-neutral-500">Company</span> <span className="text-neutral-300">{user.company.name}</span></p>
              </div>
            </div>

            <div className="bg-neutral-950/50 p-6 rounded-lg border border-neutral-800/50 hover:border-emerald-500/20 transition-all duration-300 group">
              <h3 className="text-sm font-semibold text-emerald-500 tracking-wider uppercase mb-4 border-b border-neutral-800 pb-2">Post Data</h3>
              <p className="text-neutral-300 text-lg leading-snug font-light group-hover:text-white transition-colors">"{post.title}"</p>
              <p className="text-xs text-neutral-600 mt-4 font-mono text-right">Post ID: {post.id}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
