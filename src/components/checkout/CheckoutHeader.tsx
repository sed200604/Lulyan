import Link from 'next/link';

export function CheckoutHeader() {
  return (
    <div className="relative w-full">
      <header className="h-[60px] bg-white flex items-center justify-between px-5 md:px-8">
        <div className="flex-1" /> {/* Empty left spacer */}
        
        <Link 
          href="/"
          className="font-cormorant font-medium text-[15px] tracking-[0.15em] text-[#2A2A2A] uppercase text-center flex-1"
        >
          Luliyane Paris
        </Link>

        <div className="flex-1 flex justify-end items-center">
          <a 
            href="https://wa.me/33766676429" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-sans text-[12px] text-[#888] hover:text-brand-gold-500 transition-colors flex items-center gap-1.5"
          >
            <span>💬</span>
            <span className="hidden sm:inline">Besoin d'aide?</span>
          </a>
        </div>
      </header>
      <div className="w-full h-[1px] bg-brand-gold-500 opacity-30" />
    </div>
  );
}
