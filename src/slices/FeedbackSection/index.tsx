import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import { getServerTranslations } from '@/i18n/server';
import { isFilled } from '@prismicio/client';

type FeedbackSectionSliceProps = {
  slice: any;
  context?: any;
}

async function FeedbackSectionSlice({ slice, context }: FeedbackSectionSliceProps) {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';
  
  // Check if we have at least one testimonial
  const hasFirstTestimonial = slice.items && slice.items.length > 0;
  const hasSecondTestimonial = slice.items && slice.items.length > 1;

  // Get the testimonial items
  const firstTestimonial = hasFirstTestimonial ? slice.items[0] : null;
  const secondTestimonial = hasSecondTestimonial ? slice.items[1] : null;
  
  // Get language-specific text content
  const titleField = isGerman
    ? (isFilled.richText(slice.primary.title_de) ? slice.primary.title_de : slice.primary.title)
    : (isFilled.richText(slice.primary.title_en) ? slice.primary.title_en : slice.primary.title);
    
  const titleMobileField = isGerman
    ? (isFilled.richText(slice.primary.title_mobile_de) ? slice.primary.title_mobile_de : 
      (isFilled.richText(slice.primary.title_mobile) ? slice.primary.title_mobile : titleField))
    : (isFilled.richText(slice.primary.title_mobile_en) ? slice.primary.title_mobile_en : 
      (isFilled.richText(slice.primary.title_mobile) ? slice.primary.title_mobile : titleField));

  return (
    <section className="w-screen lg:p-[120px] flex flex-col gap-8 dark:text-gray-300">
      <div className="text-overheader px-0 hidden lg:block dark:text-gray-300">
        <PrismicRichText field={titleField} />
      </div>
      <div className="text-overheader px-5 lg:hidden dark:text-gray-300">
        <PrismicRichText field={titleMobileField} />
      </div>
      
      <div className="flex px-[10px] lg:px-0 lg:flex-row flex-col gap-9">
        {/* First Testimonial */}
        {firstTestimonial && (
          <div className="flex-1">
            <div className="bg-gray-100 dark:bg-gray-600 rounded-xl px-5 py-6 lg:p-8 flex flex-col gap-6 lg:gap-8">
              <div className="dark:text-gray-300">
                {/* Get language-specific comment */}
                <PrismicRichText field={
                  isGerman
                    ? (isFilled.richText(firstTestimonial.comment_de) ? firstTestimonial.comment_de : firstTestimonial.comment)
                    : (isFilled.richText(firstTestimonial.comment_en) ? firstTestimonial.comment_en : firstTestimonial.comment)
                } />
              </div>
              <div className="flex gap-3 lg:gap-4 items-center">
                {/* Use shared image */}
                {firstTestimonial.person_image && (
                  <PrismicNextImage
                    field={firstTestimonial.person_image}
                    width={64}
                    height={64}
                    className="w-14 lg:w-16 rounded-full"
                    fallbackAlt={
                      isGerman
                        ? (firstTestimonial.person_name_de || firstTestimonial.person_name || "Testimonial author")
                        : (firstTestimonial.person_name_en || firstTestimonial.person_name || "Testimonial author")
                    }
                  />
                )}
                <div className="w-[2px] h-16 bg-border-primary" />
                <div className="flex flex-col">
                  {/* Get language-specific person name */}
                  <p className="font-bold">
                    {isGerman
                      ? (firstTestimonial.person_name_de || firstTestimonial.person_name)
                      : (firstTestimonial.person_name_en || firstTestimonial.person_name)}
                  </p>
                  {/* Get language-specific position */}
                  <p className="text-text-tertiary dark:text-gray-300">
                    {isGerman
                      ? (firstTestimonial.person_position_de || firstTestimonial.person_position)
                      : (firstTestimonial.person_position_en || firstTestimonial.person_position)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Second Testimonial */}
        {secondTestimonial && (
          <div className="flex-1">
            <div className="bg-gray-100 dark:bg-gray-600 rounded-xl px-5 py-6 lg:p-8 flex flex-col gap-6 lg:gap-8">
              <div className="dark:text-gray-300">
                {/* Get language-specific comment */}
                <PrismicRichText field={
                  isGerman
                    ? (isFilled.richText(secondTestimonial.comment_de) ? secondTestimonial.comment_de : secondTestimonial.comment)
                    : (isFilled.richText(secondTestimonial.comment_en) ? secondTestimonial.comment_en : secondTestimonial.comment)
                } />
              </div>
              <div className="flex flex-row gap-3 lg:gap-4 items-center">
                {/* Use shared image */}
                {secondTestimonial.person_image && (
                  <PrismicNextImage
                    field={secondTestimonial.person_image}
                    width={64}
                    height={64}
                    className="w-14 lg:w-16 max-w-16 rounded-full"
                    fallbackAlt={
                      isGerman
                        ? (secondTestimonial.person_name_de || secondTestimonial.person_name || "Testimonial author")
                        : (secondTestimonial.person_name_en || secondTestimonial.person_name || "Testimonial author")
                    }
                  />
                )}
                <div className="w-[2px] h-16 bg-border-primary" />
                <div className="flex flex-col">
                  {/* Get language-specific person name */}
                  <p className="font-bold">
                    {isGerman
                      ? (secondTestimonial.person_name_de || secondTestimonial.person_name)
                      : (secondTestimonial.person_name_en || secondTestimonial.person_name)}
                  </p>
                  {/* Get language-specific position */}
                  <p className="text-text-tertiary dark:text-gray-300">
                    {isGerman
                      ? (secondTestimonial.person_position_de || secondTestimonial.person_position)
                      : (secondTestimonial.person_position_en || secondTestimonial.person_position)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// For backward compatibility
interface FeedbackSectionProps {
  title: string;
  comment1: string;
  comment2: string;
  person1ImageSrc: string;
  person1ImageAlt: string;
  person1Name: string;
  person1Position: string;
  person2ImageSrc?: string;
  person2ImageAlt?: string;
  person2Name?: string;
  person2Position?: string;
  language?: string;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({ 
  title, 
  comment1, 
  person1ImageSrc, 
  person1ImageAlt, 
  person2ImageSrc, 
  person2ImageAlt, 
  person1Name, 
  person1Position, 
  person2Name, 
  person2Position, 
  comment2,
  language = 'en'
}) => {
  return (
    <section className="w-screen lg:p-[120px] flex flex-col gap-8 dark:text-gray-300">
      <h6 className="text-overheader px-0 hidden lg:block dark:text-gray-300">{title}</h6>
      <h4 className="text-overheader px-5 lg:hidden dark:text-gray-300">{title}</h4>
      <div className="flex px-[10px] lg:px-0 lg:flex-row flex-col gap-9">
        <div className="flex-1">
          <div className="bg-gray-100 dark:bg-gray-600 rounded-xl px-5 py-6 lg:p-8 flex flex-col gap-6 lg:gap-8">
            <p className=" dark:text-gray-300" dangerouslySetInnerHTML={{ __html: comment1 }} />
            <div className="flex gap-3 lg:gap-4 items-center">
              <img
                src={person1ImageSrc}
                alt={person1ImageAlt}
                width={64}
                height={64}
                className="w-14 lg:w-16 rounded-full"
              />
              <div className="w-[2px] h-16 bg-border-primary" />
              <div className="flex flex-col">
                <p className="font-bold">{person1Name}</p>
                <p className="text-text-tertiary dark:text-gray-300">{person1Position}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-gray-100 dark:bg-gray-600 rounded-xl px-5 py-6 lg:p-8 flex flex-col gap-6 lg:gap-8">
            <p className="dark:text-gray-300" dangerouslySetInnerHTML={{ __html: comment2 }} />
            <div className="flex flex-row gap-3 lg:gap-4 items-center">
              <img
                src={person2ImageSrc}
                alt={person2ImageAlt}
                width={64}
                height={64}
                className="w-14 lg:w-16 max-w-16 rounded-full"
              />
              <div className="w-[2px] h-16 bg-border-primary" />
              <div className="flex flex-col">
                <p className="font-bold">{person2Name}</p>
                <p className="text-text-tertiary dark:text-gray-300">{person2Position}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeedbackSectionSlice;