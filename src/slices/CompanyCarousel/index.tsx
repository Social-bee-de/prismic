import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { getServerTranslations } from "@/i18n/server"; // Adjust import path as needed
import CompanyCarouselClient from "./client"; // Adjust import path as needed
import { headers } from "next/headers";
import { ClientScripts } from "./script";

/**
 * Props for the Company Carousel server wrapper
 */
export type CompanyCarouselServerProps = SliceComponentProps<any>;

/**
 * Server Component wrapper for the Company Carousel
 * This component fetches translations and passes them to the client component
 */
const CompanyCarouselSection: FC<CompanyCarouselServerProps> = async ({ slice }) => {
  // Fetch translations from server
  const { language } = await getServerTranslations('translation');
  
  return (
    <>
      <ClientScripts glidesToMount={['.glide1']} />
      <CompanyCarouselClient slice={slice} language={language} index={0} slices={[]} context={undefined} />
    </>
  );
};

export default CompanyCarouselSection;