import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type DeliveryMethod = 'standard' | 'express';

export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
}

export interface ContactInfo {
  email: string;
  newsletter: boolean;
}

export interface CheckoutState {
  contactInfo: ContactInfo;
  shippingAddress: Address;
  deliveryMethod: DeliveryMethod;

  setContactInfo: (updates: Partial<ContactInfo>) => void;
  setShippingAddress: (updates: Partial<Address>) => void;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  clearCheckout: () => void;
}

const emptyAddress: Address = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  zipCode: '',
  city: '',
  country: 'FR',
  phone: '',
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      contactInfo: {
        email: '',
        newsletter: false,
      },
      shippingAddress: { ...emptyAddress },
      deliveryMethod: 'standard',

      setContactInfo: (updates) =>
        set((state) => ({
          contactInfo: { ...state.contactInfo, ...updates },
        })),
      setShippingAddress: (updates) =>
        set((state) => ({
          shippingAddress: { ...state.shippingAddress, ...updates },
        })),
      setDeliveryMethod: (deliveryMethod) =>
        set({ deliveryMethod }),
      clearCheckout: () =>
        set({
          contactInfo: { email: '', newsletter: false },
          shippingAddress: { ...emptyAddress },
          deliveryMethod: 'standard',
        }),
    }),
    {
      name: 'luliyane_checkout_draft',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
