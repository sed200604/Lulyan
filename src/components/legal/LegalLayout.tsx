'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronDown, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  title: string;
}

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  tocItems: TocItem[];
  children: React.ReactNode;
  currentPage: '/cgv' | '/mentions-legales' | '/confidentialite' | '/cookies';
}

const LEGAL_PAGES = [
  { path: '/cgv', label: 'Conditions Générales de Vente' },
  { path: '/mentions-legales', label: 'Mentions Légales' },
  { path: '/confidentialite', label: 'Politique de Confidentialité' },
  { path: '/cookies', label: 'Politique de Cookies' },
];

export function LegalLayout({ title, lastUpdated, tocItems, children, currentPage }: LegalLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>(tocItems[0]?.id || '');
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find the current section
      let current = '';
      for (const item of tocItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust offset to trigger section switch appropriately
          if (rect.top <= 150) {
            current = item.id;
          }
        }
      }
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  const scrollToSection = (id: string) => {
    setIsMobileTocOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100; // offset for header
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream-50 pt-24 pb-16">
      <div className="container px-4 md:px-8 max-w-[1200px] mx-auto">
        
        {/* Breadcrumb - Hidden in print */}
        <div className="flex items-center gap-2 font-montserrat text-xs text-brand-black-400 mb-8 uppercase tracking-widest print:hidden">
          <Link href="/" className="hover:text-brand-black-500 transition-colors">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-black-500">{title}</span>
        </div>

        {/* Header */}
        <div className="mb-12 print:mb-8 text-center md:text-left">
          <h1 className="font-cormorant text-4xl md:text-5xl text-brand-black-500 mb-4">
            {title}
          </h1>
          <p className="font-montserrat text-sm text-brand-black-400 italic">
            Dernière mise à jour : {lastUpdated}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          
          {/* Mobile TOC Toggle - Hidden in print */}
          <div className="lg:hidden print:hidden">
            <button 
              onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
              className="flex items-center justify-between w-full p-4 bg-white border border-brand-black-100 font-montserrat font-bold text-xs uppercase tracking-widest text-brand-black-500"
            >
              <div className="flex items-center gap-2">
                <Menu className="w-4 h-4" />
                Sommaire
              </div>
              <ChevronDown className={cn("w-4 h-4 transition-transform", isMobileTocOpen && "rotate-180")} />
            </button>
            
            {/* Mobile TOC Content */}
            {isMobileTocOpen && (
              <div className="bg-white border-x border-b border-brand-black-100 p-4 flex flex-col gap-3">
                {tocItems.map((item) => (
                  <button
                    key={`mobile-${item.id}`}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "text-left font-montserrat text-sm transition-colors",
                      activeSection === item.id ? "text-brand-gold-600 font-bold" : "text-brand-black-400 hover:text-brand-black-500"
                    )}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Sidebar TOC - Hidden in print */}
          <aside className="hidden lg:block w-64 shrink-0 print:hidden">
            <div className="sticky top-32">
              <h3 className="font-montserrat font-bold text-xs uppercase tracking-widest text-brand-black-500 mb-6">
                Sommaire
              </h3>
              <nav className="flex flex-col gap-4 border-l border-brand-black-100 pl-4">
                {tocItems.map((item) => (
                  <button
                    key={`desktop-${item.id}`}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "text-left font-montserrat text-sm transition-all duration-300 relative",
                      activeSection === item.id ? "text-brand-gold-600 font-bold" : "text-brand-black-400 hover:text-brand-black-500"
                    )}
                  >
                    {activeSection === item.id && (
                      <motion.div 
                        layoutId="activeSectionIndicator"
                        className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-[2px] h-4 bg-brand-gold-500"
                      />
                    )}
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-[800px] prose prose-brand">
            {children}
          </main>

        </div>

        {/* Bottom Cross-Navigation - Hidden in print */}
        <div className="mt-24 pt-12 border-t border-brand-black-100 print:hidden">
          <h3 className="font-cormorant text-2xl text-brand-black-500 mb-6 text-center">
            Autres informations légales
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {LEGAL_PAGES.filter(p => p.path !== currentPage).map(page => (
              <Link 
                key={page.path}
                href={page.path}
                className="px-6 py-3 border border-brand-black-200 font-montserrat text-xs font-bold uppercase tracking-widest text-brand-black-500 hover:bg-brand-black-500 hover:text-white transition-colors"
              >
                {page.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
