import React, { FC } from "react";
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextLink } from '@prismicio/next';
import { SectionBoxProps } from "socialbee-ui/dist/components/SectionBox/SectionBox";
import { getServerTranslations } from '@/i18n/server';
import { isFilled } from '@prismicio/client';

type SectionBoxSliceProps = {
  slice: any;
  context?: any;
  children?: React.ReactNode;
}

async function SectionBoxSlice({ slice, context, children }: SectionBoxSliceProps) {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';

  // Get language-specific content for header
  const headerField = isGerman
    ? (isFilled.richText(slice.primary.header_de) ? slice.primary.header_de : slice.primary.header)
    : (isFilled.richText(slice.primary.header_en) ? slice.primary.header_en : slice.primary.header);

  // Get language-specific content for mobile header
  const headerMobileField = isGerman
    ? (isFilled.richText(slice.primary.header_mobile_de) 
        ? slice.primary.header_mobile_de 
        : (isFilled.richText(slice.primary.header_de) 
            ? slice.primary.header_de 
            : (slice.primary.header_mobile || slice.primary.header)))
    : (isFilled.richText(slice.primary.header_mobile_en) 
        ? slice.primary.header_mobile_en 
        : (isFilled.richText(slice.primary.header_en) 
            ? slice.primary.header_en 
            : (slice.primary.header_mobile || slice.primary.header)));

  // Get language-specific content for title
  const titleField = isGerman
    ? (isFilled.richText(slice.primary.title_de) ? slice.primary.title_de : slice.primary.title)
    : (isFilled.richText(slice.primary.title_en) ? slice.primary.title_en : slice.primary.title);

  const renderTitle = () => {
    if (!titleField?.length) return null;

    const TitleElement = (
      <div className="dark:text-gray-300">
        <PrismicRichText field={titleField} />
      </div>
    );

    return slice.primary.title_href?.url ? (
      <PrismicNextLink 
        field={slice.primary.title_href} 
        className="text-text-tertiary dark:text-gray-300 w-fit" 
        target="_blank" 
        rel="noreferrer"
      >
        {TitleElement}
      </PrismicNextLink>
    ) : (
      TitleElement
    );
  };

  return (
    <section
      id={slice.primary.section_id || undefined}
      className="w-screen max-w-[1440px] px-4 px-32 lg:py-[40px] xl:py-[40px] flex flex-col gap-10 lg:gap-[64px] dark:text-gray-300"
    >
      <div className="flex flex-col gap-5 lg:gap-6">
        <div className="text-overheader dark:text-gray-300 hidden lg:block">
          <PrismicRichText field={headerField} />
        </div>
        <div className="text-overheader dark:text-gray-300 lg:hidden">
          <PrismicRichText field={headerMobileField} />
        </div>
        {renderTitle()}
      </div>
      {children || (
        <div className="section-content">
          {slice.items.map((item: any, i: number) => {
            // Get language-specific content for items
            const contentField = isGerman
              ? (isFilled.richText(item.content_de) ? item.content_de : item.content)
              : (isFilled.richText(item.content_en) ? item.content_en : item.content);
              
            return (
              <div key={`content-${i}`} className="section-item">
                <PrismicRichText field={contentField} />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

// For backward compatibility with existing code
export const SectionBox: FC<SectionBoxProps | any> = ({ 
  title, 
  header, 
  children, 
  id, 
  titleHref,
  language = 'en'
}) => {
  const isGerman = language === 'de';
  
  const renderTitle = () => {
    if (!title) return null;

    const TitleElement = (
      <h2 className="dark:text-gray-300">
        {title}
      </h2>
    );

    return titleHref ? (
      <a href={titleHref} className="text-text-tertiary dark:text-gray-300 w-fit" target="_blank" rel="noreferrer">
        {TitleElement}
      </a>
    ) : (
      TitleElement
    );
  };

  return (
    <section
      id={id}
      className="w-screen px-4 lg:px-10 lg:py-[120px] xl:p-[40px] flex flex-col gap-10 lg:gap-[64px] dark:text-gray-300"
    >
      <div className="flex flex-col gap-5 lg:gap-6">
        <h6 className="text-overheader dark:text-gray-300 hidden lg:block">{header}</h6>
        <h4 className="text-overheader dark:text-gray-300 lg:hidden">{header}</h4>
        {renderTitle()}
      </div>
      {children}
    </section>
  );
};

export default SectionBoxSlice;