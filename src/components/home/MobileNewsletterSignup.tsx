'use client';

import { useState, useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/meta-capi';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Lock, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Master Easing
const cubicExpoOut = [0.22, 1, 0.36, 1];
const cubicJewelSettle = [0.34, 1.56, 0.64, 1];

// Validation Schema
const schema = z.object({
  email: z.string().email({ message: "Format d'email invalide." }),
  consent: z.boolean().refine((val) => val === true, {
    message: "Le consentement est obligatoire.",
  }),
});

type FormData = z.infer<typeof schema>;

// --- Helper Components ---

// 3.1 Brand Crest (Vertical Diamond Stack)
const BrandCrest = () => (
  <svg width="8" height="36" viewBox="0 0 8 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
    <line x1="4" y1="2" x2="4" y2="10" stroke="#C5A14E" strokeWidth="0.5" strokeOpacity="0.6" />
    <polygon points="4,12 7,15 4,18 1,15" fill="#C5A14E" />
    <line x1="4" y1="20" x2="4" y2="34" stroke="#C5A14E" strokeWidth="0.5" strokeOpacity="0.6" />
  </svg>
);

// 3.5 Custom Diamond Marker
const DiamondMarker = ({ className }: { className?: string }) => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <polygon points="4,0 8,4 4,8 0,4" fill="#C5A14E" />
  </svg>
);

// Animated Counter (0 to target)
const AnimatedCounter = ({ target, suffix = "", prefix = "", format = false, duration = 1.2, delay = 0, trigger }: { target: number, suffix?: string, prefix?: string, format?: boolean, duration?: number, delay?: number, trigger: boolean }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!trigger) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function (expo-out roughly)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(easeProgress * target));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    
    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(step);
    }, delay * 1000);
    
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [target, duration, delay, trigger]);

  const formattedCount = format ? count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : count;

  return <span>{prefix}{formattedCount}{suffix}</span>;
};


