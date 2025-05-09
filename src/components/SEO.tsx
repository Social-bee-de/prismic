// components/SEO.tsx
import Head from 'next/head';
import { isFilled } from '@prismicio/client';
import { getServerTranslations } from '@/i18n/server';

export type SEOProps = {
  title?: string;
  title_de?: string;
  title_en?: string;
  description?: string;
  description_de?: string;
  description_en?: string;
  openGraphImage?: any;
  openGraphType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: any;
  alternateUrls?: {
    en?: string;
    de?: string;
  };
};

export async function SEO({
  title,
  title_de,
  title_en,
  description,
  description_de,
  description_en,
  openGraphImage,
  openGraphType = 'website',
  canonicalUrl,
  noIndex = false,
  structuredData,
  alternateUrls,
}: SEOProps) {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';
  
  // Get language-specific title
  const titleField = isGerman
    ? (title_de || title)
    : (title_en || title);

  // Get language-specific description
  const descriptionField = isGerman
    ? (description_de || description)
    : (description_en || description);

  // Site constants
  const siteName = isGerman ? 'Your Site Name in German' : 'Your Site Name';
  const baseUrl = 'https://yourdomain.com';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{titleField}</title>
      {descriptionField && <meta name="description" content={descriptionField} />}
      {noIndex && <meta name="robots" content="noindex" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph Tags */}
      <meta property="og:title" content={titleField} />
      {descriptionField && <meta property="og:description" content={descriptionField} />}
      <meta property="og:type" content={openGraphType} />
      <meta property="og:site_name" content={siteName} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Open Graph Image */}
      {isFilled.image(openGraphImage) && (
        <>
          <meta property="og:image" content={openGraphImage.url} />
          <meta property="og:image:width" content={openGraphImage.dimensions.width.toString()} />
          <meta property="og:image:height" content={openGraphImage.dimensions.height.toString()} />
          <meta property="og:image:alt" content={openGraphImage.alt || titleField} />
          <meta name="twitter:card" content="summary_large_image" />
        </>
      )}

      {/* Language Alternates */}
      {alternateUrls?.en && (
        <link rel="alternate" hrefLang="en" href={alternateUrls.en} />
      )}
      {alternateUrls?.de && (
        <link rel="alternate" hrefLang="de" href={alternateUrls.de} />
      )}
      <link rel="alternate" hrefLang="x-default" href={alternateUrls?.en || canonicalUrl || baseUrl} />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
}