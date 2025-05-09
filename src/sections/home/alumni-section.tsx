import Image from "next/image";

import { getServerTranslations } from "@/i18n/server";
import alumni1 from "../../public/home/alumni/erfolgreich-vermitteltes-Female-Hiring-Talent-ueber-socialbee.webp"
import alumni2 from "../../public/home/alumni/Absolventin-des-Female-Accelerator-Programs-von-socialbee.webp"
import alumni3 from "../../public/home/alumni/Talent-des-Female-Accelerator-Programs-von-socialbee.webp"
import { SectionBox } from "socialbee-ui";

export default async function AlumniSection() {
    const { t } = await getServerTranslations('translation');
    return (
        <SectionBox header={t('home.alumni.header')} title={t('home.alumni.title')}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-9" >
                <div className="relative lg:min-h-[525px] w-full flex flex-col gap-6">
                    <Image src={alumni1} alt="Frau strahlt in die Kamera nach beruflichem Erfolg durch das Female Hiring Programm von socialbee" height={500} />
                    <div className="flex flex-col gap-2 lg:gap-0">
                        <h4 dangerouslySetInnerHTML={{ __html: t('home.alumni.alumni1Title') }} />
                        <p dangerouslySetInnerHTML={{ __html: t('home.alumni.alumni1Desc') }} />
                    </div>
                </div>
                <div className="relative lg:min-h-[525px] w-full flex flex-col gap-6">
                    <Image src={alumni2} alt="eine Frau schaut selbstsicher in die Kamera, nachdem sie erfolgreich eine Qualifizierung zur Projektmanagerin abgeschlossen hat" height={500} />
                    <div className="flex flex-col gap-2 lg:gap-0">
                        <h4 dangerouslySetInnerHTML={{ __html: t('home.alumni.alumni2Title') }} />
                        <p dangerouslySetInnerHTML={{ __html: t('home.alumni.alumni2Desc') }} />
                    </div>
                </div>
                <div className="relative lg:min-h-[525px] w-full flex flex-col gap-6">
                    <Image src={alumni3} alt="zukunftssicheres Lächeln umspielt das Gesicht einer Frau mit diversem Background, die ihre Qualifizierung in Female Business erfolgreich über socialbee abgeschlossen hat" height={500} />
                    <div className="flex flex-col gap-2 lg:gap-0">
                        <h4 dangerouslySetInnerHTML={{ __html: t('home.alumni.alumni3Title') }} />
                        <p dangerouslySetInnerHTML={{ __html: t('home.alumni.alumni3Desc') }} />
                    </div>
                </div>

            </div>
        </SectionBox>
    );
}
