import React from "react";
import { PrismicRichText } from '@prismicio/react';
import { getServerTranslations } from "@/i18n/server";

type BoxesListSliceProps = {
  slice: any;
  context?: any;
}

export async function BoxesListSlice({ slice, context }: BoxesListSliceProps) {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';
  
  // Select the appropriate title field based on language
  const titleField = isGerman 
    ? slice.primary.title_de || slice.primary.title 
    : slice.primary.title_en || slice.primary.title;

  return (
    <div className="max-w-[1440px] mt-10 lg:mt-16 items-center" style={{
      margin: '50px auto',
    }}>
      <div className="flex flex-wrap gap-3 lg:gap-6">
      <PrismicRichText field={titleField} />
        {slice.items.map((item: any, index: number) => {
          // Select the appropriate box text based on language
          const boxText = isGerman
            ? item.description_title_de || item.description_text_de
            : item.description_title_en || item.description_text_en;

            
          return (
            <div
              key={index}
              className="px-4 py-3 rounded-xl bg-gray-100 flex items-center justify-center"
            >
              {boxText ? boxText[0].text : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// For backward compatibility
interface BoxesListProps {
  title: string;
  boxes: string[];
  language?: string;
}

export const BoxesList: React.FC<BoxesListProps> = ({ title, boxes, language = 'en' }) => {
  const isGerman = language === 'de';
  
  return (
    <div className="mt-10 lg:mt-16">
      <h3 className="mb-6">{title}</h3>
      <div className="flex flex-wrap gap-3 lg:gap-6">
        {boxes.map((box, index) => (
          <div
            key={index}
            className="px-4 py-3 rounded-xl bg-primary-400 flex items-center justify-center"
          >
            {box}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoxesListSlice;