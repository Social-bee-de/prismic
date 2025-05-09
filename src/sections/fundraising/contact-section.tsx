import { getServerTranslations } from "@/i18n/server";
import { faPaperPlane } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function ContactSection() {
    const { t } = await getServerTranslations('translation');
    return (
        <section id="contact-section" className="w-screen max-w-[1440px] px-4 lg:px-[60px] lg:py-[120px] dark:text-gray-300 ">
            <div className="w-full rounded-[16px] px-8 pt-12 md:px-[60px] md:py-[144px] flex gap-9 dark:text-gray-300 relative overflow-hidden min-h-[700px] md:min-h-0" style={{ backgroundImage: "url('/fundraising/bg_contact.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
                <img
                    src={'/fundraising/omar.webp'}
                    alt={'omar'}
                    className={`absolute md:right-0 z-1 pt-14 -bottom-5 left-0 md:left-auto md:top-0`}
                    width={556}
                />
                {/* <div className="absolute right-0 bottom-0 md:top-0">
                    <Image src='/fundraising/omar.webp' draggable={false} className="object-contain  z-0 lg:pt-14" width={556} height={688} alt="Eine Frau mit einem Telefon in der Hand" />
                </div> */}
                <div className="flex flex-col gap-5 lg:gap-[64px] w-full z-10">
                    <h2 className="relative w-fit">{t('fundraising.contact.title')}
                        <img
                            src={'/brushes-yellow.webp'}
                            className="absolute -bottom-1 lg:-bottom-4 -z-10 -left-4 lg:left-auto lg:-right-4 w-[121px] lg:w-[279px]"
                            alt={'brushes-yellow'}
                            width={279}
                            draggable={false}
                            height={45}
                        />
                    </h2>
                    <div className="flex flex-col gap-6 lg:gap-8">
                        <p>{t('fundraising.contact.desc')}</p>

                        <div className="flex flex-col md:flex-row gap-3 lg:gap-4 items-center">
                            <a href="mailto:omar.fayez@social-bee.de" className="justify-center z-0 h-14 flex flex-row gap-3 !text-text-diap-primary bg-black rounded-[12px] px-8 py-[10px] font-bold items-center w-full md:w-fit">
                                <FontAwesomeIcon icon={faPaperPlane} />
                                {t('fundraising.contact.mailto')}
                            </a>
                            <a target="_blank" href="https://secure.betterplace.org/de/donate/ww-stadtsparkasse-muenchen/projects/101957" className="justify-center z-0 h-14 flex flex-row gap-3 bg-primary-400 rounded-[12px] px-8 py-[10px] font-bold items-center w-full md:w-fit">
                                {t('fundraising.contact.direct')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}