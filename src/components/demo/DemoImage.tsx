import Image from 'next/image';

export function DemoImage() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Next.js Image Optimization</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
            alt="Demo Image 1"
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt="Demo Image 2"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Note: These images are automatically optimized for size, format (WebP/AVIF), and lazy loading.
      </p>
    </div>
  );
}
