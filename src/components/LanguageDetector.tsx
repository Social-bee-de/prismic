'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { setCookie } from 'cookies-next';

export default function LanguageDetector() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const lang = searchParams.get('lang');
    const supportedLanguages = ['en', 'de']; // Update with your supported languages
    
    if (lang && supportedLanguages.includes(lang)) {
      // Set the cookie
      setCookie('i18next', lang);
      
      // Create new URL without the lang parameter
      const url = new URL(window.location.href);
      url.searchParams.delete('lang');
      
      // Fire and forget the logging request - don't wait for it
      fetch('https://api.socialbee.org/logging', {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({
          location: 'client-language-change',
          data: {
            language: lang,
          },
        }),
      }).catch(console.error);
      
      // Immediately perform a full page reload
      // This will ensure translations are applied without waiting for the logging request
      window.location.href = url.toString();
    }
  }, [searchParams]);
  
  // This component doesn't render anything visible
  return null;
}