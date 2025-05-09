import React from "react";
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import { getServerTranslations } from "@/i18n/server";
import { isFilled } from '@prismicio/client';
import SectionBoxSlice from "../SectionBox";
import { BoxesListSlice } from "../BoxesList";
import { SectionBox } from "../SectionBox";
import { BoxesList } from "../BoxesList";

type DiversitySectionSliceProps = {
  slice: any;
  context?: any;
}

async function DiversitySectionSlice({ slice, context }: DiversitySectionSliceProps) {
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
  const descriptionSections = isGerman
    ? (slice.primary.description_sections_de || slice.primary.description_sections)
    : (slice.primary.description_sections_en || slice.primary.description_sections);
    
  // Create a mock slice for the SectionBox
  const sectionBoxSlice = {
    id: `section-box-${slice.id}`,
    slice_type: 'section_box',
    primary: {
      title: titleField,
      header: headerField,
      section_id: slice.primary.section_id || "diversity-section"
    },
    items: []
  };
  
  // Get language-specific boxes
  const boxes = isGerman
    ? (slice.primary.boxes_de || slice.primary.boxes)
    : (slice.primary.boxes_en || slice.primary.boxes);
    
  // Create a mock slice for the BoxesList
  const boxesListSlice = {
    id: `boxes-list-${slice.id}`,
    slice_type: 'boxes_list',
    primary: {
      title: boxesTitleField
    },
    items: slice.primary.description_sections
  };

  return (
    <SectionBoxSlice slice={sectionBoxSlice as any}>
      <div className="flex-col flex gap-6 lg:gap-8">
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
            {descriptionSections.map((section: any, index: number) => {
              // Get language-specific section content
              const sectionTitle = isGerman
                ? (isFilled.richText(section.description_title_de) ? section.description_title_de : section.description_title)
                : (isFilled.richText(section.description_title_en) ? section.description_title_en : section.description_title);
                
              const sectionText = isGerman
                ? (isFilled.richText(section.description_text_de) ? section.description_text_de : section.description_text)
                : (isFilled.richText(section.description_text_en) ? section.description_text_en : section.description_text);
              
              return (
                <div className="flex flex-col gap-2" key={index}>
                  <div>
                    <PrismicRichText field={sectionTitle} />
                  </div>
                  <div>
                    <PrismicRichText field={sectionText} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <BoxesListSlice slice={boxesListSlice as any} />
      </div>
    </SectionBoxSlice>
  );
}

// For backward compatibility
interface DiversitySectionProps {
  title: string;
  titleBoxes: string;
  header: string;
  images: { src: string; alt: string }[];
  descriptionSections: { title: string; description: string }[];
  boxes: string[];
}

export const DiversitySection: React.FC<DiversitySectionProps> = ({
  title,
  header,
  titleBoxes,
  images,
  descriptionSections,
  boxes,
}) => {
  return (
    <SectionBox title={title} header={header} id="diversity-section">
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
export default DiversitySectionSlice;