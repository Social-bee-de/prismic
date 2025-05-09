import Image from "next/image";

import { getServerTranslations } from "../../i18n/server";
import diversity from "../../public/diversity/vorbereitung_neue_mitarbeiterin_durch_socialbe_expertin.webp";
import diversity2nd from "../../public/diversity/Absolventin_socialbee_Projektmanagement_Qualifizierung.webp";
import diversity3rd from "../../public/diversity/vermitteltes_Talent_von_socialbee_nach_Jobstart.webp";
import { SectionBox } from "@/components/SectionBox";
import { BoxesList } from "socialbee-ui";

export default async function DiversitySection() {
  const { t } = await getServerTranslations('translation');
  const boxes = [
    t('hiring.industrial.box1'),
    t('hiring.industrial.box2'),
    t('hiring.industrial.box3'),
    t('hiring.industrial.box4'),
    t('hiring.industrial.box5'),
    t('hiring.industrial.box6'),
    t('hiring.industrial.box7'),
    t('hiring.industrial.box8'),
    t('hiring.industrial.box9'),
  ];
  return (
    <SectionBox title={t('hiring.program.title')} header={t('hiring.program.header')} id="diversity-section">
      <div className="flex lg:flex-row flex-col gap-8 lg:gap-[36px]">
        <div className="flex flex-1">
          <div className="flex flex-1 flex-col lg:pr-9 gap-9 max-h-[581px]">
            <div className="flex-1 h-1/2">
              <Image
                src={diversity}
                className="w-full h-1/2 rounded-[12px] flex-1 lg:rounded-[16px] object-cover object-left lg:object-bottom"
                alt="socialbee Expertin in einem Gespräch mit einer Frau, die sie als neue Mitarbeiterin auf ihren Job vorbereitet."
                style={{ height: "100%" }}
              />
            </div>
            <div className="hidden lg:flex lg:gap-2" style={{ height: "100%" }}>
              <div className="flex flex-1">
                <div className="flex relative w-full">
                  <Image
                    src={diversity2nd}
                    className="w-full h-full rounded-[12px] lg:rounded-[16px] object-cover object-top"
                    alt="Eine junge glückliche Frau mit Migrationshintergrund, die erfolgreich eine Projektmanagement Qualifizierung von socialbee abgeschlossen hat und nun als neue Mitarbeiterin einen Job in einer Firma gefunden hat."
                    style={{ height: "100%" }}
                  />
                </div>
              </div>
              <div className="flex flex-1 pl-4">
                <div className="flex relative w-full">
                  <Image
                    src={diversity3rd}
                    className="w-full h-full rounded-[12px] lg:rounded-[16px] object-cover"
                    alt="Ein glücklicher Mann mit Migrationshintergrund, der über socialbee einen neuen Job in einem Unternehmen in Deutschland gefunden hat"
                    style={{ height: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h4>{t('hiring.diversity.title-sec1')}</h4>
            <p>{t('hiring.diversity.desc-sec1')}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h4>{t('hiring.diversity.title-sec2')}</h4>
            <p>{t('hiring.diversity.desc-sec2')}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h4>{t('hiring.diversity.title-sec3')}</h4>
            <p>{t('hiring.diversity.desc-sec3')}</p>
          </div>
        </div>
      </div>
      <BoxesList title={t('hiring.industrial.title')} boxes={boxes} />
    </SectionBox>
  );
}
