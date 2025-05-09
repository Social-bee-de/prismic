import { getServerTranslations } from "@/i18n/server";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice | any>;

const CallToAction = async ({ slice }: CallToActionProps) => {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';
  const alignment = slice.variation === "alignLeft" ? "left" : "center";

  // Select the appropriate content fields based on language
  const titleField = isGerman 
    ? (isFilled.richText(slice.primary.title_de) ? slice.primary.title_de : slice.primary.title)
    : (isFilled.richText(slice.primary.title_en) ? slice.primary.title_en : slice.primary.title);

  const paragraphField = isGerman
    ? (isFilled.richText(slice.primary.paragraph_de) ? slice.primary.paragraph_de : slice.primary.paragraph)
    : (isFilled.richText(slice.primary.paragraph_en) ? slice.primary.paragraph_en : slice.primary.paragraph);

  const buttonLinkField = isGerman
    ? (isFilled.link(slice.primary.buttonLink_de) ? slice.primary.buttonLink_de : slice.primary.buttonLink)
    : (isFilled.link(slice.primary.buttonLink_en) ? slice.primary.buttonLink_en : slice.primary.buttonLink);

  const buttonLabelText = isGerman
    ? (slice.primary.buttonLabel_de || slice.primary.buttonLabel || "Mehr erfahren...")
    : (slice.primary.buttonLabel_en || slice.primary.buttonLabel || "Learn more...");

  // Use single shared image (no language-specific images)
  const imageField = slice.primary.image;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="es-bounded es-call-to-action"
    >
      <div className="es-bounded__content es-call-to-action__content">
        {isFilled.image(imageField) && (
          <PrismicNextImage
            className="es-call-to-action__image"
            field={imageField}
          />
        )}
        <div className="es-call-to-action__content">
          {isFilled.richText(titleField) && (
            <div className="es-call-to-action__content__heading">
              <PrismicRichText field={titleField} />
            </div>
          )}
          {isFilled.richText(paragraphField) && (
            <div className="es-call-to-action__content__paragraph">
              <PrismicRichText field={paragraphField} />
            </div>
          )}
        </div>
        {isFilled.link(buttonLinkField) && (
          <PrismicNextLink
            className="es-call-to-action__button"
            field={buttonLinkField}
          >
            {buttonLabelText}
          </PrismicNextLink>
        )}
      </div>

      <style>
        {`
          .es-bounded {
            padding: 8vw 2rem;
          }
          
          .es-bounded__content {
            margin-left: auto;
            margin-right: auto;
          }
          
          @media screen and (min-width: 640px) {
            .es-bounded__content {
              max-width: 90%;
            }
          }
          
          @media screen and (min-width: 896px) {
            .es-bounded__content {
              max-width: 80%;
            }
          }
          
          @media screen and (min-width: 1280px) {
            .es-bounded__content {
              max-width: 75%;
            }
          }
          
          .es-call-to-action {
            font-family: system-ui, sans-serif;
            background-color: #fff;
            color: #333;
          }
          
          .es-call-to-action__image {
            max-width: 14rem;
            height: auto;
            width: auto;
            justify-self: ${alignment};
          }
          
          .es-call-to-action__content {
            display: grid;
            gap: 1rem;
            justify-items: ${alignment};
          }
          
          .es-call-to-action__content__heading {
            font-size: 2rem;
            font-weight: 700;
            text-align: ${alignment};
          }

          .es-call-to-action__content__heading * {
            margin: 0;
          }
          
          .es-call-to-action__content__paragraph {
            font-size: 1.15rem;
            max-width: 38rem;
            text-align: ${alignment};
          }
          
          .es-call-to-action__button {
            justify-self: ${alignment};
            border-radius: 0.25rem;
            display: inline-block;
            font-size: 0.875rem;
            line-height: 1.3;
            padding: 1rem 2.625rem;
            text-align: ${alignment};
            transition: background-color 100ms linear;
            background-color: #16745f;
            color: #fff;
          }
          
          .es-call-to-action__button:hover {
            background-color: #0d5e4c;
          }
        `}
      </style>
    </section>
  );
};

export default CallToAction;