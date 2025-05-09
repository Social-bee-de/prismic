import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { getServerTranslations } from "@/i18n/server"; // Adjust import path as needed
import TalentSectionClient from "./client"; // Adjust import path as needed

/**
 * Props for the Talent Section server wrapper
 */
export type TalentSectionServerProps = SliceComponentProps<Content.TalentSectionSlice>;

/**
 * Server Component wrapper for the Talent Section
 * This component fetches translations and passes them to the client component
 */
const TalentSectionServer: FC<TalentSectionServerProps> = async ({ slice }) => {
  // Fetch translations from server
  const { language } = await getServerTranslations('translation');
  
  // Pass slice and translations to client component
  return <TalentSectionClient slice={slice} language={language} index={0} slices={[]} context={undefined} />;
};

export default TalentSectionServer;