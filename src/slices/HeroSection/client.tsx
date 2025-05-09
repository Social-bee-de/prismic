'use client'
import { FC } from "react";
import { HeroSection } from "socialbee-ui";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for the Prismic Hero Section slice
 */
export type HeroSectionSliceProps = SliceComponentProps<Content.HeroSectionSlice> | any;

/**
 * Hero Section component that works with Prismic data
 */
const PrismicHeroSection: FC<HeroSectionSliceProps> = ({ slice, language }: any) => {
  // Extract data from the Prismic slice
  const {
    primary: {
      background_image,
      title,
      title_en,
      title_de,
      description,
      description_en,
      description_de,
      button_text,
      button_text_en,
      button_text_de,
      more_text,
      more_text_en,
      more_text_de,
      on_submit_id,
      on_more_id,
      stripe_begining = true,
    }
  } = slice;
  
  // Determine current locale from document
  const currentLocale = language || 'en';
  
  // Get title based on locale
  let finalTitle = '';
  if (currentLocale === 'en' && title_en?.[0]?.text) {
    finalTitle = title_en[0].text;
  } else if (currentLocale === 'de' && title_de?.[0]?.text) {
    finalTitle = title_de[0].text;
  } else if (title?.[0]?.text) {
    finalTitle = title[0].text;
  }

  finalTitle = finalTitle.replace('<br>', '\n');
  
  // Get description based on locale
  let finalDescription = '';
  if (currentLocale === 'en' && description_en?.[0]?.text) {
    finalDescription = description_en[0].text;
  } else if (currentLocale === 'de' && description_de?.[0]?.text) {
    finalDescription = description_de[0].text;
  } else if (description?.[0]?.text) {
    finalDescription = description[0].text;
  }
  
  // Get button text based on locale
  let finalButtonText = '';
  if (currentLocale === 'en' && button_text_en) {
    finalButtonText = button_text_en;
  } else if (currentLocale === 'de' && button_text_de) {
    finalButtonText = button_text_de;
  } else {
    finalButtonText = button_text || '';
  }
  
  // Get more text based on locale
  let finalMoreText = '';
  if (currentLocale === 'en' && more_text_en) {
    finalMoreText = more_text_en;
  } else if (currentLocale === 'de' && more_text_de) {
    finalMoreText = more_text_de;
  } else {
    finalMoreText = more_text || '';
  }
  
  // Calculate stripe style based on stripe_begining
  const stripeStyle = stripe_begining ? 
    { left: -30, marginTop: -110, zIndex: 0, width: 250, height: 45 } : 
    { left: 376, marginTop: -30, width: 279, height: 45 };

  

  return (
    <HeroSection
      backgroundImage={background_image?.url || ''}
      title={finalTitle}
      description={finalDescription}
      buttonText={finalButtonText}
      moreText={finalMoreText}
      onSubmitId={on_submit_id || ''}
      onMoreId={on_more_id || ''}
      stripeStyle={stripeStyle}
      stripeStylePhone={{ width: 168, height: 27, right: 0, marginTop: -15 }}
    />
  );
}

export default PrismicHeroSection;