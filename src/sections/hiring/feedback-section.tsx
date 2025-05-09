import Image from "next/image";

import { getServerTranslations } from "@/i18n/server";
import user1 from "../../public/feedback/user1.webp";
import Laurids from "../../public/feedback/user2.webp";

export default async function FeedbackSection() {
  const { t } = await getServerTranslations('translation');
  return (
    <section className="w-screen max-w-[1440px] lg:p-[120px] flex flex-col gap-8 dark:text-gray-300">
      <h6 className="text-overheader px-0 hidden lg:block dark:text-gray-300">{t('hiring.feedback.title')}</h6>
      <h4 className="text-overheader px-5 lg:hidden dark:text-gray-300">{t('hiring.feedback.title')}</h4>
      <div className="flex px-[10px] lg:px-0 lg:flex-row flex-col gap-9">
        <div className="flex-1">
          <div className="bg-gray-100 dark:bg-gray-600 rounded-xl px-5 py-6 lg:p-8 flex flex-col gap-6 lg:gap-8">
            <p className=" dark:text-gray-300" dangerouslySetInnerHTML={{ __html: t('hiring.feedback.comment1') }} />
            <div className="flex gap-3 lg:gap-4 items-center">
              <Image
                src={user1}
                alt="Alexander Stotz image"
                width={64}
                height={64}
                className="w-14 lg:w-16 rounded-full"
              />
              <div className="w-[2px] h-16 bg-border-primary" />
              <div className="flex flex-col">
                <p className="font-bold">{t('hiring.feedback.username1')}</p>
                <p className="text-text-tertiary dark:text-gray-300">{t('hiring.feedback.userrole1')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-gray-100 dark:bg-gray-600 rounded-xl px-5 py-6 lg:p-8 flex flex-col gap-6 lg:gap-8">
            <p className="dark:text-gray-300" dangerouslySetInnerHTML={{ __html: t('hiring.feedback.comment2') }} />
            <div className="flex flex-row gap-3 lg:gap-4 items-center">
              <Image
                src={Laurids}
                alt="Laurids Lanzendörfer image"
                width={64}
                height={64}
                className="w-14 lg:w-16 max-w-16 rounded-full"
              />
              <div className="w-[2px] h-16 bg-border-primary" />
              <div className="flex flex-col">
                <p className="font-bold">{t('hiring.feedback.username2')}</p>
                <p className="text-text-tertiary dark:text-gray-300">{t('hiring.feedback.userrole2')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
