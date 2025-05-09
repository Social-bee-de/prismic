import { type Content, isFilled } from "@prismicio/client";
import { PrismicText, type SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { getServerTranslations } from '@/i18n/server';

import { Bounded } from "@/components/Bounded";

type QuoteProps = SliceComponentProps<Content.QuoteSlice>;

const Quote = async ({ slice }: QuoteProps | any) => {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';

  // Get language-specific content for quote
  const quoteField = isGerman
    ? (isFilled.richText(slice.primary.quote_de) ? slice.primary.quote_de : slice.primary.quote)
    : (isFilled.richText(slice.primary.quote_en) ? slice.primary.quote_en : slice.primary.quote);

  // Get language-specific content for source
  const sourceField = isGerman
    ? (slice.primary.source_de && slice.primary.source_de.trim() !== '' 
        ? slice.primary.source_de 
        : slice.primary.source)
    : (slice.primary.source_en && slice.primary.source_en.trim() !== '' 
        ? slice.primary.source_en 
        : slice.primary.source);

  return (
    <Bounded as="section" className="bg-white">
      {isFilled.richText(quoteField) && (
        <figure className="grid gap-6">
          <blockquote>
            <p
              className={clsx(
                "text-4xl font-medium leading-tight md:text-5xl md:leading-tight",
                !isFilled.keyText(sourceField) && "text-center",
              )}
            >
              <span className="-ml-3.5 select-none text-slate-400 md:-ml-5">
                &ldquo;
              </span>
              <PrismicText field={quoteField} />
              <span className="select-none text-slate-400">&rdquo;</span>
            </p>
          </blockquote>
          {isFilled.keyText(sourceField) && (
            <figcaption className="text-right">
              &mdash; {sourceField}
            </figcaption>
          )}
        </figure>
      )}
    </Bounded>
  );
};

export default Quote;