import Image from "next/image";

import { getServerTranslations } from "@/i18n/server";
import white from "../../public/white-brush.webp";

const talents = '4000+';
const percent = '92%';
const success = '1300+';

export default async function TalentSection() {
  const { t } = await getServerTranslations('translation');
  return (
    <section className="w-screen max-w-[1440px] lg:px-[60px] px-2 ">
      <div className=" bg-primary-400 py-6 px-5 rounded-[12px] lg:px-[60px] lg:py-[56px] lg:rounded-[16px] flex lg:flex-row flex-col">
        <div className="flex flex-1 flex-col lg:py-4 gap-3 lg:gap-4 relative ">
          <h1>{talents}</h1>
          <Image
            src={white}
            className="absolute mt-11 hidden lg:block"
            alt="yellow stripe"
            width={133}
            height={34}
            style={{
              left: 15,
            }}
          />
          <Image
            src={white}
            className="absolute mt-6 lg:mt-10 block lg:hidden"
            alt="yellow stripe"
            width={66}
            height={17}
            style={{
              left: 12,
            }}
          />
          <h6 className="hidden lg:block">{t('hiring.talents.info1')}</h6>
          <h4 className="lg:hidden">{t('hiring.talents.info1')}</h4>
        </div>
        <div className="bg-text-primary bg-opacity-10 w-full h-[2px] my-6 lg:w-[2px] lg:h-[138px] lg:my-0 lg:mr-9" />
        <div className="flex flex-1 flex-col lg:py-4 gap-3 lg:gap-4 relative ">
          <h1>{percent}</h1>
          <Image
            src={white}
            className="absolute mt-11 hidden lg:block"
            alt="yellow stripe"
            width={133}
            height={34}
            style={{
              left: 15,
            }}
          />
          <Image
            src={white}
            className="absolute mt-6 lg:mt-10 block lg:hidden"
            alt="yellow stripe"
            width={66}
            height={17}
            style={{
              left: 12,
            }}
          />
          <h6 className="hidden lg:block">{t('hiring.talents.info2')}</h6>
          <h4 className="lg:hidden">{t('hiring.talents.info2')}</h4>
        </div>
        <div className="bg-text-primary bg-opacity-10 w-full h-[2px] my-6 lg:w-[2px] lg:h-[138px] lg:my-0 lg:mr-9" />
        <div className="flex flex-1 flex-col lg:py-4 gap-3 lg:gap-4 relative ">
          <h1>{success}</h1>
          <Image
            src={white}
            className="absolute mt-11 hidden lg:block"
            alt="yellow stripe"
            width={133}
            height={34}
            style={{
              left: 12,
            }}
          />
          <Image
            src={white}
            className="absolute mt-6 lg:mt-10 block lg:hidden"
            alt="yellow stripe"
            width={66}
            height={17}
            style={{
              left: 15,
            }}
          />
          <h6 className="hidden lg:block">{t('hiring.talents.info3')}</h6>
          <h4 className="lg:hidden">{t('hiring.talents.info3')}</h4>
        </div>
      </div>
    </section>
  );
}
