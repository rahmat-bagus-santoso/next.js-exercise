import Link from 'next/link';

const fetchingStrategies = [
  {
    category: 'Client-Side',
    items: [
      {
        title: 'CSR - Client Side Rendering',
        href: '/fetching-examples/csr',
        description: 'Fetch data in the browser using useSWR with automatic caching and revalidation.',
        color: 'indigo',
        icon: '🌐',
        timing: 'Runtime (Client)',
      },
    ],
  },
  {
    category: 'Server-Side (Request Time)',
    items: [
      {
        title: 'SSR - Dynamic Fetching',
        href: '/fetching-examples/ssr-dynamic',
        description: 'Fetch fresh data on every request using cache: no-store.',
        color: 'purple',
        icon: '⚡',
        timing: 'Every Request',
      },
      {
        title: 'SSR - Parallel Fetching',
        href: '/fetching-examples/ssr-parallel',
        description: 'Optimize loading time by fetching multiple data sources in parallel.',
        color: 'emerald',
        icon: '🔀',
        timing: 'Every Request',
      },
      {
        title: 'SSR - Streaming',
        href: '/fetching-examples/ssr-streaming',
        description: 'Stream UI components as they become ready using Suspense boundaries.',
        color: 'blue',
        icon: '🌊',
        timing: 'Progressive',
      },
    ],
  },
  {
    category: 'Static & Cached (Build Time)',
    items: [
      {
        title: 'SSG - Static Generation',
        href: '/fetching-examples/ssg-static',
        description: 'Pre-render pages at build time with data cached indefinitely.',
        color: 'green',
        icon: '📦',
        timing: 'Build Time',
      },
      {
        title: 'ISR - Time-Based Revalidation',
        href: '/fetching-examples/isr-revalidate',
        description: 'Static pages that automatically refresh after a time interval.',
        color: 'amber',
        icon: '⏱️',
        timing: 'Interval (10s)',
      },
      {
        title: 'ISR - On-Demand Revalidation',
        href: '/fetching-examples/isr-on-demand',
        description: 'Manually trigger cache revalidation via API for instant updates.',
        color: 'pink',
        icon: '🎯',
        timing: 'Manual Trigger',
      },
    ],
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string; hover: string }> = {
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400', hover: 'hover:border-indigo-500/40' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', hover: 'hover:border-purple-500/40' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', hover: 'hover:border-emerald-500/40' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', hover: 'hover:border-blue-500/40' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400', hover: 'hover:border-green-500/40' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', hover: 'hover:border-amber-500/40' },
  pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/20', text: 'text-pink-400', hover: 'hover:border-pink-500/40' },
};

export default function FetchingExamplesPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans">
      <div className="max-w-5xl mx-auto p-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-light tracking-tight text-white mb-4">
            Next.js Data Fetching Strategies
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Explore different data fetching patterns in Next.js App Router.
            Each strategy has its own trade-offs between performance, freshness, and caching.
          </p>
        </header>

        {/* Comparison Table */}
        <section className="mb-16 overflow-x-auto">
          <h2 className="text-lg font-medium text-neutral-200 mb-4">Quick Comparison</h2>
          <table className="w-full text-sm border border-neutral-800 rounded-lg overflow-hidden">
            <thead className="bg-neutral-900">
              <tr>
                <th className="text-left p-3 text-neutral-400 font-medium">Strategy</th>
                <th className="text-left p-3 text-neutral-400 font-medium">When Fetched</th>
                <th className="text-left p-3 text-neutral-400 font-medium">Cache</th>
                <th className="text-left p-3 text-neutral-400 font-medium">Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-neutral-800">
                <td className="p-3 text-indigo-400">CSR</td>
                <td className="p-3">Client (Browser)</td>
                <td className="p-3">SWR Cache</td>
                <td className="p-3 text-neutral-400">User-specific, interactive data</td>
              </tr>
              <tr className="border-t border-neutral-800 bg-neutral-900/30">
                <td className="p-3 text-purple-400">SSR Dynamic</td>
                <td className="p-3">Every Request</td>
                <td className="p-3">No Cache</td>
                <td className="p-3 text-neutral-400">Real-time data, personalized content</td>
              </tr>
              <tr className="border-t border-neutral-800">
                <td className="p-3 text-green-400">SSG</td>
                <td className="p-3">Build Time</td>
                <td className="p-3">Forever</td>
                <td className="p-3 text-neutral-400">Static content, marketing pages</td>
              </tr>
              <tr className="border-t border-neutral-800 bg-neutral-900/30">
                <td className="p-3 text-amber-400">ISR (Time)</td>
                <td className="p-3">Background</td>
                <td className="p-3">Time-based</td>
                <td className="p-3 text-neutral-400">Semi-static, product listings</td>
              </tr>
              <tr className="border-t border-neutral-800">
                <td className="p-3 text-pink-400">ISR (On-Demand)</td>
                <td className="p-3">Manual Trigger</td>
                <td className="p-3">Until Invalidated</td>
                <td className="p-3 text-neutral-400">CMS updates, webhooks</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Strategy Cards */}
        {fetchingStrategies.map((category) => (
          <section key={category.category} className="mb-12">
            <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-4 pl-1">
              {category.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item) => {
                const colors = colorClasses[item.color];
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group block p-6 rounded-xl border ${colors.border} ${colors.hover} bg-neutral-900/30 backdrop-blur-sm transition-all duration-300 hover:bg-neutral-900/50`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{item.icon}</span>
                      <h3 className={`font-medium ${colors.text} group-hover:text-white transition-colors`}>
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <div className={`inline-block px-2 py-1 text-xs font-mono ${colors.bg} ${colors.text} rounded border ${colors.border}`}>
                      {item.timing}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <footer className="mt-16 pt-8 border-t border-neutral-800 text-center text-neutral-500 text-sm">
          <p>Built with Next.js App Router • Data Fetching Demo</p>
        </footer>
      </div>
    </div>
  );
}
