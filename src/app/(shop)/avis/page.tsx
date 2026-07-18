'use client';
import { useState } from 'react';

export default function AvisPage() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [size, setSize] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Upload photos to Supabase Storage, save review with is_published: false
    // ...
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-[600px] mx-auto px-6 py-32 text-center">
        <h1 className="font-serif text-[32px] font-light mb-4">Merci pour votre avis !</h1>
        <p className="text-neutral-500 font-serif italic">Votre retour sera publié prochainement après modération.</p>
      </div>
    );
  }

  return (
    <article className="max-w-[600px] mx-auto px-6 py-16">
      <header className="text-center mb-12">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#B8956A] mb-3">
          ─── Vos retours ───
        </p>
        <h1 className="font-serif text-[32px] font-light">
          Partagez votre expérience
        </h1>
        <p className="mt-3 font-serif italic text-[14px] text-neutral-500">
          Votre avis aide d'autres femmes à trouver leur pièce parfaite.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="text-[11px] uppercase tracking-widest text-neutral-500">
            Votre note
          </label>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                aria-label={`${n} étoile${n > 1 ? 's' : ''}`}
                className="text-2xl transition-transform hover:scale-110"
              >
                <span style={{ color: n <= rating ? '#B8956A' : '#DDD' }}>★</span>
              </button>
            ))}
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] uppercase tracking-widest text-neutral-500">Prénom</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-2 w-full h-12 px-4 border border-neutral-200 rounded-lg focus:border-[#B8956A] focus:outline-none" />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-widest text-neutral-500">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-2 w-full h-12 px-4 border border-neutral-200 rounded-lg focus:border-[#B8956A] focus:outline-none" />
          </div>
        </div>
        
        <div>
          <label className="text-[11px] uppercase tracking-widest text-neutral-500">Taille achetée</label>
          <input type="text" value={size} onChange={(e) => setSize(e.target.value)} placeholder="ex. 38" className="mt-2 w-full h-12 px-4 border border-neutral-200 rounded-lg focus:border-[#B8956A] focus:outline-none" />
        </div>

        <div>
          <label className="text-[11px] uppercase tracking-widest text-neutral-500">Votre avis</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} required rows={4} className="mt-2 w-full p-4 border border-neutral-200 rounded-lg focus:border-[#B8956A] focus:outline-none"></textarea>
        </div>

        {/* Photo upload */}
        <div>
          <label className="text-[11px] uppercase tracking-widest text-neutral-500">
            Ajouter une photo (optionnel)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setPhotos(Array.from(e.target.files ?? []))}
            className="mt-2 block w-full text-[13px]"
          />
          <p className="mt-1 text-[11px] italic text-neutral-500 font-serif">
            Les avis avec photo aident 3x plus les autres clientes. Merci du fond du cœur.
          </p>
          {photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              {photos.map((p, i) => (
                <img key={i} src={URL.createObjectURL(p)} alt="" className="rounded aspect-square object-cover" />
              ))}
            </div>
          )}
        </div>

        {/* Consent */}
        <label className="flex gap-2 text-[12px] text-neutral-600">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>J'accepte que mon prénom et photo soient publiés sur luliyan-paris.com</span>
        </label>

        <button type="submit" disabled={!consent || rating === 0} className="w-full bg-[#2A2A2A] text-white py-4 rounded-lg tracking-widest uppercase text-[13px] disabled:opacity-50">
          Envoyer mon avis
        </button>
      </form>
    </article>
  );
}
