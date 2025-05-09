import Image from "next/image";

import { getServerTranslations } from "@/i18n/server";
import partner1 from "../../public/fundraising/logos/google-logo.webp"
import partner2 from "../../public/fundraising/logos/Mbq_logo.webp"
import partner3 from "../../public/fundraising/logos/DBU_logo.webp"
import { SectionBox } from "socialbee-ui";
import Link from "next/link";

export default async function PartnerSection() {
    const { t } = await getServerTranslations('translation');
    return (
        <SectionBox header={t('fundraising.partner.header')} title={t('fundraising.partner.title')}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-9" >
                <div className="relative lg:min-h-[525px] w-full flex flex-col gap-6">
                    <Image src={partner1} alt="Google Logo" className="h-[282px] object-contain" height={500} />
                    <div className="flex flex-col gap-2">
                        <h5 className="hidden lg:block" dangerouslySetInnerHTML={{ __html: t('fundraising.partner.partner1Title') }} />
                        <h2 className="lg:hidden" dangerouslySetInnerHTML={{ __html: t('fundraising.partner.partner1Title') }} />
                        <p dangerouslySetInnerHTML={{ __html: t('fundraising.partner.partner1Desc') }} />
                    </div>
                </div>
                <div className="relative lg:min-h-[525px] w-full flex flex-col gap-6">
                    <Image src={partner2} alt="MBQ Logo" className="h-[282px] object-contain" height={500} />
                    <div className="flex flex-col gap-2">
                        <h5 className="hidden lg:block" dangerouslySetInnerHTML={{ __html: t('fundraising.partner.partner2Title') }} />
                        <h2 className="lg:hidden" dangerouslySetInnerHTML={{ __html: t('fundraising.partner.partner2Title') }} />

                        <p className="whitespace-pre-wrap">{t('fundraising.partner.partner2Desc')}</p>
                        <a href="https://www.muenchen.de/mbq" target="_blank" rel="noreferrer">
                            www.muenchen.de/mbq
                        </a>
                    </div>
                </div>
                <div className="relative lg:min-h-[525px] w-full flex flex-col gap-6">
                    <Image src={partner3} alt="DBU Logo" className="h-[282px] object-contain" height={500} />
                    <div className="flex flex-col gap-2">
                        <h5 className="hidden lg:block" dangerouslySetInnerHTML={{ __html: t('fundraising.partner.partner3Title') }} />
                        <h2 className="lg:hidden" dangerouslySetInnerHTML={{ __html: t('fundraising.partner.partner3Title') }} />
                        <p dangerouslySetInnerHTML={{ __html: t('fundraising.partner.partner3Desc') }} />
                    </div>
                </div>

            </div>
        </SectionBox>
    );
}
