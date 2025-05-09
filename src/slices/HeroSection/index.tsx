import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import PrismicHeroSection from "./client"; // Adjust import path as needed
import { getServerTranslations } from "@/i18n/server";

/**
 * Props for the Hero Section server wrapper
 */
export type HeroSectionServerWrapperProps = SliceComponentProps<Content.HeroSectionSlice>;

/**
 * Server Component wrapper for the Hero Section
 * This component fetches translations and passes them to the client component
 */
const HeroSectionServerWrapper: FC<HeroSectionServerWrapperProps> = async ({ slice }) => {
  // Fetch translations from server
  const { language } = await getServerTranslations('translation');
  
  // Pass slice and translations to client component
  return <PrismicHeroSection slice={slice} language={language} />;
};

export default HeroSectionServerWrapper;