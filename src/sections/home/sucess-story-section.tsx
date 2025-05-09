
import { getServerTranslations } from "@/i18n/server";
import Image from "next/image";

export default async function SucessStorySection() {
    const { t } = await getServerTranslations('translation');

    return (
        <section className="w-screen max-w-[1440px] px-4 lg:px-10 lg:py-[120px] xl:p-[40px] grid grid-cols-1 lg:grid-cols-2 gap-9 dark:text-gray-300">
            <div className="flex flex-col gap-5 lg:gap-6">
                <h6 className="text-overheader dark:text-gray-300 hidden lg:block">{t('home.sucessStory.header')}</h6>
                <h4 className="text-overheader dark:text-gray-300 lg:hidden">{t('home.sucessStory.header')}</h4>
                <h2 className="dark:text-gray-300">{t('home.sucessStory.title')}</h2>
                <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: t('home.sucessStory.content') }} />
            </div>
            <div className="relative w-full h-full min-h-[459px]">
                <Image src='/home/sucess-story/Gluckliche-Kundinder-Female-Hiring-Programm-Kohorte-von-socialbee.webp' draggable={false} fill className="object-contain object-top obkec lg:pt-14" alt="Eine erfahrende Frau lächelt glücklich in die Kamera, nachdem sie erfolgreich mit socialbee über Female Hiring ihr Team erweitert hat" />
                <div className="absolute flex flex-col gap-2 w-full lg:w-[315px] bottom-0 lg:bottom-auto lg:top-[338px] lg:left-[35px]">
                    <div className="flex flex-col bg-background-primary h-14 shadow-lg lg:h-20 rounded-full lg:py-4 px-6 justify-center">
                        <p className="lg:w-[241px]" dangerouslySetInnerHTML={{ __html: t('home.sucessStory.bubble1') }} />
                    </div>
                    <div className="flex flex-col bg-background-primary h-14 shadow-lg lg:h-20 rounded-full lg:py-4 px-6 justify-center">
                        <p className="lg:w-[241px]" dangerouslySetInnerHTML={{ __html: t('home.sucessStory.bubble2') }} />

                    </div>
                    <div className="flex flex-col bg-background-primary h-14 shadow-lg lg:h-20 rounded-full lg:py-4 px-6 justify-center">
                        <b className="lg:w-[241px]">{t('home.sucessStory.bubble3')}</b>
                    </div>
                </div>
            </div>
            <div className="w-full"></div>
        </section>
    );
}; 