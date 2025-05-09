import { type Content, isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { getServerTranslations } from '@/i18n/server';

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";

type TextWithImageInversedProps = SliceComponentProps<any>;

const TextWithImageInversed = async ({ slice }: TextWithImageInversedProps) => {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';

  // Get language-specific content for header
  const headerField = isGerman
    ? (isFilled.richText(slice.primary.header_de) ? slice.primary.header_de : slice.primary.header)
    : (isFilled.richText(slice.primary.header_en) ? slice.primary.header_en : slice.primary.header);

  // Get language-specific content for text
  const textField = isGerman
    ? (isFilled.richText(slice.primary.text_de) ? slice.primary.text_de : slice.primary.text)
    : (isFilled.richText(slice.primary.text_en) ? slice.primary.text_en : slice.primary.text);

  // Get language-specific content for button text
  const buttonTextField = isGerman
    ? (slice.primary.buttonText_de || slice.primary.buttonText || "Mehr erfahren")
    : (slice.primary.buttonText_en || slice.primary.buttonText || "Learn more");

  // Get image
  const image = slice.primary.image;

  // Get language-specific image alt text
  const imageAlt = isGerman
    ? (slice.primary.image_alt_de || slice.primary.image_alt || "")
    : (slice.primary.image_alt_en || slice.primary.image_alt || "");

  return (
    <Bounded as="section" className="bg-white">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div>
          {isFilled.image(image) && (
            <div className="bg-gray-100">
              <PrismicNextImage
                field={image}
                sizes="200px"
                className="w-full"
                fallbackAlt={imageAlt}
              />
            </div>
          )}
        </div>
        <div>
          <PrismicRichText field={headerField} />
          <PrismicRichText field={textField} />
          {slice.variation === "withButton" && slice.primary.buttonLink ? (
            <PrismicNextLink
              field={slice.primary.buttonLink}
              className="font-semibold"
            >
              {buttonTextField}
            </PrismicNextLink>
          ) : null}
        </div>
      </div>
    </Bounded>
  );
};

export default TextWithImageInversed;