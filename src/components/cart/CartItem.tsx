import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { CartItem as CartItemType } from '@/types/product';

interface CartItemProps {
  item: CartItemType;
  variant?: 'drawer' | 'page';
}

export function CartItem({ item, variant = 'drawer' }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleDecrease = () => updateQuantity(item.id, item.quantity - 1);
  const handleIncrease = () => updateQuantity(item.id, item.quantity + 1);

  if (variant === 'drawer') {
    return (
      <div className="flex gap-4 py-6 border-b border-brand-black-100/50">
        <div className="relative w-20 h-[100px] flex-shrink-0 bg-brand-cream-200">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col flex-grow justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-montserrat font-bold text-base text-brand-black-500">
                {item.name}
              </h3>
              <p className="font-montserrat text-sm text-brand-black-400 mt-1">
                {item.color} · {item.size}
              </p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-brand-black-300 hover:text-red-500 transition-colors p-1"
              aria-label="Remove item"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex justify-between items-end mt-4">
            <div className="flex items-center border border-brand-black-200">
              <button
                onClick={handleDecrease}
                disabled={item.quantity <= 1}
                className="w-8 h-8 flex items-center justify-center text-brand-black-400 hover:text-brand-black-500 disabled:opacity-50 transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center font-montserrat text-sm text-brand-black-500">
                {item.quantity}
              </span>
              <button
                onClick={handleIncrease}
                disabled={item.quantity >= 10}
                className="w-8 h-8 flex items-center justify-center text-brand-black-400 hover:text-brand-black-500 disabled:opacity-50 transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <span className="font-montserrat text-brand-black-500">
              {(item.price * item.quantity).toFixed(2)} €
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Page variant
  return (
    <div className="flex gap-6 py-8 border-b border-brand-black-100/50">
      <div className="relative w-32 h-[160px] flex-shrink-0 bg-brand-cream-200">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-montserrat font-bold text-lg text-brand-black-500">
              {item.name}
            </h3>
            <p className="font-montserrat text-brand-black-400 mt-1">
              Couleur: {item.color}
            </p>
            <p className="font-montserrat text-brand-black-400">
              Taille: {item.size}
            </p>
            <div className="flex gap-4 mt-4">
              <button className="text-sm text-brand-gold-500 underline underline-offset-4 hover:text-brand-black-500 transition-colors">
                Déplacer vers la wishlist
              </button>
            </div>
          </div>
          <span className="font-montserrat font-medium text-lg text-brand-black-500">
            {(item.price * item.quantity).toFixed(2)} €
          </span>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center border border-brand-black-200">
            <button
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
              className="w-10 h-10 flex items-center justify-center text-brand-black-400 hover:text-brand-black-500 disabled:opacity-50 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input 
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val)) updateQuantity(item.id, val);
              }}
              min="1"
              max="10"
              className="w-12 h-10 text-center font-montserrat text-brand-black-500 border-none focus:ring-0 appearance-none bg-transparent"
            />
            <button
              onClick={handleIncrease}
              disabled={item.quantity >= 10}
              className="w-10 h-10 flex items-center justify-center text-brand-black-400 hover:text-brand-black-500 disabled:opacity-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-brand-black-300 hover:text-red-500 transition-colors p-2"
            aria-label="Remove item"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}