import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import { getServerTranslations } from '@/i18n/server';
import { isFilled } from '@prismicio/client';

type ChanceSectionSliceProps = {
  slice: any;
  context?: any;
  children?: React.ReactNode;
}

async function ChanceSectionSlice({ slice, context, children }: ChanceSectionSliceProps) {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';
  
  // Extract properties with defaults
  const imagePosition = slice.primary.image_position || 'top';
  const imagePositionOppositePhone = slice.primary.image_position_opposite_phone || false;
  const bgColor = slice.primary.bg_color || 'bg-black';
  const titleColor = slice.primary.title_color || 'text-text-diap-primary';
  const descriptionColor = slice.primary.description_color || 'text-text-diap-secondary';
  const bgGradient = slice.primary.bg_gradient || false;
  const noBrushesImage = slice.primary.no_brushes_image || false;
  
  // Select language-specific content for text only
  const titleField = isGerman
    ? (isFilled.richText(slice.primary.title_de) ? slice.primary.title_de : slice.primary.title)
    : (isFilled.richText(slice.primary.title_en) ? slice.primary.title_en : slice.primary.title);
  
  const titleMobileField = isGerman
    ? (isFilled.richText(slice.primary.title_mobile_de) ? slice.primary.title_mobile_de : 
      (isFilled.richText(slice.primary.title_de) ? slice.primary.title_de : 
      (isFilled.richText(slice.primary.title_mobile) ? slice.primary.title_mobile : slice.primary.title)))
    : (isFilled.richText(slice.primary.title_mobile_en) ? slice.primary.title_mobile_en : 
      (isFilled.richText(slice.primary.title_en) ? slice.primary.title_en : 
      (isFilled.richText(slice.primary.title_mobile) ? slice.primary.title_mobile : slice.primary.title)));
  
  const descriptionField = isGerman
    ? (isFilled.richText(slice.primary.description_de) ? slice.primary.description_de : slice.primary.description)
    : (isFilled.richText(slice.primary.description_en) ? slice.primary.description_en : slice.primary.description);
  
  // Use shared images (no language variants)
  const personImageField = slice.primary.person_image;
  const personImageAlt = isGerman
    ? (slice.primary.person_image_alt_de || slice.primary.person_image_alt || "Person image")
    : (slice.primary.person_image_alt_en || slice.primary.person_image_alt || "Person image");
  
  const brushesImageField = slice.primary.brushes_image;
  const brushesImageAlt = isGerman
    ? (slice.primary.brushes_image_alt_de || slice.primary.brushes_image_alt || "Decorative brushes")
    : (slice.primary.brushes_image_alt_en || slice.primary.brushes_image_alt || "Decorative brushes");
  
  // Get content items for the current language
  const contentItems = slice.items.map((item: any) => {
    return {
      content: isGerman
        ? (isFilled.richText(item.content_de) ? item.content_de : item.content)
        : (isFilled.richText(item.content_en) ? item.content_en : item.content)
    };
  });
  
  return (
    <section 
      id={slice.primary.section_id || "chance-section"} 
      className="w-screen px-[10px] lg:px-[60px] min-h-[700px] lg:min-h-0 flex justify-center"
    >
      <div className={`${bgColor} w-full py-6 px-5 rounded-3xl flex relative lg:pt-[20px] lg:pb-[60px] lg:px-[60px] overflow-hidden items-start lg:items-center`}>
        {bgGradient && <div className="absolute w-full h-[150px] bottom-0 left-0 bg-gradient-to-b z-20 from-[#E5FDFF00] via-[#E1FBFE59] to-[#E7FAFC]"></div>}
        
        {personImageField && (
          <PrismicNextImage
            field={personImageField}
            className={`h-full absolute lg:-right-28 z-1 ${imagePosition === 'bottom' ? `bottom-0 ${imagePositionOppositePhone ? 'lg:top-0' : ''}` : `-bottom-28 ${imagePositionOppositePhone ? '' : 'lg:top-0'}`}`}
            width={839}
            fallbackAlt={personImageAlt}
          />
        )}

        <div className="flex-1 flex-col z-20">
          <div className={`whitespace-pre-line z-10 mb-16 relative hidden lg:flex text-white ${titleColor}`}>
            <PrismicRichText field={titleField} />
            {!noBrushesImage && brushesImageField && (
              <PrismicNextImage
                field={brushesImageField}
                className="absolute -bottom-1 lg:-bottom-5 left-4 w-[121px] lg:w-[279px]"
                width={279}
                height={45}
                fallbackAlt={brushesImageAlt}
              />
            )}
            {!noBrushesImage && !brushesImageField && (
              <img
                src={'/brushes-yellow.webp'}
                className="absolute -bottom-1 lg:-bottom-5 left-4 w-[121px] lg:w-[279px]"
                alt="Decorative brushes"
                width={279}
                height={45}
              />
            )}
          </div>
          
          <div className={`whitespace-pre-line z-10 mb-10 relative ${titleColor} lg:hidden`}>
            <PrismicRichText field={titleMobileField} />
            {!noBrushesImage && brushesImageField && (
              <PrismicNextImage
                field={brushesImageField}
                className="absolute -bottom-1 lg:-bottom-5 left-4 w-[121px] lg:w-[279px]"
                width={279}
                height={45}
                fallbackAlt={brushesImageAlt}
              />
            )}
            {!noBrushesImage && !brushesImageField && (
              <img
                src={'/brushes-yellow.webp'}
                className="absolute -bottom-1 lg:-bottom-5 left-4 w-[121px] lg:w-[279px]"
                alt="Decorative brushes"
                width={279}
                height={45}
              />
            )}
          </div>
          
          <div className="flex flex-col lg:max-w-[597px] gap-6 lg:gap-8">
            <div className={`${descriptionColor} z-10`}>
              <PrismicRichText field={descriptionField} />
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {children || contentItems.map((item: any, index: number) => (
                <div key={`content-${index}`} className="content-item">
                  <PrismicRichText field={item.content} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// For backward compatibility
interface ChanceSectionProps {
  title: string;
  description: string;
  personImageSrc: string;
  personImageAlt: string;
  brushesImageSrc?: string;
  brushesImageAlt?: string;
  children: React.ReactNode;
  bgColor?: string;
  imagePosition?: 'top' | 'bottom';
  titleColor?: string;
  descriptionColor?: string;
  imagePositionOpositePhone: boolean;
  noBrushesImage?: boolean;
  bgGradient?: boolean;
  language?: string;
}

export const ChanceSection: React.FC<ChanceSectionProps> = ({
  title,
  description,
  personImageSrc,
  personImageAlt,
  brushesImageSrc,
  brushesImageAlt,
  imagePosition = 'top',
  imagePositionOpositePhone = false,
  bgColor = 'bg-black',
  titleColor = 'text-text-diap-primary',
  descriptionColor = 'text-text-diap-secondary',
  bgGradient = false,
  noBrushesImage = false,
  children,
  language = 'en'
}) => {
  return (
    <section id="chance-section" className="w-screen px-[10px] lg:px-[60px] min-h-[700px] lg:min-h-0 flex justify-center">
      <div className={`${bgColor} w-full py-6 px-5 rounded-3xl flex relative lg:py-[20px] lg:px-[60px] overflow-hidden items-start lg:items-center`}>
        {bgGradient && <div className="absolute w-full h-[150px] bottom-0 left-0 z-20"></div>}
        <img
          src={personImageSrc}
          alt={personImageAlt}
          className={`h-full absolute lg:-right-28 z-1 ${imagePosition === 'bottom' ? `bottom-0 ${imagePositionOpositePhone ? 'lg:top-0' : ''}` : `-bottom-28 ${imagePositionOpositePhone ? '' : 'lg:top-0'}`}`}
          width={839}
        />

        <div className="flex-1 flex-col z-20">
          <h2 className={`whitespace-pre-line z-10 mb-16 relative hidden lg:flex ${titleColor}`}>
            {title}
            {!noBrushesImage && <img
              src={brushesImageSrc ?? '/brushes-yellow.webp'}
              className="absolute -bottom-1 lg:-bottom-5 left-4 w-[121px] lg:w-[279px]"
              alt={brushesImageAlt ?? 'brushes-yellow'}
              width={279}
              height={45}
            />}
          </h2>
          <h1 className={`whitespace-pre-line z-10 mb-10 relative ${titleColor} lg:hidden`}>
            {title}
            {!noBrushesImage && <img
              src={brushesImageSrc ?? '/brushes-yellow.webp'}
              className="absolute -bottom-1 lg:-bottom-5 left-4 w-[121px] lg:w-[279px]"
              alt={brushesImageAlt ?? 'brushes-yellow'}
              width={279}
              height={45}
            />}
          </h1>
          <div className="flex flex-col lg:max-w-[597px] gap-6 lg:gap-8">
            <p className={`${descriptionColor} z-10`}>{description}</p>

            <div className="flex flex-col lg:flex-row gap-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChanceSectionSlice;