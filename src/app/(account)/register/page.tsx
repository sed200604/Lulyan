'use client';

import { trackEvent } from '@/lib/meta-capi';

export default function RegisterPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    trackEvent('CompleteRegistration', {
      content_name: 'Account',
      value: 0,
      currency: 'EUR'
    }, {
      email,
      first_name: firstName,
      last_name: lastName
    });

    // Dummy logic
    alert('Account created!');
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <h1 className="text-2xl font-cormorant mb-6 uppercase tracking-widest text-center">Créer un compte</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="firstName" placeholder="Prénom" className="border p-2" required />
        <input name="lastName" placeholder="Nom" className="border p-2" required />
        <input name="email" type="email" placeholder="Email" className="border p-2" required />
        <input name="password" type="password" placeholder="Mot de passe" className="border p-2" required />
        <button type="submit" className="bg-brand-black-900 text-white p-3 uppercase tracking-wider mt-4">
          S'inscrire
        </button>
      </form>
    </div>
  );
}