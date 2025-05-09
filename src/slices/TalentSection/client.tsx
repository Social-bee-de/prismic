'use client'
import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { TalentSection } from "socialbee-ui";

/**
 * Props for the Talent Section slice
 */
export type TalentSectionSliceProps = SliceComponentProps<any> & {
  language: any; // The translations object from getServerTranslations
};

/**
 * Talent Section client component that works with Prismic data
 */
const TalentSectionClient: FC<TalentSectionSliceProps> = ({ slice, language }) => {
  // Determine current locale from language object
  const currentLocale = language || 'default';

  // Extract data from the Prismic slice
  const {
    primary
  } = slice;

  // Get statistics titles
  const firstTitle = primary.first_title || '200+';
  const secondTitle = primary.second_title || '92%';
  const thirdTitle = primary.third_title || '1300+';

  // Get localized content for info texts
  const getLocalizedField = (defaultField: any, enField: any, deField: any) => {
    if (currentLocale === 'en' && enField?.length > 0) return enField[0]?.text || '';
    if (currentLocale === 'de' && deField?.length > 0) return deField[0]?.text || '';
    return defaultField?.length > 0 ? defaultField[0]?.text || '' : '';
  };

  // Get info texts
  const info1 = getLocalizedField(primary.info1, primary.info1_en, primary.info1_de);
  const info2 = getLocalizedField(primary.info2, primary.info2_en, primary.info2_de);
  const info3 = getLocalizedField(primary.info3, primary.info3_en, primary.info3_de);

  // Get brush image URL
  const whiteImageSrc = primary.white_brush_image?.url || '/white-brush.webp';

  // Prepare translations object
  const translations = {
    info1,
    info2,
    info3
  };

  // Return the TalentSection component with Prismic data
  return (
    <section
      className="w-screen max-w-[1320px]"
    >
      <TalentSection
        firstTitle={firstTitle}
        secondTitle={secondTitle}
        thirdTitle={thirdTitle}
        translations={translations}
        whiteImageSrc={whiteImageSrc}
      />
    </section>
  );
};

export default TalentSectionClient;