import Link from 'next/link';

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6', {
    cache: 'force-cache',
  });
  return res.json();
}

export default async function SSGDynamicParamsIndexPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-12 border-b border-neutral-800 pb-8">
          <h1 className="text-3xl font-light tracking-tight text-white mb-3">SSG: Dynamic Routes</h1>
          <p className="text-neutral-400 max-w-2xl leading-relaxed">
            Pre-render <strong className="text-cyan-400 font-medium">dynamic routes at build time</strong> using{' '}
            <code className="bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-cyan-400 font-mono text-sm">
              generateStaticParams
            </code>
          </p>
        </header>

        <div className="mb-8 p-4 bg-cyan-900/10 border border-cyan-700/30 rounded-lg">
          <h4 className="text-sm font-semibold text-cyan-400 mb-2">How It Works</h4>
          <p className="text-sm text-neutral-400">
            The <code className="text-cyan-300 font-mono">generateStaticParams</code> function tells Next.js which
            dynamic route parameters to pre-render at build time. Each post below links to a pre-rendered page.
          </p>
        </div>

        <section className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-10 w-10 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 font-semibold font-mono">D</div>
            <h2 className="text-xl font-medium text-neutral-200">Pre-rendered Posts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post: { id: number; title: string }) => (
              <Link
                key={post.id}
                href={`/fetching-examples/ssg-dynamic-params/${post.id}`}
                className="group block p-4 bg-neutral-950/50 rounded-lg border border-neutral-800/50 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded border border-cyan-900/30">
                    #{post.id}
                  </span>
                  <p className="text-sm text-neutral-300 group-hover:text-white transition-colors line-clamp-1">
                    {post.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 bg-neutral-900/30 border border-neutral-800 p-6 rounded-xl">
          <h3 className="text-lg font-medium text-neutral-200 mb-4">Code Example</h3>
          <pre className="text-xs bg-neutral-950 p-4 rounded-lg border border-neutral-800 overflow-x-auto">
            <code className="text-neutral-300">{`// app/post/[id]/page.tsx

// This function runs at build time
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json());

  // Return an array of params to pre-render
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

// Page component receives params
export default async function PostPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const post = await getPost(params.id);
  return <div>{post.title}</div>;
}`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
