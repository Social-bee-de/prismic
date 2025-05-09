'use client'
import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import CompanyCarousel from "@/sections/hiring/company-carousel-section"; // Adjust import path as needed

/**
 * Props for the Company Carousel slice
 */
export type CompanyCarouselSliceProps = SliceComponentProps<any> & {
  language: any; // The translations object from getServerTranslations
};

/**
 * Company Carousel client component that works with Prismic data
 */
const CompanyCarouselClient: FC<CompanyCarouselSliceProps> = ({ slice, language }) => {
  
  // Determine current locale from language object
  const currentLocale = language || 'default';
  
  // Extract data from the Prismic slice
  const { primary, items } = slice;
  // Get localized header
  let header = primary.header || '';
  if (currentLocale === 'en' && primary.header_en) {
    header = primary.header_en;
  } else if (currentLocale === 'de' && primary.header_de) {
    header = primary.header_de;
  }
  
  // Get carousel class
  const carouselClass = primary.carousel_class || 'glide1';
  
  // Format company data
  const companies = items.map((item: any) => ({
    image: {
      src: item.company_logo?.url || '',
      width: 133,
      height: 60,
      alt: item.company_name || ''
    },
    alt: item.company_name || ''
  }));

  // Return the CompanyCarousel component with Prismic data
  return (
    <CompanyCarousel 
      class={carouselClass} 
      header={header} 
      images={companies} 
    />
  );
};

export default CompanyCarouselClient;