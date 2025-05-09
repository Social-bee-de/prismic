import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import clsx from "clsx";
import { getServerTranslations } from '@/i18n/server';

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";

type TextProps = SliceComponentProps<Content.TextSlice>;

const Text = async ({ slice }: TextProps | any) => {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';

  // Get language-specific content for text
  const textField = isGerman
    ? (isFilled.richText(slice.primary.text_de) ? slice.primary.text_de : slice.primary.text)
    : (isFilled.richText(slice.primary.text_en) ? slice.primary.text_en : slice.primary.text);

  return (
    <Bounded as="section" className="bg-white leading-relaxed">
      <div
        className={clsx(
          slice.variation === "twoColumns" && "md:columns-2 md:gap-6",
        )}
      >
        <PrismicRichText field={textField} />
      </div>
    </Bounded>
  );
};

export default Text;