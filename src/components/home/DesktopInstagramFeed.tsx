'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

const INSTAGRAM_POSTS = [
  { id: 1, image: 'https://images.unsplash.com/photo-1544365558-35aa4afcf11f?q=80&w=400&auto=format&fit=crop', link: 'https://instagram.com/luliyane.paris' },
  { id: 2, image: 'https://images.unsplash.com/photo-1572495532056-8583af1cbf11?q=80&w=400&auto=format&fit=crop', link: 'https://instagram.com/luliyane.paris' },
  { id: 3, image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=400&auto=format&fit=crop', link: 'https://instagram.com/luliyane.paris' },
  { id: 4, image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=400&auto=format&fit=crop', link: 'https://instagram.com/luliyane.paris' },
  { id: 5, image: 'https://images.unsplash.com/photo-1515347619152-16a8c4bd4f58?q=80&w=400&auto=format&fit=crop', link: 'https://instagram.com/luliyane.paris' },
  { id: 6, image: 'https://images.unsplash.com/photo-1434389678369-182cb058e5dc?q=80&w=400&auto=format&fit=crop', link: 'https://instagram.com/luliyane.paris' },
];

export function DesktopInstagramFeed() {
  return (
    <section className="hidden md:block py-section bg-brand-cream-50 overflow-hidden">
      <SectionHeader 
        overline="SUIVEZ-NOUS SUR INSTAGRAM" 
        title="" 
        subtitle="@luliyane.paris"
        ornament={true} 
      />

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          animate: { transition: { staggerChildren: 0.06 } }
        }}
        className="w-full flex md:grid md:grid-cols-3 lg:grid-cols-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar -mx-container md:mx-0 px-container md:px-0"
      >
        {INSTAGRAM_POSTS.map((post) => (
          <motion.a
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              initial: { opacity: 0, scale: 0.95 },
              animate: { 
                opacity: 1, 
                scale: 1,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
              }
            }}
            className="group relative snap-center shrink-0 w-[70vw] md:w-auto aspect-square bg-brand-cream-100 overflow-hidden"
          >
            <Image
              src={post.image}
              alt="Instagram post Luliyane Paris"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 70vw, (max-width: 1024px) 33vw, 16vw"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 text-white">
              <InstagramIcon className="w-8 h-8 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
              <span className="font-accent text-sm tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                Voir sur Instagram
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>

      <div className="flex justify-center mt-12">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center border border-brand-gold-500 px-8 py-4 text-brand-gold-600 font-accent text-overline tracking-[0.1em] hover:bg-brand-gold-500 hover:text-white transition-colors duration-300"
        >
          <InstagramIcon className="w-4 h-4 mr-3" />
          SUIVRE @luliyane.paris
        </a>
      </div>
    </section>
  );
}