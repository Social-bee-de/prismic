import Head from 'next/head';

export const SEO = ({ seoData }: any) => {
  if (!seoData) return null;

  // Extract data from the Prismic slice
  const {
    title,
    description,
    canonical_url,
    indexing,
    og_title,
    og_description,
    og_image,
    og_type,
    og_locale,
    twitter_card,
    twitter_title,
    twitter_description,
    twitter_image,
    twitter_handle,
    twitter_creator,
    keywords,
    robots,
    additional_meta_tags,
    alternate_languages
  } = seoData.primary;

  // Helper to get text from RichText field
  const getRichText = (field: any) => {
    if (!field || !field.length) return '';
    return field.map((item: any) => item.text).join(' ');
  };

  // Determine robots value based on indexing selection and custom robots field
  const robotsValue = () => {
    if (indexing === 'Prevent indexing') {
      return 'noindex, nofollow';
    }
    return robots || 'index, follow';
  };

  return (
    <Head>
      {/* Basic SEO Tags */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={getRichText(description)} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsValue()} />
      {canonical_url && <link rel="canonical" href={canonical_url} />}

      {/* Open Graph Tags for Facebook, LinkedIn, etc. */}
      <meta property="og:title" content={og_title || title || ''} />
      {og_description && (
        <meta property="og:description" content={getRichText(og_description)} />
      )}
      {og_type && <meta property="og:type" content={og_type} />}
      {og_locale && <meta property="og:locale" content={og_locale} />}
      {og_image?.url && (
        <>
          <meta property="og:image" content={og_image.url} />
          <meta property="og:image:width" content={og_image.dimensions?.width || 1200} />
          <meta property="og:image:height" content={og_image.dimensions?.height || 630} />
          {og_image.alt && <meta property="og:image:alt" content={og_image.alt} />}
        </>
      )}
      <meta property="og:url" content={canonical_url || typeof window !== 'undefined' ? window.location.href : ''} />

      {/* Twitter Card Tags */}
      {twitter_card && <meta name="twitter:card" content={twitter_card} />}
      {twitter_handle && <meta name="twitter:site" content={twitter_handle} />}
      {twitter_creator && <meta name="twitter:creator" content={twitter_creator} />}
      <meta name="twitter:title" content={twitter_title || og_title || title || ''} />
      <meta 
        name="twitter:description" 
        content={
          twitter_description 
            ? getRichText(twitter_description) 
            : og_description 
              ? getRichText(og_description) 
              : description 
                ? getRichText(description) 
                : ''
        } 
      />
      {(twitter_image?.url || og_image?.url) && (
        <meta name="twitter:image" content={twitter_image?.url || og_image?.url} />
      )}

      {/* Alternate Language URLs */}
      {alternate_languages?.map((lang: any, index: any) => (
        <link 
          key={`lang-${index}`}
          rel="alternate" 
          hrefLang={lang.language_code} 
          href={lang.url} 
        />
      ))}

      {/* Additional Custom Meta Tags */}
      {additional_meta_tags?.map((tag: any, index: any) => (
        <meta 
          key={`meta-${index}`}
          property={tag.meta_name} 
          content={tag.meta_content} 
        />
      ))}
    </Head>
  );
};

export default SEO;