import React from "react";
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import { getServerTranslations } from '@/i18n/server';
import { isFilled } from '@prismicio/client';

type TalentsNumbersSliceProps = {
  slice: any;
  context?: any;
}

async function TalentsNumbersSlice({ slice, context }: TalentsNumbersSliceProps) {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';

  // Get language-specific content for number fields
  const firstNumberField = isGerman
    ? (slice.primary.first_number_de || slice.primary.first_number)
    : (slice.primary.first_number_en || slice.primary.first_number);

  const secondNumberField = isGerman
    ? (slice.primary.second_number_de || slice.primary.second_number)
    : (slice.primary.second_number_en || slice.primary.second_number);

  const thirdNumberField = isGerman
    ? (slice.primary.third_number_de || slice.primary.third_number)
    : (slice.primary.third_number_en || slice.primary.third_number);

  // Get language-specific content for text fields
  const firstTextField = isGerman
    ? (isFilled.richText(slice.primary.first_text_de) ? slice.primary.first_text_de : slice.primary.first_text)
    : (isFilled.richText(slice.primary.first_text_en) ? slice.primary.first_text_en : slice.primary.first_text);

  const secondTextField = isGerman
    ? (isFilled.richText(slice.primary.second_text_de) ? slice.primary.second_text_de : slice.primary.second_text)
    : (isFilled.richText(slice.primary.second_text_en) ? slice.primary.second_text_en : slice.primary.second_text);

  const thirdTextField = isGerman
    ? (isFilled.richText(slice.primary.third_text_de) ? slice.primary.third_text_de : slice.primary.third_text)
    : (isFilled.richText(slice.primary.third_text_en) ? slice.primary.third_text_en : slice.primary.third_text);

  // Get language-specific content for mobile text fields
  const firstTextMobileField = isGerman
    ? (isFilled.richText(slice.primary.first_text_mobile_de) 
        ? slice.primary.first_text_mobile_de 
        : (isFilled.richText(slice.primary.first_text_de) 
            ? slice.primary.first_text_de 
            : (slice.primary.first_text_mobile || slice.primary.first_text)))
    : (isFilled.richText(slice.primary.first_text_mobile_en) 
        ? slice.primary.first_text_mobile_en 
        : (isFilled.richText(slice.primary.first_text_en) 
            ? slice.primary.first_text_en 
            : (slice.primary.first_text_mobile || slice.primary.first_text)));

  const secondTextMobileField = isGerman
    ? (isFilled.richText(slice.primary.second_text_mobile_de) 
        ? slice.primary.second_text_mobile_de 
        : (isFilled.richText(slice.primary.second_text_de) 
            ? slice.primary.second_text_de 
            : (slice.primary.second_text_mobile || slice.primary.second_text)))
    : (isFilled.richText(slice.primary.second_text_mobile_en) 
        ? slice.primary.second_text_mobile_en 
        : (isFilled.richText(slice.primary.second_text_en) 
            ? slice.primary.second_text_en 
            : (slice.primary.second_text_mobile || slice.primary.second_text)));

  const thirdTextMobileField = isGerman
    ? (isFilled.richText(slice.primary.third_text_mobile_de) 
        ? slice.primary.third_text_mobile_de 
        : (isFilled.richText(slice.primary.third_text_de) 
            ? slice.primary.third_text_de 
            : (slice.primary.third_text_mobile || slice.primary.third_text)))
    : (isFilled.richText(slice.primary.third_text_mobile_en) 
        ? slice.primary.third_text_mobile_en 
        : (isFilled.richText(slice.primary.third_text_en) 
            ? slice.primary.third_text_en 
            : (slice.primary.third_text_mobile || slice.primary.third_text)));

  // Get language-specific content for image alt
  const imageAltField = isGerman
    ? (slice.primary.image_alt_de || slice.primary.image_alt || "")
    : (slice.primary.image_alt_en || slice.primary.image_alt || "");

  return (
    <section className="w-screen lg:px-[60px] px-2">
      <div className="bg-primary-400 py-6 px-5 rounded-[12px] lg:px-[60px] lg:py-[56px] lg:rounded-[16px] flex lg:flex-row flex-col">
        <div className="flex flex-1 flex-col lg:py-4 gap-3 lg:gap-4 relative">
          <h1>{firstNumberField}</h1>
          {slice.primary.plus_image && (
            <>
              <PrismicNextImage
                field={slice.primary.plus_image}
                className="absolute mt-12 hidden lg:block"
                fallbackAlt={imageAltField}
                width={133}
                height={34}
                imgixParams={{ fit: "crop" }}
                style={{
                  left: 15,
                }}
              />
              <PrismicNextImage
                field={slice.primary.plus_image}
                className="absolute mt-6 lg:mt-10 block lg:hidden"
                fallbackAlt={imageAltField}
                width={66}
                height={17}
                imgixParams={{ fit: "crop" }}
                style={{
                  left: 12,
                }}
              />
            </>
          )}
          <div className="hidden lg:block">
            <PrismicRichText field={firstTextField} />
          </div>
          <div className="lg:hidden">
            <PrismicRichText field={firstTextMobileField} />
          </div>
        </div>
        <div className="bg-text-primary bg-opacity-10 w-full h-[2px] my-6 lg:w-[2px] lg:h-[138px] lg:my-0 lg:mr-9" />
        <div className="flex flex-1 flex-col lg:py-4 gap-3 lg:gap-4 relative">
          <h1>{secondNumberField}</h1>
          {slice.primary.plus_image && (
            <>
              <PrismicNextImage
                field={slice.primary.plus_image}
                className="absolute mt-12 hidden lg:block"
                fallbackAlt={imageAltField}
                width={133}
                height={34}
                imgixParams={{ fit: "crop" }}
                style={{
                  left: 15,
                }}
              />
              <PrismicNextImage
                field={slice.primary.plus_image}
                className="absolute mt-6 lg:mt-10 block lg:hidden"
                fallbackAlt={imageAltField}
                width={66}
                height={17}
                imgixParams={{ fit: "crop" }}
                style={{
                  left: 12,
                }}
              />
            </>
          )}
          <div className="hidden lg:block">
            <PrismicRichText field={secondTextField} />
          </div>
          <div className="lg:hidden">
            <PrismicRichText field={secondTextMobileField} />
          </div>
        </div>
        <div className="bg-text-primary bg-opacity-10 w-full h-[2px] my-6 lg:w-[2px] lg:h-[138px] lg:my-0 lg:mr-9" />
        <div className="flex flex-1 flex-col lg:py-4 gap-3 lg:gap-4 relative">
          <h1>{thirdNumberField}</h1>
          {slice.primary.plus_image && (
            <>
              <PrismicNextImage
                field={slice.primary.plus_image}
                className="absolute mt-12 hidden lg:block"
                fallbackAlt={imageAltField}
                width={133}
                height={34}
                imgixParams={{ fit: "crop" }}
                style={{
                  left: 12,
                }}
              />
              <PrismicNextImage
                field={slice.primary.plus_image}
                className="absolute mt-6 lg:mt-10 block lg:hidden"
                fallbackAlt={imageAltField}
                width={66}
                height={17}
                imgixParams={{ fit: "crop" }}
                style={{
                  left: 15,
                }}
              />
            </>
          )}
          <div className="hidden lg:block">
            <PrismicRichText field={thirdTextField} />
          </div>
          <div className="lg:hidden">
            <PrismicRichText field={thirdTextMobileField} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TalentsNumbersSlice;