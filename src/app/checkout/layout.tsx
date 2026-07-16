import { CheckoutHeader } from '@/components/checkout/CheckoutHeader';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-body">
      <CheckoutHeader />

      <main className="flex-1 w-full max-w-7xl mx-auto px-5 md:px-8 py-8 lg:py-12">
        {children}
      </main>


      <footer className="py-8 text-center font-sans text-[12px] text-brand-black-300">
        <p>© {new Date().getFullYear()} LULIYANE PARIS. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
