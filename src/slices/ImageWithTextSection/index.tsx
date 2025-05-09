import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import { getServerTranslations } from '@/i18n/server';
import { isFilled } from '@prismicio/client';

type ImageWithTextSectionSliceProps = {
  slice: any;
  context?: any;
  children?: React.ReactNode;
}

async function ImageWithTextSectionSlice({ slice, context, children }: ImageWithTextSectionSliceProps) {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';
  
  const imagePosition = slice.primary.image_position || 'right';
  
  // Get language-specific content
  const headerField = isGerman
    ? (isFilled.richText(slice.primary.header_de) ? slice.primary.header_de : slice.primary.header)
    : (isFilled.richText(slice.primary.header_en) ? slice.primary.header_en : slice.primary.header);
    
  const titleField = isGerman
    ? (isFilled.richText(slice.primary.title_de) ? slice.primary.title_de : slice.primary.title)
    : (isFilled.richText(slice.primary.title_en) ? slice.primary.title_en : slice.primary.title);
    
  const textField = isGerman
    ? (isFilled.richText(slice.primary.text_de) ? slice.primary.text_de : slice.primary.text)
    : (isFilled.richText(slice.primary.text_en) ? slice.primary.text_en : slice.primary.text);
  
  // Shared image across languages
  const imageField = slice.primary.image;
  
  // Image alt text can be translated
  const imageAlt = isGerman
    ? (slice.primary.image_alt_de || slice.primary.image_alt || "")
    : (slice.primary.image_alt_en || slice.primary.image_alt || "");
  
  // Process content items for multilingual support
  const contentItems = slice.items.map((item: any) => {
    return {
      content: isGerman
        ? (isFilled.richText(item.content_de) ? item.content_de : item.content)
        : (isFilled.richText(item.content_en) ? item.content_en : item.content)
    };
  });
  
  return (
    <section
      id={slice.primary.section_id || undefined}
      className="w-full px-5 lg:px-10 lg:py-[120px] xl:p-[40px] flex flex-col gap-10 dark:text-gray-300"
    >
      <div className={`flex flex-col ${imagePosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-3 lg:gap-10`}>
        <div className="flex-1 min-w-0 mb-2 hidden lg:block">
          {imageField && (
            <PrismicNextImage
              field={imageField}
              className="w-full h-full object-cover rounded-[16px]"
              fallbackAlt={imageAlt}
            />
          )}
        </div>
        <div className={`flex-1 min-w-0 flex flex-col gap-10 lg:gap-2 ${imagePosition == 'right' ? 'lg:pr-6' : 'lg:pl-6'}`}>
          <div className='flex flex-col gap-6'>
            <div className="text-overheader dark:text-gray-300">
              <PrismicRichText field={headerField} />
            </div>
            <div className='whitespace-pre-line'>
              <PrismicRichText field={titleField} />
            </div>
          </div>
          <div className="flex-1 min-w-0 mb-2 lg:hidden">
            {imageField && (
              <PrismicNextImage
                field={imageField}
                className="w-full h-full object-cover rounded-[16px]"
                fallbackAlt={imageAlt}
              />
            )}
          </div>
          <div className="whitespace-pre-line text-text-secondary">
            <PrismicRichText field={textField} />
          </div>
          <div className="flex-col gap-4 hidden lg:flex">
            {children || contentItems.map((item: any, index: number) => (
              <div key={`content-${index}`} className="content-item">
                <PrismicRichText field={item.content} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-col gap-4 flex lg:hidden">
          {children || contentItems.map((item: any, index: number) => (
            <div key={`content-mobile-${index}`} className="content-item">
              <PrismicRichText field={item.content} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// For backward compatibility
export const ImageWithTextSection: React.FC<ImageWithTextSectionProps> = ({ 
  title, 
  header, 
  id, 
  children, 
  text, 
  imagePosition, 
  image, 
  altImage,
  language = 'en'
}) => {
  return (
    <section
      id={id}
      className="w-full px-5 lg:px-10 lg:py-[120px] xl:p-[40px] flex flex-col gap-10 dark:text-gray-300"
    >
      <div className={`flex flex-col ${imagePosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-3 lg:gap-10`}>
        <div className="flex-1 min-w-0 mb-2 hidden lg:block">
          <img src={image} alt={altImage} className="w-full h-full object-cover rounded-[16px]" />
        </div>
        <div className={`flex-1 min-w-0 flex flex-col gap-10 lg:gap-2 ${imagePosition == 'right' ? 'lg:pr-6' : 'lg:pl-6'}`}>
          <div className='flex flex-col gap-6'>
            <h6 className="text-overheader dark:text-gray-300">{header}</h6>
            <h2 className='whitespace-pre-line'>{title}</h2>
          </div>
          <div className="flex-1 min-w-0 mb-2 lg:hidden">
            <img src={image} alt={altImage} className="w-full h-full object-cover rounded-[16px]" />
          </div>
          <p className=" whitespace-pre-line text-text-secondary">{text}</p>
          <div className=" flex-col gap-4 hidden lg:flex">
            {children}
          </div>
        </div>
        <div className=" flex-col gap-4 flex lg:hidden">
          {children}
        </div>
      </div>
    </section>
  );
};

// Type definitions
interface ImageWithTextSectionProps extends React.PropsWithChildren {
  title: string;
  header: string;
  id?: string;
  text: string;
  imagePosition: 'left' | 'right';
  image: string;
  altImage: string;
  language?: string;
}

export default ImageWithTextSectionSlice;