export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  variantName: string;
  quantity: number;
  price: number;
  image: string;
}

export type OrderStatus = 'En préparation' | 'Expédié' | 'Livré' | 'Annulé';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  trackingNumber?: string;
  shippingAddress: Address;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const MOCK_USER: UserProfile = {
  id: 'usr_01',
  firstName: 'Amina',
  lastName: 'B.',
  email: 'amina@example.com'
};

export const MOCK_ADDRESSES: Address[] = [
  {
    id: 'addr_01',
    firstName: 'Amina',
    lastName: 'B.',
    address1: '15 Rue de la Paix',
    city: 'Paris',
    postalCode: '75002',
    country: 'France',
    phone: '+33 6 12 34 56 78',
    isDefault: true
  },
  {
    id: 'addr_02',
    firstName: 'Amina',
    lastName: 'B.',
    company: 'Bureau',
    address1: '42 Avenue des Champs-Élysées',
    address2: 'Étage 4',
    city: 'Paris',
    postalCode: '75008',
    country: 'France',
    phone: '+33 6 12 34 56 78',
    isDefault: false
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_01',
    orderNumber: 'LYP-2026-0042',
    date: '23 juin 2026',
    status: 'En préparation',
    total: 238.00,
    trackingNumber: 'FR1234567890',
    shippingAddress: MOCK_ADDRESSES[0],
    items: [
      {
        id: 'item_01',
        productId: 'burkini-riviera-noir',
        productName: 'Burkini Riviera',
        variantName: 'Noir - M',
        quantity: 1,
        price: 149.00,
        image: 'https://images.unsplash.com/photo-1621098492850-c86659f8a3ab?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'item_02',
        productId: 'coverup-cotedazur',
        productName: 'Cover-up Côte d\'Azur',
        variantName: 'Beige - L',
        quantity: 1,
        price: 89.00,
        image: 'https://images.unsplash.com/photo-1601004113264-16a751db55c1?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    id: 'ord_02',
    orderNumber: 'LYP-2025-8831',
    date: '15 août 2025',
    status: 'Livré',
    total: 149.00,
    shippingAddress: MOCK_ADDRESSES[0],
    items: [
      {
        id: 'item_03',
        productId: 'burkini-monaco-bleu',
        productName: 'Burkini Monaco',
        variantName: 'Bleu Marine - S',
        quantity: 1,
        price: 149.00,
        image: 'https://images.unsplash.com/photo-1615870020146-24e5ba79b9a6?auto=format&fit=crop&q=80&w=800'
      }
    ]
  }
];