export function MobileNewsletterSignup() {
  const [hasViewed, setHasViewed] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView && !hasViewed) {
      setHasViewed(true);
    }
  }, [isInView, hasViewed]);

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'server-error' | 'already-subscribed'>('idle');
  const [successPhase, setSuccessPhase] = useState<0 | 1 | 2>(0);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // For CTA glow

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange', // Validate on change
    defaultValues: {
      email: '',
      consent: false,
    }
  });

  const emailValue = watch('email');
  const consentValue = watch('consent');
  
  const showEmailError = errors.email && touchedFields.email;
  const showConsentError = errors.consent && touchedFields.consent;
  const isEmailValid = !errors.email && emailValue.length > 0;
  
  const isCtaDisabled = !isValid || formStatus === 'loading' || formStatus === 'success';

  const onSubmit = (data: FormData) => {
    setFormStatus('loading');

    // Simulate API Call
    setTimeout(() => {
      setFormStatus('success');
      setSuccessPhase(1);
      trackEvent('Lead', {
        content_name: 'Cercle Newsletter',
        value: 0,
        currency: 'EUR',
      }, { email: data.email });

      setTimeout(() => {
        setSuccessPhase(2);
      }, 1200);

    }, 1500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('BIENVENUE10');
    setCopied(true);
    if (navigator.vibrate) navigator.vibrate(12);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-[72px] pb-[80px] bg-[#0F0F0F] flex justify-center overflow-hidden font-body"
      aria-labelledby="cercle-title"
    >
      {/* Toast for Server Error (Simulated) */}
      <AnimatePresence>
        {formStatus === 'server-error' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-4 right-4 bg-[#B45A3C] text-[#FAF7F2] text-[11px] py-3 px-4 text-center z-50 rounded-sm font-medium tracking-wide"
          >
            Une erreur est survenue. Réessayez dans un instant.
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, border: "1px solid rgba(197,161,78,0)" }}
        animate={hasViewed ? { opacity: 1, border: "1px solid rgba(197,161,78,0.25)" } : {}}
        transition={{ duration: 0.6, ease: cubicExpoOut }}
        className="w-[calc(100%-32px)] max-w-[380px] bg-[linear-gradient(180deg,rgba(197,161,78,0.04)_0%,rgba(197,161,78,0.02)_100%)] rounded-none p-[36px_24px_32px] shadow-[0_24px_60px_rgba(0,0,0,0.4)] relative"
      >
        <AnimatePresence mode="wait">
          {successPhase < 2 ? (
            <motion.form 
              key="signup-form"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center w-full"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}
            >
              
              {/* 1. Brand Crest */}
              <motion.div
                initial={{ opacity: 0, rotate: -15, scale: 0.7 }}
                animate={hasViewed ? { opacity: 1, rotate: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2, ease: cubicJewelSettle }}
                className="mb-[18px]"
              >
                <BrandCrest />
              </motion.div>

              {/* 2. Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={hasViewed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5, ease: cubicExpoOut }}
                className="font-body font-normal text-[10px] tracking-[0.6em] uppercase text-brand-gold-500 mb-[14px] text-center"
              >
                ACCÈS RÉSERVÉ
              </motion.p>

              {/* 3. Headline */}
              <h2 id="cercle-title" className="sr-only">Rejoignez le Cercle Luliyane</h2>
              <div className="font-heading font-light text-[22px] tracking-[0.16em] text-[#FAF7F2] uppercase text-center leading-[1.2] mb-[12px] flex flex-wrap justify-center gap-x-[6px]">
                {/* Simulated letter blur stagger */}
                {"REJOIGNEZ LE CERCLE LULIYANE".split(' ').map((word, wIdx) => (
                  <span key={wIdx} className="inline-flex whitespace-pre">
                    {word.split('').map((char, cIdx) => {
                      const totalIdx = wIdx * 5 + cIdx; // Rough index for stagger
                      return (
                        <motion.span
                          key={cIdx}
                          initial={{ opacity: 0, filter: "blur(4px)" }}
                          animate={hasViewed ? { opacity: 1, filter: "blur(0px)" } : {}}
                          transition={{ duration: 0.4, delay: 0.7 + (totalIdx * 0.03), ease: cubicExpoOut }}
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </span>
                ))}
              </div>

              {/* 4. Welcome Offer Hero */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={hasViewed ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 2.7, ease: cubicExpoOut }}
                className="flex flex-col items-center mb-[24px]"
              >
                <div className="flex flex-row items-baseline justify-center gap-[10px]">
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={hasViewed ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.5, ease: cubicExpoOut }}
                    className="font-heading font-light text-[38px] text-brand-gold-500 tracking-[0.04em] leading-none"
                  >
                    <AnimatedCounter target={10} prefix="−" suffix="%" duration={1.2} delay={1.5} trigger={hasViewed} />
                  </motion.span>
                  <span className="font-body font-normal text-[11px] tracking-[0.4em] text-brand-gold-500 transform translate-y-[-14px]">
                    OFFERTS
                  </span>
                </div>
                <span className="font-body font-light text-[11px] tracking-[0.16em] text-[#9A9189] mt-[4px]">
                  Sur votre première commande
                </span>
              </motion.div>

              {/* 5. Thin Gold Hairline */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={hasViewed ? { scaleX: 1 } : {}}
                transition={{ duration: 0.4, delay: 3.1, ease: cubicExpoOut }}
                className="w-[40px] h-[1px] bg-[rgba(197,161,78,0.3)] mb-[24px]"
              />

              {/* 6. Body Copy */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={hasViewed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 3.3, ease: cubicExpoOut }}
                className="font-body font-light text-[13px] leading-[1.7] tracking-[0.02em] text-[#C9C2B5] text-center max-w-[90%] mb-[28px]"
              >
                Recevez nos nouveautés en avant-première, nos offres réservées aux membres, et l&apos;actualité de nos collections.
              </motion.p>

              {/* 7. Email Input */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={hasViewed ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 3.7, ease: cubicExpoOut }}
                className="w-full mb-[18px]"
              >
                <div className="relative w-full group" data-error={showEmailError} data-valid={isEmailValid}>
                  <label htmlFor="email" className={cn(
                    "absolute top-[-16px] left-0 font-body font-normal text-[9px] tracking-[0.4em] uppercase transition-all duration-280",
                    isEmailValid && !showEmailError ? "text-brand-gold-500 scale-95 origin-left" : "text-[rgba(197,161,78,0.7)] group-focus-within:text-brand-gold-500 group-focus-within:scale-95 group-focus-within:origin-left"
                  )}>
                    ADRESSE EMAIL
                  </label>
                  
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={hasViewed ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: 3.8, ease: cubicExpoOut }}
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-[rgba(232,217,168,0.25)] origin-left pointer-events-none" 
                  />
                  
                  <input
                    id="email"
                    type="email"
                    placeholder="marie@exemple.fr"
                    {...register("email")}
                    className={cn(
                      "w-full h-[52px] bg-transparent border-none text-[#E8D9A8] font-body font-normal text-[14px] tracking-[0.02em] p-[0_0_4px_0] outline-none",
                      "placeholder:text-[rgba(232,217,168,0.4)] placeholder:italic",
                      "caret-brand-gold-500",
                      "border-b border-transparent transition-all duration-280",
                      showEmailError ? "border-b-[#B45A3C] shadow-[inset_0_-1px_0_#B45A3C]" : 
                      isEmailValid ? "border-b-[#22C55E]/50 focus:border-b-brand-gold-500 focus:shadow-[inset_0_-1px_0_#C5A14E]" : 
                      "focus:border-b-brand-gold-500 focus:shadow-[inset_0_-1px_0_#C5A14E]"
                    )}
                    aria-label="Adresse email"
                    aria-invalid={showEmailError ? "true" : "false"}
                  />
                  
                  <AnimatePresence>
                    {showEmailError && (
                      <motion.span 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.24 }}
                        className="text-[#B45A3C] font-body font-normal text-[11px] tracking-[0.02em] block mt-[6px]"
                        aria-live="polite"
                      >
                        {errors.email?.message}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* 8. GDPR Consent Checkbox */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={hasViewed ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 4.2, ease: cubicExpoOut }}
                className="w-full mb-[22px]"
              >
                <label className="flex gap-[10px] items-start cursor-pointer relative group">
                  <input
                    type="checkbox"
                    {...register("consent")}
                    className="absolute opacity-0 pointer-events-none peer"
                    aria-required="true"
                  />
                  <div className={cn(
                    "w-[16px] h-[16px] border bg-transparent shrink-0 mt-[1px] relative transition-all duration-200",
                    consentValue ? "border-brand-gold-500 bg-brand-gold-500" : 
                    showConsentError ? "border-[#B45A3C]" : "border-[rgba(232,217,168,0.4)]"
                  )}>
                    {/* Tick Mark */}
                    <svg className="absolute top-[1px] left-[1px] w-[12px] h-[12px]" viewBox="0 0 12 12" fill="none">
                      <motion.path
                        d="M2 6L5 9L10 3"
                        stroke="#1A1A1A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: consentValue ? 1 : 0 }}
                        transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1], delay: consentValue ? 0.1 : 0 }}
                      />
                    </svg>
                  </div>
                  <span className="font-body font-light text-[10px] text-[rgba(201,194,181,0.7)] leading-[1.5]">
                    J&apos;accepte de recevoir les communications de LULIYANE PARIS et j&apos;ai pris connaissance de la{' '}
                    <a href="/politique-confidentialite" className="text-brand-gold-500 underline" onClick={(e) => e.stopPropagation()}>
                      politique de confidentialité
                    </a>.
                  </span>
                </label>
              </motion.div>

              {/* 9. Primary CTA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={hasViewed ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 4.5, ease: cubicExpoOut }}
                className="w-full"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <motion.button
                  type="submit"
                  disabled={isCtaDisabled}
                  aria-disabled={isCtaDisabled}
                  className={cn(
                    "w-full h-[54px] rounded-none border-none font-body font-medium text-[12px] tracking-[0.4em] uppercase transition-all duration-240 relative overflow-hidden",
                    formStatus === 'success' ? "bg-[#1A1A1A] text-brand-gold-500" :
                    isCtaDisabled ? "bg-[rgba(197,161,78,0.25)] text-[rgba(26,26,26,0.5)] cursor-not-allowed shadow-none" :
                    "bg-brand-gold-500 text-brand-black-950 active:scale-98 active:bg-[#A88838] hover:bg-[#D4B25E]"
                  )}
                  style={!isCtaDisabled ? {
                    boxShadow: isHovered 
                      ? '0 12px 32px rgba(197,161,78,0.35)' 
                      : '0 8px 20px rgba(197,161,78,0.18)'
                  } : {}}
                >
                  <AnimatePresence mode="wait">
                    {formStatus === 'loading' ? (
                      <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center items-center gap-[6px] absolute inset-0"
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-[6px] h-[6px] rounded-full bg-brand-black-950"
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.7, 1, 0.7] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </motion.div>
                    ) : formStatus === 'success' ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center items-center gap-2 absolute inset-0 text-brand-gold-500"
                      >
                        BIENVENUE <Check className="w-4 h-4" />
                      </motion.div>
                    ) : formStatus === 'already-subscribed' ? (
                      <motion.span key="already" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center">
                        DÉJÀ MEMBRE — VOIR LES PRIVILÈGES →
                      </motion.span>
                    ) : (
                      <motion.span key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center">
                        REJOINDRE LE CERCLE
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Idle Pulse for CTA (only when valid, idle, not hovered) */}
                  {!isCtaDisabled && formStatus === 'idle' && !isHovered && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{
                        boxShadow: [
                          'inset 0 0 0 0 rgba(197,161,78,0)',
                          'inset 0 0 20px 4px rgba(255,255,255,0.2)',
                          'inset 0 0 0 0 rgba(197,161,78,0)'
                        ]
                      }}
                      transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
                    />
                  )}
                </motion.button>
              </motion.div>

              {/* 10. Micro-copy */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={hasViewed ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 4.9, ease: cubicExpoOut }}
                className="mt-[14px] flex items-center justify-center gap-1"
              >
                <Lock className="w-[10px] h-[10px] text-brand-gold-500 opacity-70" strokeWidth={1.5} />
                <span className="font-body font-light text-[9px] tracking-[0.32em] uppercase text-[rgba(154,145,137,0.7)] text-center">
                  Aucun spam · Désinscription en 1 clic
                </span>
              </motion.div>

              {/* 11. Benefits List */}
              <div className="mt-[28px] flex flex-col gap-[14px] w-full px-2">
                {[
                  "Accès anticipé aux nouvelles collections",
                  "Invitations aux ventes privées"
                ].map((text, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 8 }}
                    animate={hasViewed ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 5.2 + (i * 0.1), ease: cubicExpoOut }}
                    className="flex flex-row gap-[12px] items-center"
                  >
                    <motion.div
                      initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
                      animate={hasViewed ? { opacity: 1, rotate: 0, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 5.2 + (i * 0.1), ease: cubicJewelSettle }}
                    >
                      <DiamondMarker className="shrink-0 mt-[1px]" />
                    </motion.div>
                    <span className="font-body font-light text-[12px] tracking-[0.04em] text-[#C9C2B5] leading-[1.5]">
                      {text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* 12. Social Proof Footer */}
              <div className="mt-[24px] flex flex-col items-center w-full">
                <motion.hr 
                  initial={{ scaleX: 0 }}
                  animate={hasViewed ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: 5.8, ease: cubicExpoOut }}
                  className="w-[40px] h-[1px] bg-[rgba(197,161,78,0.3)] border-none mx-auto mb-[18px]" 
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={hasViewed ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 6.0, ease: cubicExpoOut }}
                  className="font-body font-normal text-[10px] tracking-[0.32em] uppercase text-brand-gold-500 text-center"
                >
                  Rejoignez{" "}
                  <motion.strong 
                    className="font-medium text-[11px] text-[#E8D9A8]"
                    animate={hasViewed ? {
                      color: ["#E8D9A8", "#C5A14E", "#E8D9A8"],
                    } : {}}
                    transition={{ duration: 0.3, delay: 7.4 }}
                  >
                    <AnimatedCounter target={12480} format={true} duration={1.4} delay={6.0} trigger={hasViewed} />
                  </motion.strong>{" "}
                  abonnées privilégiées
                </motion.p>
              </div>

            </motion.form>
          ) : (
            /* 3.7 Success State */
            <motion.div
              key="success-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: cubicExpoOut }}
              className="flex flex-col items-center w-full min-h-[300px] justify-center"
            >
              {/* Animated Gold Check Seal */}
              <div className="relative w-[56px] h-[56px] flex items-center justify-center mb-2">
                <motion.svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <motion.circle 
                    cx="28" cy="28" r="27" 
                    stroke="#C5A14E" strokeWidth="1" strokeDasharray="4 4"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <motion.path 
                    d="M18 28L25 35L38 21" 
                    stroke="#C5A14E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: cubicExpoOut }}
                  />
                </motion.svg>
              </div>

              <h3 className="font-body font-normal text-[10px] tracking-[0.5em] uppercase text-brand-gold-500 mt-[18px] text-center">
                BIENVENUE DANS LE CERCLE
              </h3>
              
              <h4 className="font-heading font-light italic text-[18px] text-[#FAF7F2] mt-[14px] text-center">
                Votre code de bienvenue
              </h4>

              {/* Code Box */}
              <motion.button
                onClick={handleCopyCode}
                className="relative mt-[18px] w-full max-w-[280px] bg-[rgba(197,161,78,0.06)] p-[16px_24px] cursor-pointer group flex justify-center items-center"
              >
                {/* Animated Dashed Border */}
                <motion.svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <motion.rect 
                    width="100%" height="100%" 
                    fill="none" stroke="#C5A14E" strokeWidth="1" strokeDasharray="6 4"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 0.6, ease: "linear" }}
                  />
                </motion.svg>

                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div
                    className="w-[10px] h-[200%] bg-white/20 absolute -top-1/2 left-0 transform -rotate-45"
                    animate={{ x: [-50, 400] }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 6 }}
                  />
                </motion.div>

                <div className="font-heading font-normal text-[22px] tracking-[0.32em] text-brand-gold-500 flex relative">
                  {"BIENVENUE10".split('').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1, delay: 0.6 + (i * 0.06) }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
                
                {/* Toast Copy */}
                <AnimatePresence>
                  {copied && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-brand-gold-500 text-brand-black-950 font-body text-[10px] font-bold tracking-widest px-3 py-1.5 whitespace-nowrap"
                    >
                      CODE COPIÉ ✓
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <p className="font-body font-light text-[11px] text-[#9A9189] mt-[12px] text-center px-4">
                Valable sur votre première commande · expire dans 30 jours
              </p>

              <button 
                type="button"
                className="mt-[24px] w-full max-w-[280px] h-[48px] border border-brand-gold-500 text-brand-gold-500 font-body font-normal text-[11px] tracking-[0.32em] uppercase hover:bg-brand-gold-500 hover:text-brand-black-950 transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Simple action for demo
              >
                DÉCOUVRIR LA BOUTIQUE
              </button>

            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
