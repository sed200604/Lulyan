import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/data/blog';

interface ArticleCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function ArticleCard({ post, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white z-10">
          <div className="flex items-center gap-3 font-montserrat text-xs tracking-widest uppercase mb-4">
            <span className="bg-brand-gold-500/90 text-brand-black-500 px-3 py-1 font-bold">
              {post.category}
            </span>
            <span>·</span>
            <span>{post.readTime} min de lecture</span>
          </div>

          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl max-w-4xl leading-tight mb-8 drop-shadow-sm group-hover:text-brand-gold-400 transition-colors duration-500">
            {post.title}
          </h2>

          <span className="font-montserrat text-sm tracking-widest uppercase flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
            LIRE L&apos;ARTICLE <span className="text-brand-gold-400">→</span>
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block flex flex-col gap-4">
      <div className="relative w-full aspect-video overflow-hidden bg-brand-cream-100">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          sizes="(max-width: 767px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-brand-gold-500 text-brand-black-500 px-3 py-1 font-montserrat font-bold text-xs tracking-wider uppercase z-10">
          {post.category}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-cormorant text-2xl text-brand-black-500 leading-snug group-hover:text-brand-gold-500 transition-colors duration-300">
          {post.title}
        </h3>
        <p className="font-montserrat text-sm text-brand-black-400 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 font-montserrat text-xs text-brand-black-300 uppercase tracking-widest mt-2">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime} min de lecture</span>
        </div>
      </div>
    </Link>
  );
}
