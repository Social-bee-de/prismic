import CompanyCarousel from '../../sections/carousel-section';
import { getServerTranslations } from '@/i18n/server';
import { isFilled } from '@prismicio/client';

type CompanyCarouselSliceProps = {
  slice: any;
  context?: any;
}

export async function CustomerLogos({ slice, context }: CompanyCarouselSliceProps) {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';
  
  // Select the appropriate title field based on language
  const titleField = isGerman 
    ? (isFilled.richText(slice.primary.title_de) ? slice.primary.title_de : slice.primary.title)
    : (isFilled.richText(slice.primary.title_en) ? slice.primary.title_en : slice.primary.title);
  
  // Select the appropriate title text based on language
  const titleText = isGerman
    ? (slice.primary.title_text_de || slice.primary.title_text || '')
    : (slice.primary.title_text_en || slice.primary.title_text || '');
  
  // Transform Prismic image items to the format expected by CompanyCarousel
  // Use shared logo images but maintain language-specific company names
  const companies = slice.items.map((item: any) => {
    // Use the shared logo image (no language variants)
    const logo = item.company_logo;
      
    // Still keep name translations for alt text
    const name = isGerman
      ? (item.company_name_de || item.company_name || '')
      : (item.company_name_en || item.company_name || '');
      
    return {
      image: logo,
      alt: name
    };
  });

  return (
    <div className={slice.primary.class_string || ''}>
      <CompanyCarousel 
        header={titleText} 
        images={companies}
      />
    </div>
  );
}

export default CustomerLogos;