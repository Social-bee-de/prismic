import { type Content, isFilled } from "@prismicio/client";
import { PrismicText, type SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { getServerTranslations } from "@/i18n/server";

import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { ConditionalWrap } from "@/components/ConditionalWrap";
import { PrismicRichText } from "@/components/PrismicRichText";

type ImageCardProps = {
  card: Content.ImageCardsSliceDefaultPrimaryCardsItem | any;
  language: string;
};

const ImageCard = ({ card, language }: ImageCardProps) => {
  const isGerman = language === 'de';
  
  // Shared image across languages
  const image = card.image;
  
  // Get language-specific text content
  const textField = isGerman
    ? (isFilled.richText(card.text_de) ? card.text_de : card.text)
    : (isFilled.richText(card.text_en) ? card.text_en : card.text);
    
  // Get language-specific button text
  const buttonTextField = isGerman
    ? (card.buttonText_de || card.buttonText || "Mehr Infos")
    : (card.buttonText_en || card.buttonText || "More Info");
    
  // Get language-specific button link
  const buttonLinkField = isGerman
    ? (isFilled.link(card.buttonLink_de) ? card.buttonLink_de : card.buttonLink)
    : (isFilled.link(card.buttonLink_en) ? card.buttonLink_en : card.buttonLink);

  return (
    <li className="grid gap-8">
      {isFilled.image(image) && (
        <div className="bg-gray-100">
          <ConditionalWrap
            condition={isFilled.link(buttonLinkField)}
            wrap={({ children }) => (
              <PrismicNextLink field={buttonLinkField} tabIndex={-1}>
                {children}
              </PrismicNextLink>
            )}
          >
            <PrismicNextImage field={image} sizes="100vw" className="w-full" />
          </ConditionalWrap>
        </div>
      )}
      <div className="leading-relaxed">
        <PrismicRichText field={textField} />
      </div>
      {isFilled.link(buttonLinkField) && (
        <div>
          <PrismicNextLink field={buttonLinkField} className="font-semibold">
            {buttonTextField}
          </PrismicNextLink>
        </div>
      )}
    </li>
  );
};

type ImageCardsProps = SliceComponentProps<Content.ImageCardsSlice | any>;

const ImageCards = async ({ slice }: ImageCardsProps) => {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';
  
  // Get language-specific heading
  const headingField = isGerman
    ? (isFilled.richText(slice.primary.heading_de) ? slice.primary.heading_de : slice.primary.heading)
    : (isFilled.richText(slice.primary.heading_en) ? slice.primary.heading_en : slice.primary.heading);

  return (
    <Bounded as="section" className="bg-white">
      <div className="grid gap-12">
        {isFilled.richText(headingField) && (
          <Heading className="text-center">
            <PrismicText field={headingField} />
          </Heading>
        )}
        <ul className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          {slice.primary.cards.map((card: any) => (
            <ImageCard 
              key={card.image?.url || Math.random().toString()} 
              card={card} 
              language={language} 
            />
          ))}
        </ul>
      </div>
    </Bounded>
  );
};

export default ImageCards;