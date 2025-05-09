import React from "react";
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import { getServerTranslations } from "@/i18n/server";
import { isFilled } from '@prismicio/client';
import SectionBoxSlice, { SectionBox } from "../SectionBox";
import BoxesListSlice, { BoxesList } from "../BoxesList";

type FAQSectionSliceProps = {
  slice: any;
  context?: any;
}

async function FAQSectionSlice({ slice, context }: FAQSectionSliceProps) {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';
  
  // Extract images from the slice - shared across languages
  const images = slice.items
    .filter((item: any) => item.image)
    .slice(0, 3); // Limit to 3 images
  
  // Select language-specific content for text
  const titleField = isGerman
    ? (isFilled.richText(slice.primary.title_de) ? slice.primary.title_de : slice.primary.title)
    : (isFilled.richText(slice.primary.title_en) ? slice.primary.title_en : slice.primary.title);
    
  const headerField = isGerman
    ? (isFilled.richText(slice.primary.header_de) ? slice.primary.header_de : slice.primary.header)
    : (isFilled.richText(slice.primary.header_en) ? slice.primary.header_en : slice.primary.header);
    
  const boxesTitleField = isGerman
    ? (isFilled.richText(slice.primary.boxes_title_de) ? slice.primary.boxes_title_de : slice.primary.boxes_title)
    : (isFilled.richText(slice.primary.boxes_title_en) ? slice.primary.boxes_title_en : slice.primary.boxes_title);
    
  // Get language-specific description sections
  let descriptionSections = slice.primary.description_sections || [];
  
  // If language-specific sections exist, use them
  if (isGerman && slice.primary.description_sections_de && slice.primary.description_sections_de.length > 0) {
    descriptionSections = slice.primary.description_sections_de;
  } else if (!isGerman && slice.primary.description_sections_en && slice.primary.description_sections_en.length > 0) {
    descriptionSections = slice.primary.description_sections_en;
  }
  
  // Create a mock slice for the SectionBox
  const sectionBoxSlice = {
    id: `section-box-${slice.id}`,
    slice_type: 'section_box',
    primary: {
      title: titleField,
      header: headerField,
      section_id: slice.primary.section_id || "faq-section"
    },
    items: []
  };
  
  // Get language-specific boxes
  let boxes = slice.primary.boxes || '';
  if (isGerman && slice.primary.boxes_de) {
    boxes = slice.primary.boxes_de;
  } else if (!isGerman && slice.primary.boxes_en) {
    boxes = slice.primary.boxes_en;
  }
  
  // Create a mock slice for the BoxesList
  const boxesListSlice = {
    id: `boxes-list-${slice.id}`,
    slice_type: 'boxes_list',
    primary: {
      title: boxesTitleField
    },
    items: boxes ? 
      boxes.split(',').map((box: string) => ({ box_text: box.trim() })) : 
      []
  };

  return (
    <SectionBoxSlice slice={sectionBoxSlice as any}>
      <div className="flex lg:flex-row flex-col gap-8 lg:gap-[36px]">
        <div className="flex flex-1">
          <div className="flex flex-1 flex-col lg:pr-9 gap-9 max-h-[581px]">
            {images.length > 0 && (
              <div className="flex-1 h-1/2">
                <PrismicNextImage
                  field={images[0].image}
                  className="w-full h-1/2 rounded-[12px] flex-1 lg:rounded-[16px] object-cover object-left lg:object-bottom"
                  fallbackAlt={images[0].image_alt || ""}
                  imgixParams={{ fit: "crop" }}
                  style={{ height: "100%" }}
                />
              </div>
            )}
            <div className="hidden lg:flex lg:gap-2" style={{ height: "100%" }}>
              {images.length > 1 && (
                <div className="flex flex-1">
                  <div className="flex relative w-full">
                    <PrismicNextImage
                      field={images[1].image}
                      className="w-full h-full rounded-[12px] lg:rounded-[16px] object-cover object-top"
                      fallbackAlt={images[1].image_alt || ""}
                      imgixParams={{ fit: "crop" }}
                      style={{ height: "100%" }}
                    />
                  </div>
                </div>
              )}
              {images.length > 2 && (
                <div className="flex flex-1 pl-4">
                  <div className="flex relative w-full">
                    <PrismicNextImage
                      field={images[2].image}
                      className="w-full h-full rounded-[12px] lg:rounded-[16px] object-cover"
                      fallbackAlt={images[2].image_alt || ""}
                      imgixParams={{ fit: "crop" }}
                      style={{ height: "100%" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-10">
          {descriptionSections.map((section: any, index: number) => (
            <div className="flex flex-col gap-2" key={index}>
              <div>
                <PrismicRichText field={section.description_title} />
              </div>
              <div>
                <PrismicRichText field={section.description_text} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <BoxesListSlice slice={boxesListSlice as any} />
    </SectionBoxSlice>
  );
}

// For backward compatibility
interface FAQSectionProps {
  title: string;
  titleBoxes: string;
  header: string;
  images: { src: string; alt: string }[];
  descriptionSections: { title: string; description: string }[];
  boxes: string[];
  language?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  title,
  header,
  titleBoxes,
  images,
  descriptionSections,
  boxes,
  language = 'en'
}) => {
  return (
    <SectionBox title={title} header={header} id="faq-section">
      <div className="flex lg:flex-row flex-col gap-8 lg:gap-[36px]">
        <div className="flex flex-1">
          <div className="flex flex-1 flex-col lg:pr-9 gap-9 max-h-[581px]">
            <div className="flex-1 h-1/2">
              <img
                src={images[0].src}
                className="w-full h-1/2 rounded-[12px] flex-1 lg:rounded-[16px] object-cover object-left lg:object-bottom"
                alt={images[0].alt}
                style={{ height: "100%" }}
              />
            </div>
            <div className="hidden lg:flex lg:gap-2" style={{ height: "100%" }}>
              <div className="flex flex-1">
                <div className="flex relative w-full">
                  <img
                    src={images[1].src}
                    className="w-full h-full rounded-[12px] lg:rounded-[16px] object-cover object-top"
                    alt={images[1].alt}
                    style={{ height: "100%" }}
                  />
                </div>
              </div>
              <div className="flex flex-1 pl-4">
                <div className="flex relative w-full">
                  <img
                    src={images[2].src}
                    className="w-full h-full rounded-[12px] lg:rounded-[16px] object-cover"
                    alt={images[2].alt}
                    style={{ height: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-10">
          {descriptionSections.map((section, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <h4>{section.title}</h4>
              <p dangerouslySetInnerHTML={{ __html: section.description }}></p>
            </div>
          ))}
        </div>
      </div>
      <BoxesList title={titleBoxes} boxes={boxes} />
    </SectionBox>
  );
};

export default FAQSectionSlice;