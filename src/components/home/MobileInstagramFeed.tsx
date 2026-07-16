'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import Image from 'next/image';

const POSTS = [
  { id: 1, image: '/images/instagram/ig_post_1.webp', type: 'photo', likes: 1247, comments: 23, link: 'https://instagram.com/luliyane.paris' },
  { id: 2, image: '/images/instagram/ig_post_2.webp', type: 'carousel', likes: 892, comments: 14, link: 'https://instagram.com/luliyane.paris' },
  { id: 3, image: '/images/instagram/ig_post_3.webp', type: 'photo', likes: 1543, comments: 31, link: 'https://instagram.com/luliyane.paris' },
  { id: 4, image: '/images/instagram/ig_post_4.webp', type: 'video', likes: 2341, comments: 85, link: 'https://instagram.com/luliyane.paris' },
  { id: 5, image: '/images/instagram/ig_post_5.webp', type: 'carousel', likes: 1105, comments: 19, link: 'https://instagram.com/luliyane.paris' },
  { id: 6, image: '/images/instagram/ig_post_6.webp', type: 'photo', likes: 976, comments: 12, link: 'https://instagram.com/luliyane.paris' },
];

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#C5A14E" width="14" height="14">
      <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5.65-7 10-7 10z"/>
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#C5A14E" strokeWidth="1.5" width="14" height="14">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  );
}

function CustomInstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#C5A14E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="#C5A14E" />
    </svg>
  );
}

function AnimatedCounter({ to, duration }: { to: number, duration: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(value) {
        // format with french space
        node.textContent = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }
    });
    return () => controls.stop();
  }, [to, duration]);

  return <span ref={nodeRef}>0</span>;
}

