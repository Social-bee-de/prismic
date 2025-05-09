import { ContactUsNowButton } from "@/components/FAQ/ContactUsNowButton";
import { getServerTranslations } from "../../i18n/server";
import { Question } from "socialbee-ui";
import { FC } from "react";

interface FAQSectionProps {
  translationsPrefix: string;
}

export const FAQSection: FC<FAQSectionProps> = async ({ translationsPrefix }) => {
  const { t } = await getServerTranslations('translation');
  return (
    <section className="w-screen max-w-[1440px] lg:p-[120px] flex flex-col lg:flex-row gap-9">
      <div className="flex-1 flex flex-col justify-between lg:px-0 px-5">
        <div className="flex flex-col gap-6 ">
          <h6 className="text-overheader dark:text-gray-300 hidden lg:block">{t(`${translationsPrefix}.faqs.header`)}</h6>
          <h4 className="text-overheader dark:text-gray-300 lg:hidden">{t(`${translationsPrefix}.faqs.header`)}</h4>
          <h3 className="dark:text-gray-300 hidden lg:block">{t(`${translationsPrefix}.faqs.title`)}</h3>
          <h2 className="dark:text-gray-300 lg:hidden">{t(`${translationsPrefix}.faqs.title`)}</h2>
        </div>
        <div className="lg:flex flex-col gap-4 hidden">
          <h5 className="dark:text-gray-200">{t(`${translationsPrefix}.faqs.question`)}</h5>
          <ContactUsNowButton text={{ contactUs: t(`${translationsPrefix}.faqs.button`) }} />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2 px-[10px] lg:px-0">
        <Question question={t(`${translationsPrefix}.faqs.boxheader1`)} answer={t(`${translationsPrefix}.faqs.boxdesc1`)} />
        <Question question={t(`${translationsPrefix}.faqs.boxheader2`)} answer={t(`${translationsPrefix}.faqs.boxdesc2`)} />
        <Question question={t(`${translationsPrefix}.faqs.boxheader3`)} answer={t(`${translationsPrefix}.faqs.boxdesc3`)} />
        <Question question={t(`${translationsPrefix}.faqs.boxheader4`)} answer={t(`${translationsPrefix}.faqs.boxdesc4`)} />
        <Question question={t(`${translationsPrefix}.faqs.boxheader5`)} answer={t(`${translationsPrefix}.faqs.boxdesc5`)} />
      </div>
      <div className="flex flex-col gap-4 lg:hidden lg:px-0 px-5">
        <h5 className="dark:text-gray-200">{t(`${translationsPrefix}.faqs.question`)}</h5>
        <ContactUsNowButton text={{ contactUs: t(`${translationsPrefix}.faqs.button`) }} />
      </div>
    </section>
  );
}
