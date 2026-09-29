'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import ArrowUp from '@/icons/ArrowUp';
import { twMerge } from '@/lib/twMerge/twMerge';

export default function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations();

  // Show button when page is scrolled down
  const toggleVisibility = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsVisible(window.scrollY > window.innerHeight);
    }
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    //Remove # anchors from url when scrolling up
    history.replaceState(null, document.title, window.location.pathname);
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [toggleVisibility]);

  return (
    <button
      onClick={scrollToTop}
      aria-label={t('goToTop') ?? 'Go to top'}
      className={twMerge(
        'fixed right-8 bottom-8 z-40 cursor-pointer rounded-full bg-slate-blue-95 p-3 text-white outline-autumn-storm-60 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm/40 hover:shadow-white-100/70 focus:outline-none focus-visible:outline-dotted focus-visible:outline-2 focus-visible:outline-offset-2',
        isVisible ? 'block' : 'hidden',
      )}
    >
      <ArrowUp size={24} />
    </button>
  );
}
