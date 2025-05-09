import Image from "next/image";

import { getServerTranslations } from "@/i18n/server";
import program from "../../public/program/socialbee_Absolventin_des_Female_Accelerators_fur_Projektmanagement.webp";
import programMobile from "../../public/program/socialbee_Absolventin_des_Female_Accelerators_fur_Projektmanagement_m.webp";

export default async function ProgramSection() {
  const { t } = await getServerTranslations('translation');
  return (
    <section className="w-screen max-w-[1440px] px-5 lg:p-[120px] flex flex-col lg:flex-row gap-10 lg:gap-[64px]">
      <div className="flex flex-col flex-1 gap-2 lg:pr-9">
        <div className="flex flex-col gap-5 lg:gap-6">
          <h6 className="text-overheader dark:text-gray-300 hidden lg:block">{t('hiring.program.header')}</h6>
          <h4 className="text-overheader dark:text-gray-300 lg:hidden">{t('hiring.program.header')}</h4>
          <h4 className="dark:text-gray-300 hidden lg:block">{t('hiring.program.title')}</h4>
          <h2 className="dark:text-gray-300 lg:hidden">{t('hiring.program.title')}</h2>
        </div>
        <div className="flex-1">
          <p className="dark:text-gray-300">{t('hiring.program.desc')}</p>
        </div>
      </div>
      <div className="flex-1 h-full flex justify-end">
        <Image
          src={program}
          className="w-full rounded-[16px] hidden lg:block"
          alt="People we help"
        />
        <Image
          src={programMobile}
          className="w-full rounded-[16px] lg:hidden"
          alt="People we help"
        />
      </div>
    </section>
  );
}