function InstagramTile({ post, index }: { post: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [pulseDelay, setPulseDelay] = useState(0);

  // Diagonal stagger calculation (0 to 4 based on 2x3 grid)
  const row = Math.floor(index / 2);
  const col = index % 2;
  const staggerDelay = (row + col) * 0.08;

  useEffect(() => {
    setPulseDelay(Math.random() * 2);
  }, []);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.92 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: staggerDelay, ease: [0.22, 1, 0.36, 1] } }
      }}
      className="relative aspect-square bg-[#1A1A1A] rounded-[2px] overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
      role="listitem"
    >
      <a 
        href={post.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block w-full h-full"
        aria-label={`Post Instagram, ${post.likes} j'aime, ${post.comments} commentaires`}
        onClick={(e) => {
          // If touch device and not hovered, prevent default to just show overlay
          if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches && !isHovered) {
            e.preventDefault();
            setIsHovered(true);
          }
        }}
      >
        <div className="absolute inset-0 z-0 image-hover-zoom">
          <Image 
            src={post.image} 
            alt="Instagram post" 
            fill 
            className={`object-cover transition-transform duration-[1500ms] ease-out ${isHovered ? 'scale-105 brightness-105' : 'scale-100'}`}
            sizes="(max-width: 480px) 50vw, 33vw"
          />
        </div>

        {/* Content Type Badge */}
        {post.type === 'video' && (
          <div className="absolute top-[8px] right-[8px] z-10 w-[24px] h-[24px] bg-[rgba(0,0,0,0.55)] backdrop-blur-[6px] rounded-full flex items-center justify-center shadow-[inset_0_0_0_1px_rgba(197,161,78,0.3)]">
            <div 
              className="absolute inset-0 border border-[#C5A14E] rounded-full opacity-60 pointer-events-none"
              style={{ animation: `reelPulse 2.6s ease-out infinite ${pulseDelay}s` }}
            />
            <svg viewBox="0 0 8 8" fill="#C5A14E" width="8" height="8" className="ml-[1px]">
              <path d="M2 1 L7 4 L2 7 Z" />
            </svg>
          </div>
        )}
        
        {post.type === 'carousel' && (
          <div className="absolute top-[8px] right-[8px] z-10 w-[24px] h-[24px] bg-[rgba(0,0,0,0.55)] backdrop-blur-[6px] rounded-[4px] flex items-center justify-center">
            <svg viewBox="0 0 12 12" fill="none" stroke="#C5A14E" strokeWidth="1.25" width="10" height="10">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="1" y="1" width="7" height="7" />
            </svg>
          </div>
        )}

        {/* Hover/Tap Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="absolute inset-0 z-20 bg-[rgba(26,26,26,0.65)] backdrop-blur-[4px] flex flex-col items-center justify-center gap-[6px]"
            >
              <div className="flex flex-row items-center gap-[6px] font-body font-normal text-[11px] tracking-[0.16em] text-[#E8D9A8]">
                <HeartIcon />
                <AnimatedCounter to={post.likes} duration={0.8} />
              </div>
              <div className="flex flex-row items-center gap-[6px] font-body font-normal text-[11px] tracking-[0.16em] text-[#E8D9A8]">
                <CommentIcon />
                <AnimatedCounter to={post.comments} duration={0.5} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </a>
    </motion.div>
  );
}

export function MobileInstagramFeed() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [toastVisible, setToastVisible] = useState(false);

  const copyHashtag = () => {
    navigator.clipboard.writeText("#LuliyaneParis");
    if (navigator.vibrate) navigator.vibrate(12);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2400);
  };

  return (
    <section
      ref={containerRef}
      className="md:hidden bg-[#FAF7F2] py-[64px] flex flex-col items-center overflow-hidden"
      aria-labelledby="instagram-title"
    >
      {/* 1. HANDLE + EYEBROW */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-body font-normal text-[11px] tracking-[0.5em] uppercase text-[#5A5247] flex gap-[8px] justify-center mb-[14px]"
        id="instagram-title"
      >
        SUIVEZ-NOUS SUR <span className="text-[#C5A14E]">@luliyane.paris</span>
      </motion.div>

      {/* 2. DECORATIVE DIVIDER */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center gap-[6px] mb-[14px] w-[80px] origin-center"
      >
        <div className="w-[24px] h-[1px] bg-[#C5A14E]" />
        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 0L6 3L3 6L0 3L3 0Z" fill="#C5A14E" />
        </svg>
        <div className="w-[24px] h-[1px] bg-[#C5A14E]" />
      </motion.div>

      {/* 3. FOLLOWER COUNT STRIP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-row items-center font-body font-normal text-[10px] tracking-[0.24em] uppercase text-[#5A5247] mb-[32px] whitespace-nowrap"
      >
        <span className="text-[#1A1A1A] font-medium mr-[4px]">
          12 500
        </span> 
        abonnés
        <span className="text-[#C5A14E] px-[8px]">·</span>
        <span className="text-[#1A1A1A] font-medium mr-[4px]">
          450+
        </span>
        publications
        <span className="text-[#C5A14E] px-[8px]">·</span>
        
        <div className="relative w-[4px] h-[4px] rounded-full bg-[#22C55E] mr-[4px] ml-[2px]">
          <div className="absolute inset-0 bg-[#22C55E] opacity-60 rounded-full w-[4px] h-[4px] pointer-events-none animate-[livePulse_1.8s_ease-out_infinite]" />
        </div>
        Mis à jour il y a 2h
      </motion.div>

      {/* 4. POST GRID */}
      <motion.div 
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-2 gap-[6px] px-[20px] w-full max-w-[480px] mb-[24px]"
        role="list"
      >
        {POSTS.map((post, i) => (
          <InstagramTile key={post.id} post={post} index={i} />
        ))}
      </motion.div>

      {/* 5. UGC HASHTAG CALL-OUT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 3.3, ease: [0.22, 1, 0.36, 1] }}
        className="px-[32px] mb-[32px] text-center"
      >
        <div className="font-body font-normal text-[10px] tracking-[0.5em] uppercase text-[#5A5247] mb-[12px]">
          TAGUEZ VOS PLUS BEAUX MOMENTS
        </div>
        
        <motion.div
          animate={isInView ? { 
            color: ['#C5A14E', '#E8D9A8', '#C5A14E'],
          } : {}}
          transition={{ duration: 1.2, delay: 3.3, times: [0, 0.5, 1] }}
          className="relative inline-block cursor-pointer group"
          onClick={copyHashtag}
        >
          <div className="font-heading italic font-normal text-[24px] tracking-[0.04em] text-[#C5A14E] mb-[8px] transition-colors duration-200 group-active:text-[#E8D9A8]">
            #LuliyaneParis
          </div>
          {/* Subtle gold underline pulse */}
          <motion.div 
            className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#C5A14E] origin-center"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: [0, 1, 0] } : {}}
            transition={{ duration: 1.2, delay: 3.5, times: [0, 0.5, 1], ease: "easeInOut" }}
          />
        </motion.div>

        <div className="font-body font-light text-[11px] text-[#5A5247] mt-[6px]">
          Les meilleurs posts sont repartagés chaque semaine
        </div>
      </motion.div>

      {/* 6. CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.6, delay: 4.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full px-[24px] flex justify-center"
      >
        <a 
          href="https://instagram.com/luliyane.paris"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full max-w-[320px] h-[52px] bg-[#1A1A1A] text-[#E8D9A8] font-body font-normal text-[12px] tracking-[0.32em] uppercase rounded-[2px]"
          aria-label="Suivre LULIYANE PARIS sur Instagram"
        >
          <CustomInstagramIcon className="w-[16px] h-[16px] mr-[10px]" />
          SUIVRE @LULIYANE.PARIS
          <svg 
            className="ml-[12px]" 
            width="6" 
            height="10" 
            viewBox="0 0 6 10" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L5 5L1 9" stroke="#C5A14E" strokeWidth="1.2" strokeLinecap="square"/>
          </svg>
        </a>
      </motion.div>

      {/* TOAST CONFIRMATION */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[80px] left-1/2 -translate-x-1/2 z-50 bg-[rgba(26,26,26,0.95)] backdrop-blur-[8px] px-[18px] py-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
          >
            <div className="font-body font-normal text-[12px] tracking-[0.2em] uppercase text-[#E8D9A8] whitespace-nowrap">
              HASHTAG COPIÉ <span className="text-[#C5A14E]">✓</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
