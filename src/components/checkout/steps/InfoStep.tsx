import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
const infoSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  firstName: z.string().min(2, 'Ce champ est requis'),
  lastName: z.string().min(2, 'Ce champ est requis'),
  address: z.string().min(5, 'Ce champ est requis'),
  address2: z.string().optional(),
  zipCode: z.string().min(4, 'Ce champ est requis'),
  city: z.string().min(2, 'Ce champ est requis'),
  country: z.string().min(2, 'Ce champ est requis'),
  phone: z.string().min(8, 'Ce champ est requis'),
  saveInfo: z.boolean().optional(),
});

export type InfoFormData = z.infer<typeof infoSchema>;

interface InfoStepProps {
  defaultValues?: Partial<InfoFormData>;
  onNext: (data: InfoFormData) => void;
  onBack: () => void;
}

export function InfoStep({ defaultValues, onNext, onBack }: InfoStepProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<InfoFormData>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      country: 'France',
      ...defaultValues,
    }
  });

  const handleNext = async (data: InfoFormData) => {
    // Persist for Advanced Matching in fbq('init') on next page load
    try {
      localStorage.setItem('luliyane_customer', JSON.stringify({
        email: data.email,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
      }));
    } catch {}

    // Save to Supabase
    try {
      const { error } = await supabase
        .from('customers')
        .upsert({
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          address: data.address,
          address2: data.address2,
          zip_code: data.zipCode,
          city: data.city,
          country: data.country,
        }, {
          onConflict: 'email'
        });
      
      if (error) {
        console.error('Error saving customer info to Supabase:', error);
      }
    } catch (err) {
      console.error('Exception saving customer info:', err);
    }

    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(handleNext)} className="flex flex-col gap-6">
      <h2 className="font-cormorant text-2xl text-brand-black-500 uppercase tracking-widest mb-2">
        Informations
      </h2>

      <div>
        <label className="block font-montserrat text-sm text-brand-black-500 mb-2">Email *</label>
        <input 
          {...register('email')}
          type="email"
          className={`w-full h-12 px-4 border bg-transparent font-montserrat focus:outline-none transition-all ${
            errors.email ? 'border-red-500 focus:border-red-500' : 'border-brand-black-200 focus:border-brand-gold-500 focus:bg-brand-black-100/50'
          }`}
        />
        {errors.email && <p className="mt-1 font-montserrat text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-montserrat text-sm text-brand-black-500 mb-2">Prénom *</label>
          <input 
            {...register('firstName')}
            className={`w-full h-12 px-4 border bg-transparent font-montserrat focus:outline-none transition-all ${
              errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-brand-black-200 focus:border-brand-gold-500 focus:bg-brand-black-100/50'
            }`}
          />
          {errors.firstName && <p className="mt-1 font-montserrat text-xs text-red-500">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block font-montserrat text-sm text-brand-black-500 mb-2">Nom *</label>
          <input 
            {...register('lastName')}
            className={`w-full h-12 px-4 border bg-transparent font-montserrat focus:outline-none transition-all ${
              errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-brand-black-200 focus:border-brand-gold-500 focus:bg-brand-black-100/50'
            }`}
          />
          {errors.lastName && <p className="mt-1 font-montserrat text-xs text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <label className="block font-montserrat text-sm text-brand-black-500 mb-2">Adresse *</label>
        <input 
          {...register('address')}
          className={`w-full h-12 px-4 border bg-transparent font-montserrat focus:outline-none transition-all ${
            errors.address ? 'border-red-500 focus:border-red-500' : 'border-brand-black-200 focus:border-brand-gold-500 focus:bg-brand-black-100/50'
          }`}
        />
        {errors.address && <p className="mt-1 font-montserrat text-xs text-red-500">{errors.address.message}</p>}
      </div>

      <div>
        <label className="block font-montserrat text-sm text-brand-black-500 mb-2">Complément d&apos;adresse</label>
        <input 
          {...register('address2')}
          className="w-full h-12 px-4 border border-brand-black-200 bg-transparent font-montserrat focus:outline-none focus:border-brand-gold-500 focus:bg-brand-black-100/50 transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-montserrat text-sm text-brand-black-500 mb-2">Code postal *</label>
          <input 
            {...register('zipCode')}
            className={`w-full h-12 px-4 border bg-transparent font-montserrat focus:outline-none transition-all ${
              errors.zipCode ? 'border-red-500 focus:border-red-500' : 'border-brand-black-200 focus:border-brand-gold-500 focus:bg-brand-black-100/50'
            }`}
          />
          {errors.zipCode && <p className="mt-1 font-montserrat text-xs text-red-500">{errors.zipCode.message}</p>}
        </div>
        <div>
          <label className="block font-montserrat text-sm text-brand-black-500 mb-2">Ville *</label>
          <input 
            {...register('city')}
            className={`w-full h-12 px-4 border bg-transparent font-montserrat focus:outline-none transition-all ${
              errors.city ? 'border-red-500 focus:border-red-500' : 'border-brand-black-200 focus:border-brand-gold-500 focus:bg-brand-black-100/50'
            }`}
          />
          {errors.city && <p className="mt-1 font-montserrat text-xs text-red-500">{errors.city.message}</p>}
        </div>
      </div>

      <div>
        <label className="block font-montserrat text-sm text-brand-black-500 mb-2">Pays *</label>
        <select 
          {...register('country')}
          className={`w-full h-12 px-4 border bg-transparent font-montserrat focus:outline-none transition-all ${
            errors.country ? 'border-red-500 focus:border-red-500' : 'border-brand-black-200 focus:border-brand-gold-500 focus:bg-brand-black-100/50'
          }`}
        >
          <option value="France">France</option>
          <option value="Belgique">Belgique</option>
          <option value="Suisse">Suisse</option>
          <option value="Canada">Canada</option>
          <option value="Autre">Autre</option>
        </select>
        {errors.country && <p className="mt-1 font-montserrat text-xs text-red-500">{errors.country.message}</p>}
      </div>

      <div>
        <label className="block font-montserrat text-sm text-brand-black-500 mb-2">Téléphone *</label>
        <input 
          {...register('phone')}
          type="tel"
          className={`w-full h-12 px-4 border bg-transparent font-montserrat focus:outline-none transition-all ${
            errors.phone ? 'border-red-500 focus:border-red-500' : 'border-brand-black-200 focus:border-brand-gold-500 focus:bg-brand-black-100/50'
          }`}
        />
        {errors.phone && <p className="mt-1 font-montserrat text-xs text-red-500">{errors.phone.message}</p>}
      </div>

      <div className="flex items-center gap-3 mt-2">
        <input 
          {...register('saveInfo')}
          type="checkbox"
          id="saveInfo"
          className="w-5 h-5 border-brand-black-200 text-brand-gold-500 focus:ring-brand-gold-500 rounded-none bg-transparent"
        />
        <label htmlFor="saveInfo" className="font-montserrat text-sm text-brand-black-500">
          Sauvegarder pour la prochaine commande
        </label>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center mt-8 gap-4">
        <button 
          type="button"
          onClick={onBack}
          className="font-montserrat text-sm text-brand-black-400 hover:text-brand-gold-500 transition-colors"
        >
          ← Retour au panier
        </button>
        <button 
          type="submit"
          className="w-full sm:w-auto px-8 h-12 bg-brand-gold-500 text-brand-black-500 font-montserrat font-bold text-sm tracking-wider hover:bg-brand-gold-400 transition-colors"
        >
          CONTINUER VERS LA LIVRAISON →
        </button>
      </div>
    </form>
  );
}
