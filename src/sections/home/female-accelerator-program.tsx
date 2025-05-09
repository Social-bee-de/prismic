
import { getServerTranslations } from "@/i18n/server";
import { DiversitySection } from "socialbee-ui";

import diversity2nd from "../../public/diversity/Absolventin_socialbee_Projektmanagement_Qualifizierung.webp";
import diversity3rd from "../../public/diversity/erfolgreich-vermitteltes-Female-Hiring-Talent-ueber-socialbee.webp";
import diversity from "../../public/diversity/vorbereitung_neue_mitarbeiterin_durch_socialbe_expertin.webp";

export default async function FemaleAcceleratorSection() {
    const { t } = await getServerTranslations('translation');
    const boxes = [
        t('home.boxesList.box1'),
        t('home.boxesList.box2'),
        t('home.boxesList.box3'),
        t('home.boxesList.box4'),
        t('home.boxesList.box5'),
        t('home.boxesList.box6'),
        t('home.boxesList.box7'),
    ];

    const images = [
        {
            src: diversity.src,
            alt: 'socialbee Expertin in einem Gespräch mit einer Frau, die sie als neue Mitarbeiterin auf ihren Job vorbereitet.',
        },
        {
            src: diversity2nd.src,
            alt: 'Eine junge glückliche Frau mit Migrationshintergrund, die erfolgreich eine Projektmanagement Qualifizierung von socialbee abgeschlossen hat und nun als neue Mitarbeiterin einen Job in einer Firma gefunden hat.',
        },
        {
            src: diversity3rd.src,
            alt: 'Ein glücklicher Mann mit Migrationshintergrund, der über socialbee einen neuen Job in einem Unternehmen in Deutschland gefunden hat',
        },
    ];

    const descriptionSections = [
        {
            title: t('home.femaleAccelerator.title1'),
            description: t('home.femaleAccelerator.desc1'),
        },
        {
            title: t('home.femaleAccelerator.title2'),
            description: t('home.femaleAccelerator.desc2'),
        },
        {
            title: t('home.femaleAccelerator.title3'),
            description: t('home.femaleAccelerator.desc3'),
        },
    ];

    return (
        <div id="femaleAccelerator">
            <DiversitySection header={t('home.femaleAccelerator.header')} title={t('home.femaleAccelerator.title')} images={images} descriptionSections={descriptionSections} boxes={boxes} titleBoxes={t('home.boxesList.title')} />
        </div>
    );
}
