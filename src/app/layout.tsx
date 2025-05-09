import type { Metadata } from 'next';
import './globals.css';
import '../../node_modules/socialbee-ui/src/styles/tailwind.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

import { ClientScripts } from '@/sections/client-scripts';
import { headers } from 'next/headers';
import HeaderSection from '@/sections/header-section';
import FlowbiteInit from '@/components/flowbite/init';
import { Footer } from '@/sections/Footer/Footer';
import { getServerTranslations } from '@/i18n/server';
import LanguageDetector from '@/components/LanguageDetector';

config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Flüchtlinge unbürokratisch einstellen mit der Nummer 1 | socialbee',
  description: 'Ihr möchtet in Eurem Unternehmen Flüchtlinge oder Migrant*innen einstellen? Wir rekrutieren seit über 8 Jahren erfolgreich diverse Talente',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const device = headersList.get('device');
	const { t } = await getServerTranslations('translation');

  return (
    <html lang='en'>
      <body>
        <main className='flex flex-col items-center justify-between overflow-x-hidden relative dark:bg-metal-800 min-h-screen'>
          <HeaderSection />
          <LanguageDetector />
          <div className='h-10'/>
          {children}
          <Footer t={t} logoSrc='/logo.png' whatsappSrc='/whatsapp.png' getLink={(linkObj: { de: string; en: string }) => (linkObj.de)}/>
        </main>
      </body>
      <ClientScripts desktop={device === 'desktop'} />
      <FlowbiteInit />
      {/* <GoogleScripts tagManagerArgs={tagManagerArgs} clarityId={clarityId} /> */}
      {/* <Script id='Cookiebot' src='https://consent.cookiebot.com/uc.js' data-cbid={process.env.COOKIEBOT_ID ?? ''} data-blockingmode='auto' type='text/javascript' /> */}
    </html>
  );
}
