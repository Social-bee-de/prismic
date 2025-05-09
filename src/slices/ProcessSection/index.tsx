import React from "react";
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicNextLink } from '@prismicio/next';
import SectionBoxSlice, { SectionBox } from "../SectionBox";
import { getServerTranslations } from '@/i18n/server';
import { isFilled } from '@prismicio/client';

type ProcessSectionSliceProps = {
  slice: any;
  context?: any;
}

async function ProcessSectionSlice({ slice, context }: ProcessSectionSliceProps) {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';

  // Create a function to get language-specific rich text field
  const getLocalizedRichText = (baseField: any, deField: any, enField: any) => {
    if (isGerman) {
      return isFilled.richText(deField) ? deField : baseField;
    } else {
      return isFilled.richText(enField) ? enField : baseField;
    }
  };

  // Get language-specific content for section header and title
  const headerField = getLocalizedRichText(
    slice.primary.header,
    slice.primary.header_de,
    slice.primary.header_en
  );

  const titleField = getLocalizedRichText(
    slice.primary.title,
    slice.primary.title_de,
    slice.primary.title_en
  );

  // Image alt text can be translated
  const imageAlt = isGerman
    ? (slice.primary.image_alt_de || slice.primary.image_alt || "")
    : (slice.primary.image_alt_en || slice.primary.image_alt || "Process illustration");

  const renderTitle = (step: any) => {
    // Get localized step title
    const stepTitleField = getLocalizedRichText(
      step.title,
      step.title_de,
      step.title_en
    );

    // Get localized step subtitle
    const stepSubtitleField = getLocalizedRichText(
      step.subtitle,
      step.subtitle_de,
      step.subtitle_en
    );

    return (
      <div className="hidden lg:block">
        <PrismicRichText field={stepTitleField} />
        {stepSubtitleField?.length > 0 && (
          <span className="font-normal"> 
            <PrismicRichText field={stepSubtitleField} />
          </span>
        )}
      </div>
    );
  };

  const renderTitleMobile = (step: any) => {
    // Get localized step title
    const stepTitleField = getLocalizedRichText(
      step.title,
      step.title_de,
      step.title_en
    );

    // Get localized step subtitle
    const stepSubtitleField = getLocalizedRichText(
      step.subtitle,
      step.subtitle_de,
      step.subtitle_en
    );

    return (
      <div className="lg:hidden self-center">
        <PrismicRichText field={stepTitleField} />
        {stepSubtitleField?.length > 0 && (
          <span className="font-normal"> 
            <PrismicRichText field={stepSubtitleField} />
          </span>
        )}
      </div>
    );
  };

  const renderStepTitle = (step: any) =>
    step.href?.url ? (
      <PrismicNextLink field={step.href} className="block" target="_blank" rel="noreferrer">
        {renderTitle(step)}
        {renderTitleMobile(step)}
      </PrismicNextLink>
    ) : (
      <>
        {renderTitle(step)}
        {renderTitleMobile(step)}
      </>
    );

  // Create a mock slice for the SectionBox
  const sectionBoxSlice = {
    id: `section-box-${slice.id}`,
    slice_type: 'section_box',
    primary: {
      title: titleField,
      header: headerField,
      title_href: slice.primary.title_href,
      section_id: slice.primary.section_id
    },
    items: []
  };

  return (
    <SectionBoxSlice slice={sectionBoxSlice as any}>
      <div className="flex lg:flex-row flex-col-reverse gap-8 lg:gap-9 relative">
        <div className="flex-1 flex flex-col lg:gap-10 gap-[26px] relative w-full">
          <div className="absolute w-[2px] left-[15px] top-4 bg-border-primary -z-10 h-full" />
          {slice.items.map((step: any, index: number) => {
            // Get localized step description
            const stepDescriptionField = getLocalizedRichText(
              step.description,
              step.description_de,
              step.description_en
            );

            return (
              <div className="flex flex-col lg:gap-2" key={index}>
                <div className="flex flex-row gap-5 lg:gap-6 items-center">
                  <div className="w-8 min-w-8 h-8 min-h-8 rounded-full bg-primary-400 border-[2px] pt-[2px] border-background-primary text-center flex items-center justify-center">
                    <h6 className="dark:text-black">{index + 1}</h6>
                  </div>
                  {renderStepTitle(step)}
                </div>
                <div className="pl-[52px] lg:pl-[56px]">
                  <PrismicRichText field={stepDescriptionField} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-1 flex pt-0">
          {slice.primary.image && (
            <PrismicNextImage
              field={slice.primary.image}
              className="w-full rounded-[12px] lg:rounded-[16px] object-cover"
              fallbackAlt={imageAlt}
            />
          )}
        </div>
      </div>
    </SectionBoxSlice>
  );
}

// For backward compatibility
export const ProcessSection: React.FC<ProcessSectionProps> = ({ 
  title, 
  header, 
  steps, 
  imageSrc, 
  imageAlt, 
  titleHref,
  language = 'en'
}) => {
  const isGerman = language === 'de';
  
  const renderTitle = (step: ProcessStep) => (
    <h4 className="hidden lg:block">
      {step.title}
      {step.subtitle && <span className="font-normal"> {step.subtitle}</span>}
    </h4>
  );

  const renderTitleMobile = (step: ProcessStep) => (
    <h3 className="lg:hidden self-center">
      {step.title}
      {step.subtitle && <span className="font-normal"> {step.subtitle}</span>}
    </h3>
  );

  const renderStepTitle = (step: ProcessStep) =>
    step.href ? (
      <a href={step.href} className="block" target="_blank" rel="noreferrer">
        {renderTitle(step)}
        {renderTitleMobile(step)}
      </a>
    ) : (
      <>
        {renderTitle(step)}
        {renderTitleMobile(step)}
      </>
    );

  return (
    <SectionBox title={title} header={header} titleHref={titleHref} language={language}>
      <div className="flex lg:flex-row flex-col-reverse gap-8 lg:gap-9 relative">
        <div className="flex-1 flex flex-col lg:gap-10 gap-[26px] relative w-full">
          <div className="absolute w-[2px] left-[15px] top-4 bg-border-primary -z-10 h-full" />
          {steps.map((step, index) => (
            <div className="flex flex-col lg:gap-2" key={index}>
              <div className="flex flex-row gap-5 lg:gap-6 items-center">
                <div className="w-8 min-w-8 h-8 min-h-8 rounded-full bg-primary-400 border-[2px] pt-[2px] border-background-primary text-center flex items-center justify-center">
                  <h6 className="dark:text-black">{index + 1}</h6>
                </div>
                {renderStepTitle(step)}
              </div>
              <p
                className="pl-[52px] lg:pl-[56px]"
                dangerouslySetInnerHTML={{ __html: step.description }}
              ></p>
            </div>
          ))}
        </div>
        <div className="flex-1 flex pt-0">
          <img
            src={imageSrc}
            className="w-full rounded-[12px] lg:rounded-[16px] object-cover"
            alt={imageAlt}
          />
        </div>
      </div>
    </SectionBox>
  );
};

interface ProcessStep {
  title: string;
  subtitle?: string;
  description: string;
  href?: string;
}

interface ProcessSectionProps {
  title: string;
  header: string;
  steps: ProcessStep[];
  imageSrc: string;
  imageAlt: string;
  titleHref?: string;
  language?: string;
}

export default ProcessSectionSlice;