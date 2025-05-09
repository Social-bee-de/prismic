import { getServerTranslations } from "@/i18n/server";
import { faGraduationCap, faLightEmergency, faLightEmergencyOn, faVenus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BetterPlaceDonation from "./better-place-donation";

const donationMakesDifference = async () => {
    const { t, language } = await getServerTranslations('translation');
    return (
        <section id="donation-makes-difference" className="w-screen max-w-[1440px] px-4 lg:px-10  xl:px-[120px] flex flex-col gap-12 dark:text-gray-300">
            <h2 className="lg:pr-9">{t('fundraising.giftCard.donation-makes-difference.title')}</h2>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                <div className="flex flex-col gap-2 flex-1">
                    <div className="w-full items-center justify-center flex">
                        <FontAwesomeIcon icon={faLightEmergencyOn} className="w-28 h-28" />
                    </div>
                    <h5 className="hidden lg:block ">{t('fundraising.giftCard.donation-makes-difference.item1Title')}</h5>
                    <h3 className="lg:hidden">{t('fundraising.giftCard.donation-makes-difference.item1Title')}</h3>
                    <p className="dark:text-gray-300">{t('fundraising.giftCard.donation-makes-difference.item1Desc')}</p>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <div className="w-full items-center justify-center flex">
                        <FontAwesomeIcon icon={faGraduationCap} className="w-28 h-28" />
                    </div>
                    <h5 className="hidden lg:block">{t('fundraising.giftCard.donation-makes-difference.item2Title')}</h5>
                    <h3 className="lg:hidden">{t('fundraising.giftCard.donation-makes-difference.item2Title')}</h3>
                    <p className="dark:text-gray-300">{t('fundraising.giftCard.donation-makes-difference.item2Desc')}</p>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <div className="w-full items-center justify-center flex">
                        <FontAwesomeIcon icon={faVenus} className="w-28 h-28" />
                    </div>
                    <h5 className="hidden lg:block">{t('fundraising.giftCard.donation-makes-difference.item3Title')}</h5>
                    <h3 className="lg:hidden">{t('fundraising.giftCard.donation-makes-difference.item3Title')}</h3>
                    <p className="dark:text-gray-300">{t('fundraising.giftCard.donation-makes-difference.item3Desc')}</p>
                </div>
            </div>
            <BetterPlaceDonation translations={{ DonateNow: t('fundraising.giftCard.DonateNow'), MakeADifference: t('fundraising.giftCard.MakeADifference') }} language={language} />
        </section>
    )
}

export default donationMakesDifference