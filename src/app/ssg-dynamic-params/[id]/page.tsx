import Link from 'next/link';

// This function runs at BUILD TIME
// It tells Next.js which dynamic routes to pre-render
export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
  const posts = await res.json();

  return posts.map((post: { id: number }) => ({
    id: post.id.toString(),
  }));
}

async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: 'force-cache',
  });

  if (!res.ok) throw new Error('Failed to fetch post');

  const data = await res.json();
  return { ...data, generatedAt: new Date().toISOString() };
}

export default async function DynamicPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-8">
          <Link
            href="/fetching-examples/ssg-dynamic-params"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-2 mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Posts
          </Link>
          <h1 className="text-3xl font-light tracking-tight text-white mb-3">
            Post #{post.id}
          </h1>
          <p className="text-neutral-400 leading-relaxed">
            This page was <strong className="text-cyan-400 font-medium">pre-rendered at build time</strong> using generateStaticParams.
          </p>
        </header>

        <section className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 font-bold font-mono text-lg">
              {post.id}
            </div>
            <div>
              <h2 className="text-xl font-medium text-neutral-200">Static Dynamic Route</h2>
              <p className="text-xs text-neutral-500 font-mono">Route: /ssg-dynamic-params/{post.id}</p>
            </div>
          </div>

          <div className="bg-neutral-950/50 p-6 rounded-lg border border-neutral-800/50">
            <h3 className="text-lg font-medium text-white mb-3 tracking-wide capitalize">
              {post.title}
            </h3>
            <p className="text-neutral-400 mb-6 leading-relaxed font-light">{post.body}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-xs text-neutral-500 font-mono bg-neutral-900/50 py-2 px-3 rounded border border-neutral-800">
                User ID: {post.userId}
              </div>
              <div className="text-xs text-cyan-400/80 font-mono bg-cyan-900/10 py-2 px-3 rounded border border-cyan-900/20 text-right">
                {post.generatedAt}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-cyan-900/10 border border-cyan-700/30 rounded-lg">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">💡 Static Generation Benefit</h4>
            <p className="text-sm text-neutral-400">
              This page loads instantly because it was generated at build time.
              The timestamp above shows when the page was created, not when you accessed it.
            </p>
          </div>
        </section>

        <div className="mt-8 flex gap-4">
          {Number(post.id) > 1 && (
            <Link
              href={`/fetching-examples/ssg-dynamic-params/${Number(post.id) - 1}`}
              className="px-4 py-2 bg-neutral-800 border border-neutral-700 text-neutral-300 text-sm rounded-lg hover:bg-neutral-700 transition-colors"
            >
              ← Previous Post
            </Link>
          )}
          {Number(post.id) < 6 && (
            <Link
              href={`/fetching-examples/ssg-dynamic-params/${Number(post.id) + 1}`}
              className="px-4 py-2 bg-cyan-600 text-white text-sm rounded-lg hover:bg-cyan-500 transition-colors ml-auto"
            >
              Next Post →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
