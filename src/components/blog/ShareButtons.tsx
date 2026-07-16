'use client';

import { useState, useEffect } from 'react';
import { Link as LinkIcon, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function ShareButtons({ title, url }: { title: string, url: string }) {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerClasses = isMobile
    ? "flex items-center justify-center gap-4 py-8 border-y border-brand-black-100 my-8"
    : "sticky top-32 flex flex-col items-center gap-6 p-4";

  return (
    <div className={containerClasses}>
      {!isMobile && (
        <span className="font-montserrat text-xs tracking-widest uppercase text-brand-black-300 mb-2" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Partager
        </span>
      )}

      {isMobile && typeof navigator !== 'undefined' && typeof navigator.share === 'function' ? (
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 font-montserrat text-xs tracking-widest uppercase text-brand-black-500 hover:text-brand-gold-500 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>Partager cet article</span>
        </button>
      ) : (
        <>
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-black-300 hover:text-brand-gold-500 transition-colors"
            aria-label="Partager sur Facebook"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          
          <a 
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-black-300 hover:text-brand-gold-500 transition-colors"
            aria-label="Partager sur Twitter"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </a>

          <a 
            href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-black-300 hover:text-brand-gold-500 transition-colors"
            aria-label="Partager sur Pinterest"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.194 0 7.451 2.99 7.451 6.985 0 4.169-2.627 7.525-6.275 7.525-1.225 0-2.376-.637-2.768-1.385 0 0-.605 2.304-.751 2.868-.272 1.043-1.01 2.348-1.505 3.141 1.488.459 3.064.71 4.706.71 6.621 0 11.986-5.365 11.986-11.985C24 5.367 18.638 0 12.017 0z"/>
            </svg>
          </a>

          <div className="relative">
            <button 
              onClick={copyLink}
              className="text-brand-black-300 hover:text-brand-gold-500 transition-colors"
              aria-label="Copier le lien"
            >
              <LinkIcon className="w-5 h-5" />
            </button>
            {copied && (
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-black-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
              >
                Copié !
              </motion.span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
