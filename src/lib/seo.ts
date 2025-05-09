/**
 * Extracts text from PrismicRichText fields
 * @param {Array} field - The rich text field from Prismic
 * @returns {string} - The plain text content
 */
export const getRichText = (field: any) => {
  if (!field || !field.length) return '';
  return field.map((item: any) => item.text).join(' ');
};

/**
 * Generates metadata for Next.js App Router from Prismic SEO slice
 * @param {Object} seoSlice - The SEO slice from Prismic
 * @returns {Object} - Next.js metadata object
 */
export function generateMetadata(seoSlice: any) {
  if (!seoSlice || !seoSlice.primary) {
    return {};
  }

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
    robots
  } = seoSlice.primary;

  // Extract alternate language data if available
  const alternateLanguages = seoSlice.items?.filter(
    (item: any) => item.language_code && item.url
  );

  // Determine robots value based on indexing selection and custom robots field
  const robotsValue = () => {
    if (indexing === 'Prevent indexing') {
      return 'noindex, nofollow';
    }
    return robots || 'index, follow';
  };

  // Prepare the metadata object for Next.js
  const metadata = {
    // Basic metadata
    title: title || '',
    description: description ? getRichText(description) : '',
    
    // Canonical URL
    ...(canonical_url && { 
      alternates: {
        canonical: canonical_url
      }
    }),
    
    // Robots metadata
    robots: {
      index: indexing !== 'Prevent indexing',
      follow: indexing !== 'Prevent indexing',
      ...(robots && { nocache: robots.includes('noarchive') }),
      ...(robots && { googleBot: robots })
    },
    
    // Open Graph metadata
    openGraph: {
      title: og_title || title || '',
      description: og_description ? getRichText(og_description) : (description ? getRichText(description) : ''),
      ...(og_type && { type: og_type }),
      ...(og_locale && { locale: og_locale }),
      ...(og_image?.url && {
        images: [{
          url: og_image.url,
          width: og_image.dimensions?.width || 1200,
          height: og_image.dimensions?.height || 630,
          alt: og_image.alt || ''
        }]
      }),
      ...(canonical_url && { url: canonical_url })
    },
    
    // Twitter metadata
    twitter: {
      card: twitter_card || 'summary_large_image',
      title: twitter_title || og_title || title || '',
      description: twitter_description 
        ? getRichText(twitter_description) 
        : og_description 
          ? getRichText(og_description) 
          : description 
            ? getRichText(description) 
            : '',
      ...(twitter_handle && { site: twitter_handle }),
      ...(twitter_creator && { creator: twitter_creator }),
      ...(twitter_image?.url 
        ? {
            images: [{
              url: twitter_image.url,
              width: twitter_image.dimensions?.width || 1200,
              height: twitter_image.dimensions?.height || 675,
              alt: twitter_image.alt || ''
            }]
          }
        : og_image?.url 
          ? {
              images: [{
                url: og_image.url,
                width: og_image.dimensions?.width || 1200,
                height: og_image.dimensions?.height || 630,
                alt: og_image.alt || ''
              }]
            }
          : {})
    },
    
    // Keywords (though less important for modern SEO)
    ...(keywords && { keywords: keywords }),
    
    // Alternate languages
    ...(alternateLanguages?.length > 0 && {
      alternates: {
        ...(canonical_url && { canonical: canonical_url }),
        languages: alternateLanguages.reduce((acc: any, lang: any) => {
          if (lang.language_code && lang.url) {
            acc[lang.language_code] = lang.url;
          }
          return acc;
        }, {})
      }
    })
  };

  // Handle additional meta tags if they exist
  const additionalMetaTags = seoSlice.items?.filter(
    (item: any) => item.meta_name && item.meta_content
  );

  if (additionalMetaTags?.length > 0) {
    metadata.other = additionalMetaTags.map((tag: any) => ({
      name: tag.meta_name,
      content: tag.meta_content
    }));
  }

  return metadata;
}